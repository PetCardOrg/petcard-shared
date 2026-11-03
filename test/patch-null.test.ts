import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
  UpdateDewormingRecordDto,
  UpdateMedicationRecordDto,
  UpdateNotaClinicaDto,
  UpdateVaccineRecordDto,
} from '../src';

/** Propriedades que reprovaram (vazio = corpo aceito). */
function errosDe<T extends object>(
  cls: new () => T,
  body: Record<string, unknown>,
): string[] {
  return validateSync(plainToInstance(cls, body)).map((e) => e.property);
}

describe('DTOs de PATCH: null em campo obrigatório (AUD SH-09)', () => {
  it('reprova null nos obrigatórios da vacina', () => {
    assert.deepEqual(
      errosDe(UpdateVaccineRecordDto, {
        vaccine_name: null,
        applied_at: null,
      }).sort(),
      ['applied_at', 'vaccine_name'],
    );
  });

  it('aceita null nos anuláveis da vacina (limpar o campo)', () => {
    assert.deepEqual(
      errosDe(UpdateVaccineRecordDto, {
        next_dose_at: null,
        veterinarian_name: null,
        notes: null,
      }),
      [],
    );
  });

  it('continua aceitando campo ausente (PATCH parcial)', () => {
    assert.deepEqual(errosDe(UpdateVaccineRecordDto, {}), []);
    assert.deepEqual(errosDe(UpdateMedicationRecordDto, {}), []);
  });

  it('reprova null nos obrigatórios do vermífugo e aceita nos anuláveis', () => {
    assert.deepEqual(
      errosDe(UpdateDewormingRecordDto, { product_name: null }),
      ['product_name'],
    );
    assert.deepEqual(
      errosDe(UpdateDewormingRecordDto, { next_dose_at: null, notes: null }),
      [],
    );
  });

  it('reprova null nos obrigatórios da medicação e aceita no end_date', () => {
    assert.deepEqual(
      errosDe(UpdateMedicationRecordDto, {
        medication_name: null,
        dosage: null,
        frequency: null,
        start_date: null,
      }).sort(),
      ['dosage', 'frequency', 'medication_name', 'start_date'],
    );
    assert.deepEqual(
      errosDe(UpdateMedicationRecordDto, { end_date: null, notes: null }),
      [],
    );
  });

  it('reprova diagnóstico null na nota e aceita null nos opcionais', () => {
    assert.deepEqual(errosDe(UpdateNotaClinicaDto, { diagnostico: null }), [
      'diagnostico',
    ]);
    assert.deepEqual(
      errosDe(UpdateNotaClinicaDto, { prescricao: null, observacoes: null }),
      [],
    );
  });
});
