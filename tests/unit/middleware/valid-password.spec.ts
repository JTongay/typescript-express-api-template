import { ValidPassword } from '@/middleware/custom-validators';
import 'jest';
import { ValidationArguments } from 'class-validator';

describe('ValidPassword ValidatorMiddleware', () => {
  const mockValidationArguments: ValidationArguments = {
    value: 'Booyah',
    constraints: [],
    targetName: '',
    object: {},
    property: ''
  };
  it('should be defined', () => {
    expect(ValidPassword).toBeDefined();
  });
  it('should return true as a valid password', () => {
    const validPassword = new ValidPassword();
    expect(validPassword.validate('Howdy89', mockValidationArguments)).toBeTruthy();
  });
});
