import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/req/create-user.req.dto';
import { UpdateUserDto } from '../dto/req/update-user.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { ApiResponse } from 'src/common/responses/api-response';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);
      
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email }
      });
      
      if (existingUser) {
        throw new ConflictException(`User with email ${createUserDto.email} already exists`);
      }
      
      const user = await this.userRepository.save(createUserDto);
      
      this.logger.log(`Successfully created user with ID: ${user.id}`);
      
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      this.logger.log(`Finding user by email: ${email}`);
      
      const user = await this.userRepository.findOne({ 
        where: { email } 
      });
      
      if (user) {
        this.logger.log(`Found user with email: ${email}`);
      } else {
        this.logger.log(`No user found with email: ${email}`);
      }
      
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by email ${email}: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  async findById(id: string): Promise<User> {
    try {
      this.logger.log(`Finding user by ID: ${id}`);
      
      const user = await this.userRepository.findOne({ 
        where: { id } 
      });
      
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      
      this.logger.log(`Found user with ID: ${id}`);
      
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by ID ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserResDto>> {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      
      const user = await this.findById(id);
      
      // If email is being changed, check for uniqueness
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingUser = await this.userRepository.findOne({
          where: { email: updateUserDto.email }
        });
        
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException(`User with email ${updateUserDto.email} already exists`);
        }
      }
      
      const updatedUser = this.userRepository.merge(user, updateUserDto);
      const result = await this.userRepository.save(updatedUser);
      
      this.logger.log(`Successfully updated user with ID: ${id}`);
      
      const userResponse = this.mapToUserResponse(result);
      
      return ApiResponse.success(userResponse, 'User successfully updated');
    } catch (error) {
      this.logger.error(`Failed to update user with ID ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getMe(user: Partial<User>): Promise<ApiResponse<UserResDto>> {
    try {
      this.logger.log(`Getting current user profile for user ID: ${user.id}`);
      
      if (!user.id) {
        throw new BadRequestException('User ID is required');
      }
      
      const foundUser = await this.findById(user.id);
      
      const userResponse = this.mapToUserResponse(foundUser);
      
      return ApiResponse.success(userResponse, 'User profile successfully retrieved');
    } catch (error) {
      this.logger.error(`Failed to get user profile: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  private mapToUserResponse(user: User): UserResDto {
    const { password, ...userWithoutPassword } = user;
    
    return userWithoutPassword as UserResDto;
  }
} 