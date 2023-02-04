import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(username: string) {
    super(`User: ${username} not found`, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistedException extends HttpException {
  constructor(username: string) {
    super(`User: ${username} already existed`, HttpStatus.CONFLICT);
  }
}
