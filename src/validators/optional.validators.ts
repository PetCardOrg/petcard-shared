import { ValidateIf } from 'class-validator';

/**
 * Campo que o PATCH pode omitir, mas não anular (AUD SH-09).
 *
 * O `@IsOptional()` pula a validação com `undefined` **e** com `null`, então
 * `{ vaccine_name: null }` passava e virava 500 no banco. Aqui só a ausência
 * pula; `null` cai nas outras regras (`@IsString()`, `@IsDateString()`…) e
 * reprova. Nos campos que podem ser limpos, continua o `@IsOptional()`.
 */
export function IsOptionalNaoNulo(): PropertyDecorator {
  return ValidateIf((_, value) => value !== undefined);
}
