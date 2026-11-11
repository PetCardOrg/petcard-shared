/** Uma leitura do QR da coleira. */
export class PetScanResponseDto {
  id!: string;
  pet_id!: string;

  /** Ausentes quando quem escaneou recusou compartilhar a localização. */
  latitude?: number;
  longitude?: number;
  accuracy_meters?: number;

  created_at!: string;
}
