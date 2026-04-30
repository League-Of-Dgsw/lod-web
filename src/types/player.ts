export interface User {
  id: number;
  publicId?: string | null;
  studentId: string;
  username?: string;
  name: string;
  phone?: string;
  profileImage?: string | null;
  status?: "ACTIVE" | "INACTIVE" | "DELETED";
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  grade?: number;
  room?: number;
  number?: number;
  createdAt?: string;
  updatedAt?: string;
}
