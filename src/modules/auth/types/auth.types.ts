export type AdminRole = 'admin';

export interface AdminBase {
  id: string;
  email: string;
}

export interface JwtPayload extends Pick<AdminBase, 'email'> {
  sub: string;
  role: AdminRole;
  iat?: number;
  exp?: number;
}
//interface TODO: remove ts
export type AdminResponse = AdminBase;

export interface LoginResponse {
  access_token: string;
  admin: AdminResponse;
}
