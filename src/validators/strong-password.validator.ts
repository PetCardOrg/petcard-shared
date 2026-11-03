import { IsString, Matches, MinLength, ValidateBy } from 'class-validator';

/**
 * Mesma regra de senha forte da api (mobile#54): mínimo 8, teto de 72 bytes
 * (limite do bcrypt), maiúscula + número + caractere especial.
 *
 * O shared não pode depender da api, então a regra é replicada aqui — o vet
 * acessa dado clínico e não pode cadastrar senha mais fraca que a do tutor.
 *
 * Combina os decorators na mão (em vez de `applyDecorators` do
 * `@nestjs/common`) para não puxar esse pacote como dependência de runtime —
 * o shared é consumido também por web e mobile, que não têm Nest.
 */
const PASSWORD_MIN_LENGTH = 8;

/** Teto do bcrypt: o que passa de 72 bytes é ignorado em silêncio. */
export const PASSWORD_MAX_LENGTH = 72;

/**
 * Tamanho em bytes UTF-8, que é o que o bcrypt corta. `MaxLength` conta
 * unidades UTF-16: 60 letras acentuadas passavam com 120 bytes e a senha
 * gravada era só o começo do que a pessoa digitou.
 *
 * Contado por code point em vez de `TextEncoder` porque o build não tem os
 * tipos de DOM nem de Node; o resultado é o mesmo (surrogate solto vira
 * U+FFFD, 3 bytes, nos dois).
 */
function utf8ByteLength(value: string): number {
  let bytes = 0;
  for (const char of value) {
    const code = char.codePointAt(0) as number;
    if (code < 0x80) bytes += 1;
    else if (code < 0x800) bytes += 2;
    else if (code < 0x10000) bytes += 3;
    else bytes += 4;
  }
  return bytes;
}

function MaxBytes(max: number, message: string): PropertyDecorator {
  return ValidateBy({
    name: 'maxBytes',
    validator: {
      validate: (value: unknown) =>
        typeof value === 'string' && utf8ByteLength(value) <= max,
      defaultMessage: () => message,
    },
  });
}

function combine(...decorators: PropertyDecorator[]): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    for (const decorator of decorators) {
      decorator(target, propertyKey);
    }
  };
}

export function IsStrongPassword(): PropertyDecorator {
  return combine(
    IsString(),
    MinLength(PASSWORD_MIN_LENGTH, {
      message: `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`,
    }),
    MaxBytes(
      PASSWORD_MAX_LENGTH,
      `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} bytes. Letras acentuadas contam como 2 e emoji como 4.`,
    ),
    Matches(/[A-Z]/, {
      message: 'A senha deve conter ao menos uma letra maiúscula.',
    }),
    Matches(/[0-9]/, {
      message: 'A senha deve conter ao menos um número.',
    }),
    Matches(/[^A-Za-z0-9]/, {
      message: 'A senha deve conter ao menos um caractere especial.',
    }),
  );
}
