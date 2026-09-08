import { Transform } from 'class-transformer';

/**
 * Forma canônica de um e-mail no PetCard: sem espaços nas pontas e todo em
 * minúsculas.
 *
 * O endereço é a identidade da conta, e o usuário não digita a mesma caixa
 * duas vezes: quem se cadastra como "Ana.Silva@Example.com" pede a
 * recuperação de senha como "ana.silva@example.com" e entra pelo Google com
 * um terceiro formato. Sem uma forma canônica, cada variação vira uma conta
 * diferente — ou, pior, uma conta que existe mas nenhuma busca acha.
 *
 * A parte local de um e-mail é sensível a caixa no RFC 5321, mas nenhum
 * provedor real trata "Ana" e "ana" como caixas distintas; casar por
 * minúsculas é o comportamento que o usuário espera.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Aplica {@link normalizeEmail} ao valor recebido antes da validação.
 *
 * Vale como conveniência na borda: o que garante a normalização é o serviço,
 * que também é chamado por caminhos que não passam por `ValidationPipe`.
 */
export function NormalizeEmail(): PropertyDecorator {
  return Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? normalizeEmail(value) : value,
  );
}
