import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidValidationCodeException extends HttpException {
  constructor() {
    super('Invalid validation code', HttpStatus.BAD_REQUEST);
  }
}

export class ExpiredValidationCodeException extends HttpException {
  constructor() {
    super('Validation code has expired', HttpStatus.BAD_REQUEST);
  }
}
