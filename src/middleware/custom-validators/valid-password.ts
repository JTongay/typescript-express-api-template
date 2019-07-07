import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments } from 'class-validator';

@ValidatorConstraint()
export class ValidPassword implements ValidatorConstraintInterface {

  public validate(text: string, args: ValidationArguments): boolean {
    const passwordReqEx: RegExp = new RegExp(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    );
    return passwordReqEx.test(text);
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Password must contain at least one number, one uppercase letter, and one lowercase letter';
  }
}
