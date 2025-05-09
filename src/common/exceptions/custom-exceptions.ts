import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error: 'Bad Request',
    }, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
      error: 'Unauthorized',
    }, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      message,
      error: 'Forbidden',
    }, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error: 'Not Found',
    }, HttpStatus.NOT_FOUND);
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super({
      statusCode: HttpStatus.CONFLICT,
      message,
      error: 'Conflict',
    }, HttpStatus.CONFLICT);
  }
} 