import { DevicePlatform } from '../../enums/device-platform.enum';

export class DeviceTokenResponseDto {
  id!: string;
  tutor_id!: string;
  token!: string;
  platform!: DevicePlatform;
  created_at!: Date;
  last_seen_at!: Date;
}
