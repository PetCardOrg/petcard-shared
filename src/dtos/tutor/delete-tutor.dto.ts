import { IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';
import { PASSWORD_MAX_LENGTH } from '../../validators/strong-password.validator';

/**
 * Corpo do `DELETE /tutors/me`. Excluir a conta é irreversível, então só o
 * token de sessão não basta: conta com senha manda `senha_atual`; conta
 * só-Google manda um `google_id_token` obtido na hora. A API decide qual dos
 * dois vale para a conta.
 */
export class DeleteTutorDto {
  @ValidateIf((dto: DeleteTutorDto) => dto.google_id_token === undefined)
  @IsString()
  @MaxLength(PASSWORD_MAX_LENGTH)
  senha_atual?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4096)
  google_id_token?: string;
}
