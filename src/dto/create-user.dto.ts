import { IsString, IsDefined, Length, Validate } from 'class-validator';
import { ValidPassword, UniqueUsername } from '@/middleware/custom-validators';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @Length(3, 20)
  @Validate(UniqueUsername)
  public username: string;

  @IsDefined()
  @IsString()
  @Length(6, 20)
  @Validate(ValidPassword)
  public password: string;
}
