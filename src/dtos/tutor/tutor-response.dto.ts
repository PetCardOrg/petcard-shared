import { Role } from '../../enums/role.enum';

export class TutorResponseDto {
  id!: string;
  auth0_id!: string;
  name!: string;
  email!: string;
  phone?: string;
  profile_image_url?: string;
  role!: Role;
  created_at!: Date;
  updated_at!: Date;
}
