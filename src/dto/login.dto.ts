import { IsString, IsDefined } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsDefined()
  public username: string;

  @IsString()
  @IsDefined()
  public password: string;
}
