import { Role } from '../../enums/role.enum';

export class TutorSessionUserDto {
  id!: string;
  name!: string;
  email!: string;
  phone?: string;
  profile_image_url?: string;
  email_verified!: boolean;
  role!: Role;
}

export class TutorSessionResponseDto {
  access_token!: string;
  user!: TutorSessionUserDto;
}
