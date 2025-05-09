import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.req.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {} 