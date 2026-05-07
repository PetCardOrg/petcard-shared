export interface ClinicaCoordinates {
  type: 'Point';
  coordinates: [number, number];
}

export class ClinicaResponseDto {
  id!: string;
  name!: string;
  address!: string;
  phone?: string;
  specialty?: string;
  coordinates!: ClinicaCoordinates;
  distance_meters!: number;
  created_at!: Date;
  updated_at!: Date;
}
