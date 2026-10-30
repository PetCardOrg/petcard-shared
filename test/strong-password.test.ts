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
    assert.deepEqual(errosDaSenha('A1!' + 'a'.repeat(70)), ['maxLength']);
  });

  it.todo(
    'reprova senha com até 72 caracteres mas mais de 72 bytes (SH-02, P5)',
  );

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

  it.todo('é exigida quando vem email (SH-03, P5)');
});
