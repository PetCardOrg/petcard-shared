/** Uma sugestão do autocomplete do Google Places. */
export class PlaceSuggestionResponseDto {
  /** Id do place no Google. Não é persistido; serve para `key` na lista. */
  placeId!: string;

  /** Nome do estabelecimento, ou o logradouro quando a sugestão é endereço. */
  mainText!: string;

  /** Endereço (ou cidade/estado, no caso de sugestão de endereço). */
  secondaryText?: string;

  /** Texto completo — é o que vai para o campo "Local" do agendamento. */
  fullText!: string;
}
