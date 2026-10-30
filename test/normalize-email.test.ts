import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateTutorDto, normalizeEmail } from '../src';

describe('normalizeEmail', () => {
  it('tira os espaços das pontas e passa para minúsculas', () => {
    assert.equal(normalizeEmail('  A@B.COM '), 'a@b.com');
  });

  it('não mexe em e-mail já canônico', () => {
    assert.equal(
      normalizeEmail('ana.silva@example.com'),
      'ana.silva@example.com',
    );
  });
});

describe('NormalizeEmail', () => {
  it('normaliza o e-mail do DTO antes da validação', () => {
    const dto = plainToInstance(CreateTutorDto, {
      name: 'Ana',
      email: '  Ana.Silva@Example.COM ',
    });
    assert.equal(dto.email, 'ana.silva@example.com');
    assert.deepEqual(validateSync(dto), []);
  });

  it('deixa valor que não é string para o IsEmail reprovar', () => {
    const dto = plainToInstance(CreateTutorDto, { name: 'Ana', email: 42 });
    assert.equal(dto.email, 42);
    const erro = validateSync(dto).find((e) => e.property === 'email');
    assert.ok(erro?.constraints?.isEmail);
  });
});
