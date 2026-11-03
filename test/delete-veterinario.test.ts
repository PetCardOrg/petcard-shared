import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DeleteVeterinarioDto } from '../src';

/** Propriedades que reprovaram (vazio = corpo aceito). */
function errosDe<T extends object>(
  cls: new () => T,
  body: Record<string, unknown>,
): string[] {
  return validateSync(plainToInstance(cls, body)).map((e) => e.property);
}

describe('DeleteVeterinarioDto (AUD API-28)', () => {
  it('exige senha_atual', () => {
    assert.deepEqual(errosDe(DeleteVeterinarioDto, {}), ['senha_atual']);
  });

  it('aceita com senha_atual', () => {
    assert.deepEqual(
      errosDe(DeleteVeterinarioDto, { senha_atual: 'SenhaAtual1!' }),
      [],
    );
  });
});
