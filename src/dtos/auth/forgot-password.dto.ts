import { IsEmail, MaxLength } from 'class-validator';
import { NormalizeEmail } from '../../validators/normalize-email.validator';

export class ForgotPasswordDto {
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email!: string;
}
