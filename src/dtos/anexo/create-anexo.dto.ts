import { IsIn, IsUUID } from 'class-validator';

/**
 * Registros que aceitam comprovante. A nota clínica é texto do veterinário.
 *
 * Literais de string (os mesmos valores de `EntidadeClinica`) para os clientes
 * enviarem o campo sem importar o enum em tempo de execução.
 */
export const ENTIDADES_COM_ANEXO = [
  'VACINA',
  'VERMIFUGO',
  'MEDICACAO',
] as const;

export type EntidadeComAnexo = (typeof ENTIDADES_COM_ANEXO)[number];

/**
 * Campos de texto do `multipart/form-data` que acompanham o arquivo
 * (`POST /pets/:petId/anexos`). O arquivo em si vai na parte `file`.
 */
export class CreateAnexoDto {
  @IsIn(ENTIDADES_COM_ANEXO)
  entidade!: EntidadeComAnexo;

  /** Id da vacina, do vermífugo ou da medicação, conforme `entidade`. */
  @IsUUID()
  entidade_id!: string;
}
