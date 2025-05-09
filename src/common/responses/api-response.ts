import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data?: T,
    error?: string,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(
    data?: T,
    message = 'Success',
    statusCode = HttpStatus.OK,
  ): ApiResponse<T> {
    return new ApiResponse<T>(true, statusCode, message, data);
  }

  static error<T>(
    message = 'Error occurred',
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    error = 'Internal Server Error',
  ): ApiResponse<T> {
    return new ApiResponse<T>(false, statusCode, message, undefined, error);
  }
} 