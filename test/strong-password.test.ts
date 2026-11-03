import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateVeterinarioDto, UpdateVeterinarioDto } from '../src';

/** Regras que reprovaram a senha (vazio = senha aceita). */
function errosDaSenha(password: string): string[] {
  const dto = plainToInstance(UpdateVeterinarioDto, {
    password,
    senha_atual: 'qualquer',
  });
  const erro = validateSync(dto).find((e) => e.property === 'password');
  return Object.keys(erro?.constraints ?? {});
}

describe('IsStrongPassword', () => {
  it('aceita senha com maiúscula, número e caractere especial', () => {
    assert.deepEqual(errosDaSenha('Senha123!'), []);
  });

  it('reprova senha sem número', () => {
    assert.deepEqual(errosDaSenha('SenhaForte!'), ['matches']);
  });

  it('reprova senha sem maiúscula', () => {
    assert.deepEqual(errosDaSenha('senha123!'), ['matches']);
  });

  it('reprova senha sem caractere especial', () => {
    assert.deepEqual(errosDaSenha('Senha1234'), ['matches']);
  });

  it('reprova senha com menos de 8 caracteres', () => {
    assert.deepEqual(errosDaSenha('Se1!'), ['minLength']);
  });

  it('aceita 72 caracteres ASCII', () => {
    assert.deepEqual(errosDaSenha('A1!' + 'a'.repeat(69)), []);
  });

  it('reprova 73 caracteres', () => {
    assert.deepEqual(errosDaSenha('A1!' + 'a'.repeat(70)), ['maxBytes']);
  });

  it('reprova 60 caracteres acentuados (mais de 72 bytes)', () => {
    // 'á' ocupa 2 bytes em UTF-8: 3 + 57 × 2 = 117 bytes.
    assert.deepEqual(errosDaSenha('A1!' + 'á'.repeat(57)), ['maxBytes']);
  });

  it('aceita acentos enquanto couber em 72 bytes', () => {
    // 3 + 34 × 2 + 1 = 72 bytes.
    assert.deepEqual(errosDaSenha('A1!' + 'á'.repeat(34) + 'a'), []);
  });

  it('conta emoji como 4 bytes', () => {
    // 3 + 17 × 4 = 71 bytes passa; com mais um emoji, 75 reprova.
    assert.deepEqual(errosDaSenha('A1!' + '🐶'.repeat(17)), []);
    assert.deepEqual(errosDaSenha('A1!' + '🐶'.repeat(18)), ['maxBytes']);
  });

  it('é exigida no cadastro do veterinário', () => {
    const dto = plainToInstance(CreateVeterinarioDto, {
      nome: 'Ana Silva',
      email: 'ana@example.com',
      crmv: 'CE-12345',
    });
    const erro = validateSync(dto).find((e) => e.property === 'password');
    assert.ok(erro, 'cadastro sem senha deveria reprovar');
  });
});

describe('UpdateVeterinarioDto.senha_atual', () => {
  it('é exigida quando vem password', () => {
    const dto = plainToInstance(UpdateVeterinarioDto, {
      password: 'Senha123!',
    });
    const erro = validateSync(dto).find((e) => e.property === 'senha_atual');
    assert.ok(erro, 'troca de senha sem senha_atual deveria reprovar');
  });

  it('não é exigida quando só muda o nome', () => {
    const dto = plainToInstance(UpdateVeterinarioDto, { nome: 'Ana Souza' });
    assert.deepEqual(validateSync(dto), []);
  });

  it('é exigida quando vem email', () => {
    const dto = plainToInstance(UpdateVeterinarioDto, {
      email: 'nova@example.com',
    });
    const erro = validateSync(dto).find((e) => e.property === 'senha_atual');
    assert.ok(erro, 'troca de e-mail sem senha_atual deveria reprovar');
  });

  it('aceita troca de e-mail com senha_atual', () => {
    const dto = plainToInstance(UpdateVeterinarioDto, {
      email: 'nova@example.com',
      senha_atual: 'SenhaAntiga1!',
    });
    assert.deepEqual(validateSync(dto), []);
  });
});
