import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Limites de senha alinhados com o cadastro de tutor na api.
 *
 * O mínimo de 6 aceitava senha que uma varredura quebra rápido; o bcrypt, do
 * outro lado, ignora em silêncio o que passa de 72 bytes — recusar é melhor
 * que truncar sem avisar quem cadastrou.
 */
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;

export class CreateVeterinarioDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
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
