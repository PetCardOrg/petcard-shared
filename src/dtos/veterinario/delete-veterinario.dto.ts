import { IsString, MaxLength } from 'class-validator';
import { PASSWORD_MAX_LENGTH } from '../../validators/strong-password.validator';

/**
 * Corpo do `DELETE /veterinarios/me` (AUD API-28). Excluir a conta é
 * irreversível, então só o token de sessão não basta: o vet confirma com a
 * senha atual. Toda conta de vet tem senha (não há login Google para vet).
 */
export class DeleteVeterinarioDto {
  @IsString()
  @MaxLength(PASSWORD_MAX_LENGTH)
  senha_atual!: string;
}
