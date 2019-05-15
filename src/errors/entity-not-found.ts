import { BaseError } from './Base.error';

export class EntityNotFoundError extends BaseError {
  constructor(message: string, status: number = 404) {
    const entity: string = `${message}.not_found`;
    super(entity, status);
  }
}
