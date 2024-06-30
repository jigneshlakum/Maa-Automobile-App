export interface User {
  id: string;
  name:string
  email: string;
  password: string;
  token:string
  message:string
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
