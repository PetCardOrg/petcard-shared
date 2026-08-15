import { NotaClinicaResponseDto } from '../nota-clinica/nota-clinica-response.dto';
import { CarteiraDigitalPublicResponseDto } from './carteira-digital-public-response.dto';

/**
 * Carteira vista por um **veterinário com CRMV verificado** que possui o token
 * do QR (api#113).
 *
 * Estende a carteira pública com o que a api#114 retirou dela por ser sensível:
 * notas clínicas e medicações em uso. A carteira pública segue anônima e
 * mínima — aqui a verificação do registro profissional é o que libera o extra.
 */
export class CarteiraDigitalClinicaResponseDto extends CarteiraDigitalPublicResponseDto {
  clinical_notes!: NotaClinicaResponseDto[];
  /** CRMV do veterinário que acessou, registrado junto ao acesso. */
  accessed_by_crmv!: string;
}
