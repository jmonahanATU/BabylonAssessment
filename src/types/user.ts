export interface UserData {
  uid: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

export interface AuthFormData {
  fullName: string;
  email: string;
  password: string;
}