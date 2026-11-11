export type AppointmentSyncStatus =
  | 'PENDING_CREATE'
  | 'PENDING_UPDATE'
  | 'PENDING_DELETE'
  | 'SYNCED'
  | 'FAILED';

export class AppointmentResponseDto {
  id!: string;
  title!: string;
  description?: string;
  scheduled_at!: string;
  duration_minutes!: number;
  location?: string;
  pet_id?: string;
  pet_name?: string;
  sync_status!: AppointmentSyncStatus;
  created_at!: Date;
  updated_at!: Date;
}
