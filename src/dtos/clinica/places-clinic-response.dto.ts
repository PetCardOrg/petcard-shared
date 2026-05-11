export class PlacesClinicResponseDto {
  placeId!: string;
  name!: string;
  address!: string;
  phone?: string;
  rating?: number;
  userRatingCount?: number;
  openNow?: boolean;
  weekdayHours?: string[];
  coordinates!: { lat: number; lng: number };
  distanceMeters!: number;
  photoUrl?: string;
  websiteUrl?: string;
  googleMapsUrl?: string;
  types?: string[];
  businessStatus?: string;
}
