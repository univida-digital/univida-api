import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidValidationCodeException extends HttpException {
  constructor(message: string = 'Invalid validation code') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
export class ExpiredValidationCodeException extends HttpException {
  constructor(message: string = 'Validation code has expired') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
