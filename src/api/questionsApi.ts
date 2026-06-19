import api from "./axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { ApiResponse, QuestionPayload, QuestionResponse } from "../interfaces";

/**
 * Bulk-creates questions for a test in a single request.
 * @param questions - Array of question payloads (each includes test_id)
 */
export const createQuestionsBulk = (questions: QuestionPayload[]) => {
    return api.post<ApiResponse<QuestionResponse[]>>(
        API_ROUTES.QUESTIONS.BULK_CREATE,
        { questions },
    );
};

/**
 * Fetches multiple questions by their IDs.
 * @param question_ids - Array of question UUIDs
 */
export const fetchQuestionsBulk = (question_ids: string[]) => {
    return api.post<ApiResponse<QuestionResponse[]>>(
        API_ROUTES.QUESTIONS.FETCH_BULK,
        { question_ids },
    );
};
