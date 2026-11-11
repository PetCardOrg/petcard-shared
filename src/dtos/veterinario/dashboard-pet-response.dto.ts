export class DashboardPetResponseDto {
  id!: string;
  name!: string;
  species!: string;
  breed?: string;
  photo_url?: string;
  tutor_name!: string;
  last_attended_at!: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
