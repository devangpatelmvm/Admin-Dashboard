export interface user {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  admin: boolean;
  createdAt?: Date,
  updatedDate?: Date,
}
