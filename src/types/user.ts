export interface UserData {
  uid: string;
  email: string;
  fullName: string;
  createdAt: any; // Can be Firestore Timestamp or Date
}

export interface AuthFormData {
  fullName: string;
  email: string;
  password: string;
}