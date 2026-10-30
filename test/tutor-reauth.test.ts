import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DeleteTutorDto, UpdateTutorDto } from '../src';

/** Propriedades que reprovaram (vazio = corpo aceito). */
function errosDe<T extends object>(
  cls: new () => T,
  body: Record<string, unknown>,
): string[] {
  return validateSync(plainToInstance(cls, body)).map((e) => e.property);
}

describe('UpdateTutorDto: reautenticação ao trocar e-mail', () => {
  it('exige senha_atual ou google_id_token quando vem email', () => {
    assert.deepEqual(errosDe(UpdateTutorDto, { email: 'novo@example.com' }), [
      'senha_atual',
    ]);
  });

  it('aceita email com senha_atual', () => {
    assert.deepEqual(
      errosDe(UpdateTutorDto, {
        email: 'novo@example.com',
        senha_atual: 'SenhaAntiga1!',
      }),
      [],
    );
  });

  it('aceita email com google_id_token (conta só-Google)', () => {
    assert.deepEqual(
      errosDe(UpdateTutorDto, {
        email: 'novo@example.com',
        google_id_token: 'eyJhbGciOi.token.google',
      }),
      [],
    );
  });

  it('não exige reautenticação quando só muda o nome', () => {
    assert.deepEqual(errosDe(UpdateTutorDto, { name: 'Maria' }), []);
  });
});

describe('DeleteTutorDto', () => {
  it('exige senha_atual ou google_id_token', () => {
    assert.deepEqual(errosDe(DeleteTutorDto, {}), ['senha_atual']);
  });

  it('aceita senha_atual', () => {
    assert.deepEqual(
      errosDe(DeleteTutorDto, { senha_atual: 'SenhaAntiga1!' }),
      [],
    );
  });

  it('aceita google_id_token', () => {
    assert.deepEqual(
      errosDe(DeleteTutorDto, { google_id_token: 'eyJhbGciOi.token.google' }),
      [],
    );
  });

  it('reprova google_id_token maior que 4096', () => {
    assert.deepEqual(
      errosDe(DeleteTutorDto, { google_id_token: 'a'.repeat(4097) }),
      ['google_id_token'],
    );
  });
});
