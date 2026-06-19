/** Request body for POST /auth/login */
export interface LoginRequest {
    userId: string;
    password: string;
}

/** Shape of the user object returned after login */
export interface AuthUser {
    id: string;
    name?: string;
    email?: string;
    role?: string;
}

/** Data payload returned by POST /auth/login */
export interface LoginResponseData {
    token: string;
    user: AuthUser;
}
