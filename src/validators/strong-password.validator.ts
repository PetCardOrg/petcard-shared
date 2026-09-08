import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

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
    MaxLength(PASSWORD_MAX_LENGTH, {
      message: `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`,
    }),
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
