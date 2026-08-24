import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

/** Mesmos limites do cadastro — trocar a senha não pode enfraquecê-la. */
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;

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

  @IsOptional()
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
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
