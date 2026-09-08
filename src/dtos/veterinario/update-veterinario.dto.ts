import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsStrongPassword } from '../../validators/strong-password.validator';

export class UpdateVeterinarioDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  /** Mesma regra do cadastro — trocar a senha não pode enfraquecê-la. */
  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  crmv?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefone?: string;

  /** URL da foto de perfil, devolvida pelo upload de imagem. */
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  foto_url?: string;
}
