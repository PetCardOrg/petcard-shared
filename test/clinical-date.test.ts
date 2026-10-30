import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateMedicationRecordDto, CreateVaccineRecordDto } from '../src';

const PET_ID = '7f3c2a1e-4b5d-4c6e-8f90-a1b2c3d4e5f6';

/** Regras que reprovaram a propriedade (vazio = valor aceito). */
function errosDe(dto: object, property: string): string[] {
  const erro = validateSync(dto).find((e) => e.property === property);
  return Object.keys(erro?.constraints ?? {});
}

function vacina(campos: Record<string, unknown>): CreateVaccineRecordDto {
  return plainToInstance(CreateVaccineRecordDto, {
    pet_id: PET_ID,
    vaccine_name: 'V10',
    applied_at: '2026-01-10',
    ...campos,
  });
}

function medicacao(campos: Record<string, unknown>): CreateMedicationRecordDto {
  return plainToInstance(CreateMedicationRecordDto, {
    pet_id: PET_ID,
    medication_name: 'Amoxicilina',
    dosage: '250mg',
    frequency: '12/12h',
    start_date: '2026-01-10',
    ...campos,
  });
}

describe('IsNotFutureDate', () => {
  it('aceita data passada', () => {
    assert.deepEqual(validateSync(vacina({})), []);
  });

  it('reprova data futura', () => {
    const amanha = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    assert.deepEqual(errosDe(vacina({ applied_at: amanha }), 'applied_at'), [
      'isNotFutureDate',
    ]);
  });

  it('deixa data inválida para o IsDateString reportar', () => {
    assert.deepEqual(errosDe(vacina({ applied_at: 'ontem' }), 'applied_at'), [
      'isDateString',
    ]);
  });
});

describe('IsAfterDate', () => {
  it('aceita next_dose_at depois de applied_at', () => {
    assert.deepEqual(validateSync(vacina({ next_dose_at: '2027-01-10' })), []);
  });

  it('reprova next_dose_at igual a applied_at', () => {
    assert.deepEqual(
      errosDe(vacina({ next_dose_at: '2026-01-10' }), 'next_dose_at'),
      ['isAfterDate'],
    );
  });

  it('reprova next_dose_at antes de applied_at', () => {
    assert.deepEqual(
      errosDe(vacina({ next_dose_at: '2025-12-31' }), 'next_dose_at'),
      ['isAfterDate'],
    );
  });

  it('não compara quando applied_at é inválida', () => {
    assert.deepEqual(
      errosDe(
        vacina({ applied_at: 'ontem', next_dose_at: '2020-01-01' }),
        'next_dose_at',
      ),
      [],
    );
  });
});

describe('IsOnOrAfterDate', () => {
  it('aceita end_date igual a start_date', () => {
    assert.deepEqual(validateSync(medicacao({ end_date: '2026-01-10' })), []);
  });

  it('reprova end_date antes de start_date', () => {
    assert.deepEqual(
      errosDe(medicacao({ end_date: '2026-01-09' }), 'end_date'),
      ['isOnOrAfterDate'],
    );
  });
});

describe('HasDosageQuantity', () => {
  it('aceita dosagem com quantidade', () => {
    assert.deepEqual(
      errosDe(medicacao({ dosage: '1 comprimido' }), 'dosage'),
      [],
    );
  });

  it('reprova dosagem sem número', () => {
    assert.deepEqual(errosDe(medicacao({ dosage: 'bastante' }), 'dosage'), [
      'hasDosageQuantity',
    ]);
  });
});
