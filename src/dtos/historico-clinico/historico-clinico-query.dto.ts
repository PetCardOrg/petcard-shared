import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Paginação por cursor do `GET /pets/:petId/historico-clinico` (AUD API-22).
 *
 * Opcional: sem `limit`, a resposta traz o histórico inteiro, como antes, para
 * os clientes que ainda não paginam. Com `limit`, a resposta traz até `limit`
 * itens e, se houver mais, o `proximo_cursor` para pedir a página seguinte.
 */
export class HistoricoClinicoQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  /** `proximo_cursor` da página anterior. Opaco: não montar no cliente. */
  @IsOptional()
  @IsString()
  cursor?: string;
}
