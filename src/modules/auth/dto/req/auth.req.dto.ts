import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthReqDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
  password: string;
}
