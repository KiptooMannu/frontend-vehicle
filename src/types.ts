export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  contact_phone: string;
  address: string;
}

export interface LoginResponse {
  token: string;
  user: {
    user_id: number;
    username: string;
    email: string;
    role: string;
  };
}



export interface RegisterResponse {
  token: string;
  role: string;
}
