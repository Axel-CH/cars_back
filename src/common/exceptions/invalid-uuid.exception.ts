import { BadRequestException } from '@nestjs/common';

export class InvalidUUIDException extends BadRequestException {
  constructor(uuid: string) {
    super(`Invalid UUID format: "${uuid}"`);
  }
} 