import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreatePetDto, UpdatePetDto } from '../src';

const URL_LONGA = 'https://example.com/' + 'a'.repeat(2048 - 20 + 1);

/** Regras que reprovaram o `photo_url` (vazio = aceito). */
function errosDaFoto(dto: object): string[] {
  const erro = validateSync(dto).find((e) => e.property === 'photo_url');
  return Object.keys(erro?.constraints ?? {});
}

describe('photo_url do pet', () => {
  it('UpdatePetDto aceita URL de até 2048 caracteres', () => {
    const url = URL_LONGA.slice(0, 2048);
    const dto = plainToInstance(UpdatePetDto, { photo_url: url });
    assert.deepEqual(errosDaFoto(dto), []);
  });

  it('UpdatePetDto reprova URL com mais de 2048 caracteres', () => {
    const dto = plainToInstance(UpdatePetDto, { photo_url: URL_LONGA });
    assert.deepEqual(errosDaFoto(dto), ['maxLength']);
  });

  it('CreatePetDto reprova URL com mais de 2048 caracteres', () => {
    const dto = plainToInstance(CreatePetDto, { photo_url: URL_LONGA });
    assert.deepEqual(errosDaFoto(dto), ['maxLength']);
  });
});
