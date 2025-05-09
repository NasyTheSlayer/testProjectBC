import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  Patch, 
  Query, 
  HttpCode, 
  HttpStatus,
  ParseUUIDPipe
} from '@nestjs/common';
import { TrainService } from './services/train.service';
import { CreateTrainReqDto } from './dto/req/create-train.req.dto';
import { UpdateTrainReqDto } from './dto/req/update-train.req.dto';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { GetAllTrainsResponseDto } from './dto/res/getAll-train.res.dto';
import { TrainResponseDto } from './dto/res/train.res.dto';
import { ApiResponse } from 'src/common/responses/api-response';

@Controller('trains')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTrainReqDto): Promise<ApiResponse<TrainResponseDto>> {
    return await this.trainService.create(dto);
  }

  @SkipAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<ApiResponse<GetAllTrainsResponseDto>> {
    return await this.trainService.getAll(search, page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<TrainResponseDto>> {
    return await this.trainService.getById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: UpdateTrainReqDto
  ): Promise<ApiResponse<TrainResponseDto>> {
    return await this.trainService.updateById(id, dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async partialUpdate(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: UpdateTrainReqDto
  ): Promise<ApiResponse<TrainResponseDto>> {
    return await this.trainService.updateById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.trainService.deleteById(id);
  }
}