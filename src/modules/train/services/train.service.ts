import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from '../train.entity';
import { GetAllTrainsResponseDto } from '../dto/res/getAll-train.res.dto';
import { TrainResponseDto } from '../dto/res/train.res.dto';
import { CreateTrainReqDto } from '../dto/req/create-train.req.dto';
import { UpdateTrainReqDto } from '../dto/req/update-train.req.dto';
import { ApiResponse } from 'src/common/responses/api-response';

@Injectable()
export class TrainService {
  private readonly logger = new Logger(TrainService.name);
  
  constructor(
    @InjectRepository(Train)
    private readonly trainRepository: Repository<Train>,
  ) {}

  async create(dto: CreateTrainReqDto): Promise<ApiResponse<TrainResponseDto>> {
    try {
      this.logger.log(`Creating new train with number: ${dto.number}`);
      
      const existingTrain = await this.trainRepository.findOne({ 
        where: { number: dto.number } 
      });
      
      if (existingTrain) {
        throw new ConflictException(`Train with number ${dto.number} already exists`);
      }
      
      const departureTime = new Date(dto.departureTime);
      const arrivalTime = new Date(dto.arrivalTime);
      
      if (departureTime >= arrivalTime) {
        throw new BadRequestException('Departure time must be earlier than arrival time');
      }
      
      const train = await this.trainRepository.save(dto);
      
      this.logger.log(`Successfully created train with ID: ${train.id}`);
      
      return ApiResponse.success(this.mapToResponseDto(train), 'Train successfully created');
    } catch (error) {
      this.logger.error(`Failed to create train: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getAll(search?: string, page: number = 1, limit: number = 10): Promise<ApiResponse<GetAllTrainsResponseDto>> {
    try {
      this.logger.log(`Getting all trains with search: ${search}, page: ${page}, limit: ${limit}`);
      
      page = +page || 1;
      limit = +limit || 10;
      
      const skip = (page - 1) * limit;
      
      let query = this.trainRepository.createQueryBuilder('train');
      
      if (search) {
        query = query.where(
          'train.number ILIKE :search OR train.departure ILIKE :search OR train.destination ILIKE :search OR train.carrier ILIKE :search',
          { search: `%${search}%` }
        );
      }
      
      const total = await query.getCount();
      
      query = query
        .skip(skip)
        .take(limit)
        .orderBy('train.createdAt', 'DESC');
      
      const trains = await query.getMany();
      
      if (trains.length === 0 && page > 1 && total > 0) {
        throw new NotFoundException('No trains found on this page');
      }
      
      const pages = Math.ceil(total / limit);
      
      this.logger.log(`Found ${total} trains, returning page ${page} of ${pages}`);
      
      return ApiResponse.success({
        items: trains.map(train => this.mapToResponseDto(train)),
        meta: {
          total,
          page,
          limit,
          pages
        }
      }, 'Trains successfully retrieved');
    } catch (error) {
      this.logger.error(`Failed to get trains: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getById(id: string): Promise<ApiResponse<TrainResponseDto>> {
    try {
      this.logger.log(`Getting train by ID: ${id}`);
      
      const train = await this.trainRepository.findOne({ where: { id } });

      if (!train) {
        throw new NotFoundException(`Train with ID ${id} not found`);
      }
      
      this.logger.log(`Found train with ID: ${id}`);
      
      return ApiResponse.success(this.mapToResponseDto(train), 'Train successfully retrieved');
    } catch (error) {
      this.logger.error(`Failed to get train by ID ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateById(id: string, updateData: UpdateTrainReqDto): Promise<ApiResponse<TrainResponseDto>> {
    try {
      this.logger.log(`Updating train with ID: ${id}`);
      
      const train = await this.trainRepository.findOne({ where: { id } });
      
      if (!train) {
        throw new NotFoundException(`Train with ID ${id} not found`);
      }
      
      if (updateData.number && updateData.number !== train.number) {
        const existingTrainWithNumber = await this.trainRepository.findOne({ 
          where: { number: updateData.number } 
        });
        
        if (existingTrainWithNumber && existingTrainWithNumber.id !== id) {
          throw new ConflictException(`Train with number ${updateData.number} already exists`);
        }
      }
      
      if (updateData.departureTime || updateData.arrivalTime) {
        const departureTime = updateData.departureTime 
          ? new Date(updateData.departureTime) 
          : train.departureTime;
          
        const arrivalTime = updateData.arrivalTime 
          ? new Date(updateData.arrivalTime) 
          : train.arrivalTime;
          
        if (departureTime >= arrivalTime) {
          throw new BadRequestException('Departure time must be earlier than arrival time');
        }
      }
      
      const updatedTrain = this.trainRepository.merge(train, updateData);
      const result = await this.trainRepository.save(updatedTrain);
      
      this.logger.log(`Successfully updated train with ID: ${id}`);
      
      return ApiResponse.success(this.mapToResponseDto(result), 'Train successfully updated');
    } catch (error) {
      this.logger.error(`Failed to update train with ID ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      this.logger.log(`Deleting train with ID: ${id}`);
      
      const train = await this.trainRepository.findOne({ where: { id } });
      
      if (!train) {
        throw new NotFoundException(`Train with ID ${id} not found`);
      }

      await this.trainRepository.remove(train);
      
      this.logger.log(`Successfully deleted train with ID: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete train with ID ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  private mapToResponseDto(train: Train): TrainResponseDto {
    return {
      id: train.id,
      number: train.number,
      departure: train.departure,
      destination: train.destination,
      carrier: train.carrier,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      createdAt: train.createdAt
    };
  }
}