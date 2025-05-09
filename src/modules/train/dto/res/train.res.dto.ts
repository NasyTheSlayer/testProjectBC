export class TrainResponseDto {
  readonly id: string;
  readonly number: string;
  readonly departure: string;
  readonly destination: string;
  readonly carrier: string;
  readonly departureTime: Date;
  readonly arrivalTime: Date;
  readonly createdAt: Date;
} 