import { IsString, IsDateString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTrainReqDto {
  @IsNotEmpty({ message: 'Train number cannot be empty' })
  @IsString({ message: 'Train number must be a string' })
  @MinLength(2, { message: 'Train number must contain at least 2 characters' })
  @MaxLength(10, { message: 'Train number cannot exceed 10 characters' })
  number: string;

  @IsNotEmpty({ message: 'Departure station cannot be empty' })
  @IsString({ message: 'Departure station must be a string' })
  @MinLength(2, { message: 'Departure station must contain at least 2 characters' })
  departure: string;

  @IsNotEmpty({ message: 'Destination station cannot be empty' })
  @IsString({ message: 'Destination station must be a string' })
  @MinLength(2, { message: 'Destination station must contain at least 2 characters' })
  destination: string;

  @IsNotEmpty({ message: 'Carrier cannot be empty' })
  @IsString({ message: 'Carrier must be a string' })
  @MinLength(2, { message: 'Carrier must contain at least 2 characters' })
  carrier: string;

  @IsNotEmpty({ message: 'Departure time cannot be empty' })
  @IsDateString({}, { message: 'Departure time must be in ISO 8601 format' })
  departureTime: string;

  @IsNotEmpty({ message: 'Arrival time cannot be empty' })
  @IsDateString({}, { message: 'Arrival time must be in ISO 8601 format' })
  arrivalTime: string;
}