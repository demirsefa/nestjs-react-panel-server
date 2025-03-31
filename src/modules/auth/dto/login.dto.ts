import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @MinLength(5)
  username: string;

  @IsString()
  @MinLength(5)
  password: string;
}
