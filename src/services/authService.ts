export interface AuthUser {
    name?: string;
    role?: string;
    userId?: string;
    [key: string]: unknown;
}

export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const saveUser = (user: AuthUser) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};