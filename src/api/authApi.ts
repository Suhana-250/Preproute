import api from "./axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { ApiResponse, LoginRequest, LoginResponseData } from "../interfaces";

/**
 * Authenticates a user and returns a JWT token.
 * @param data - { userId, password }
 */
export const loginUser = (data: LoginRequest) => {
    return api.post<ApiResponse<LoginResponseData>>(API_ROUTES.AUTH.LOGIN, data);
};