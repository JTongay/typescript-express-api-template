import { ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint } from 'class-validator';
import getDecorators from 'inversify-inject-decorators';
import { IUsersController } from '@/controllers/types';
import { TYPES } from '@/inversify.types';
import { container } from '@/inversify.config';

const { lazyInject } = getDecorators(container);

@ValidatorConstraint({ async: true })
export class UniqueUsername implements ValidatorConstraintInterface {
  @lazyInject(TYPES.IUserController) private _usersController: IUsersController;

  public async validate (
    text: string,
    args: ValidationArguments
  ): Promise<boolean> {
    return !(await this._usersController.getUserByUsername(text));
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Username $value is already taken';
  }
}
