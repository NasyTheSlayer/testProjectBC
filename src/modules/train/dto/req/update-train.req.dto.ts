import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainReqDto } from './create-train.req.dto';

export class UpdateTrainReqDto extends PartialType(CreateTrainReqDto) {}