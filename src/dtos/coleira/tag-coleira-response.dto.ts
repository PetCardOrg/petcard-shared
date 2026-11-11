/** O QR da coleira, na visão do tutor dono. */
export class TagColeiraResponseDto {
  pet_id!: string;
  /** Imagem PNG no S3. Ausente enquanto a fila ainda não gerou. */
  qr_code_url?: string;
  /** Endereço que o QR carrega — serve para compartilhar sem a imagem. */
  public_url!: string;
}
