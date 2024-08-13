export interface UserEntity {
  id: number;
  email: string;
  password: string;
  country: string;
  phone: string;
  firstname: string;
  lastname: string;
  id_address: number;
  nationality: string;
  iban: string;
  bic: string;
  active: boolean;
  created_at: Date;
  ca: number;
  tt: number;
  rtt: number;
  image_key: string;
}
