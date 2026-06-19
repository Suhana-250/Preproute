import api from "./axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { ApiResponse, TestListItem, TestDetail, CreateTestPayload } from "../interfaces";

/** Fetches all tests for the current user. */
export const getTests = () => {
    return api.get<ApiResponse<TestListItem[]>>(API_ROUTES.TESTS.BASE);
};

/**
 * Creates a new test.
 * @param payload - Full test creation payload
 */
export const createTest = (payload: CreateTestPayload) => {
    return api.post<ApiResponse<TestDetail>>(API_ROUTES.TESTS.BASE, payload);
};

/**
 * Updates an existing test (e.g., add questions, change status).
 * @param id - Test UUID
 * @param payload - Partial update payload
 */
export const updateTest = (
    id: string,
    payload: Partial<CreateTestPayload> & { status?: string; questions?: string[] },
) => {
    return api.put<ApiResponse<TestDetail>>(API_ROUTES.TESTS.BY_ID(id), payload);
};

/**
 * Fetches a single test by its ID including all questions.
 * @param id - Test UUID
 */
export const getTestById = (id: string) => {
    return api.get<ApiResponse<TestDetail>>(API_ROUTES.TESTS.BY_ID(id));
};

/**
 * Deletes a test by its ID.
 * @param id - Test UUID
 */
export const deleteTest = (id: string) => {
    return api.delete<ApiResponse<null>>(API_ROUTES.TESTS.BY_ID(id));
};
