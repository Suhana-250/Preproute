/**
 * Generic API response wrapper that matches the backend's standard response shape.
 * Use this as the return type for all API calls.
 *
 * @example
 * const response: ApiResponse<Subject[]> = await api.get("/subjects");
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
}

/**
 * Shape of a backend validation/error response.
 * Used by extractApiError to produce human-readable messages.
 */
export interface ApiErrorDetail {
    type: string;
    value: unknown;
    msg: string;
    path: string;
    location: string;
}

export interface ApiErrorResponse {
    status: "error";
    message: string;
    errors?: ApiErrorDetail[];
}
