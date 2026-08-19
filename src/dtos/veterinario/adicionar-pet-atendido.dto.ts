import { IsString, MinLength } from 'class-validator';

/**
 * Token da carteira digital lido no QR Code do pet.
 *
 * É o que liga o pet à lista do veterinário: quem tem o token esteve com o
 * pet na frente, que é a autorização de fato para o atendimento.
 */
export class AdicionarPetAtendidoDto {
  @IsString()
  @MinLength(1)
  token!: string;
}
