import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NormalizeEmail } from '../../validators/normalize-email.validator';
import { IsStrongPassword } from '../../validators/strong-password.validator';

export class CreateVeterinarioDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome!: string;

  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsStrongPassword()
  password!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  crmv!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefone?: string;
}
