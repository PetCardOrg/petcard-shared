export class CalendarConnectResponseDto {
  auth_url?: string;
  connected?: boolean;
  message?: string;
}

export class CalendarStatusResponseDto {
  connected!: boolean;
}
