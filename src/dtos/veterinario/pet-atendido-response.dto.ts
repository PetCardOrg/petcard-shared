/**
 * Pet que passou a constar na lista do veterinário.
 *
 * O vínculo é explícito e persistente: uma vez aberto pelo QR, o pet só sai
 * da lista quando o veterinário remove. Não depende de haver registro clínico
 * vivo — apagar o que se registrou não faz o pet sumir do dashboard.
 */
export class PetAtendidoResponseDto {
  pet_id!: string;
  pet_nome!: string;
  /** Quando o pet entrou na lista deste veterinário. */
  adicionado_em!: Date;
  /** `false` quando o pet já estava na lista e este acesso só o atualizou. */
  novo!: boolean;
}
