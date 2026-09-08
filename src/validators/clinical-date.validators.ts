import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

/**
 * Regras cruzadas de data dos registros clínicos (vacina, vermífugo,
 * medicação), trazidas do front (`healthRecordValidation.ts` do
 * petcard-web) para o DTO — a API aceitava qualquer data antes disso.
 *
 * `IsDateString` cuida do formato; aqui só entra em jogo quando o valor já é
 * uma data parseável, então o `IsDateString` continua sendo quem reporta
 * formato inválido.
 */

function parseDate(value: unknown): Date | null {
  if (typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Data não pode ser futura (ex.: `applied_at` de vacina/vermífugo). */
export function IsNotFutureDate(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isNotFutureDate',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          const date = parseDate(value);
          if (!date) return true;
          return date.getTime() <= Date.now();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} não pode estar no futuro.`;
        },
      },
    });
  };
}

/**
 * Data estritamente posterior à de outra propriedade (ex.: `next_dose_at`
 * depois de `applied_at`). Se qualquer um dos dois lados não for uma data
 * parseável, deixa passar — quem reporta isso é `IsDateString`/`IsOptional`.
 */
export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isAfterDate',
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedProperty] = args.constraints as [string];
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedProperty
          ];
          const target = parseDate(value);
          const related = parseDate(relatedValue);
          if (!target || !related) return true;
          return target.getTime() > related.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedProperty] = args.constraints as [string];
          return `${args.property} deve ser posterior a ${relatedProperty}.`;
        },
      },
    });
  };
}

/**
 * Data igual ou posterior à de outra propriedade (ex.: `end_date` de
 * medicação não pode terminar antes de `start_date`).
 */
export function IsOnOrAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isOnOrAfterDate',
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedProperty] = args.constraints as [string];
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedProperty
          ];
          const target = parseDate(value);
          const related = parseDate(relatedValue);
          if (!target || !related) return true;
          return target.getTime() >= related.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedProperty] = args.constraints as [string];
          return `${args.property} não pode ser anterior a ${relatedProperty}.`;
        },
      },
    });
  };
}

/** Dosagem precisa conter uma quantidade ("250mg" serve, "bastante" não). */
export function HasDosageQuantity(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'hasDosageQuantity',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return true;
          return /\d/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve conter uma quantidade (ex.: "250mg").`;
        },
      },
    });
  };
}
