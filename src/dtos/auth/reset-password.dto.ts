import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsStrongPassword } from '../../validators/strong-password.validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  token!: string;

  @IsStrongPassword()
  password!: string;
}
