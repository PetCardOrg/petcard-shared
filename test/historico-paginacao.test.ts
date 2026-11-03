import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { HistoricoClinicoQueryDto } from '../src';

/** Propriedades que reprovaram (vazio = corpo aceito). */
function errosDe<T extends object>(
  cls: new () => T,
  body: Record<string, unknown>,
): string[] {
  return validateSync(plainToInstance(cls, body)).map((e) => e.property);
}

describe('HistoricoClinicoQueryDto: paginação opcional (AUD API-22)', () => {
  it('sem parâmetros é válido (resposta completa, como antes)', () => {
    assert.deepEqual(errosDe(HistoricoClinicoQueryDto, {}), []);
  });

  it('converte o limit da query string e aceita o cursor', () => {
    const query = plainToInstance(HistoricoClinicoQueryDto, {
      limit: '20',
      cursor: 'abc',
    });
    assert.equal(query.limit, 20);
    assert.deepEqual(
      validateSync(query).map((e) => e.property),
      [],
    );
  });

  it('reprova limit fora de 1 a 100', () => {
    assert.deepEqual(errosDe(HistoricoClinicoQueryDto, { limit: '0' }), [
      'limit',
    ]);
    assert.deepEqual(errosDe(HistoricoClinicoQueryDto, { limit: '101' }), [
      'limit',
    ]);
  });
});
