export class VeterinarioResponseDto {
  id!: string;
  nome!: string;
  email!: string;
  crmv!: string;
  telefone?: string;
  created_at!: Date;
  updated_at!: Date;
}
