/**
 * Centralized API route constants.
 * No magic strings in API call files — all paths live here.
 */
export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
    },
    SUBJECTS: {
        GET_ALL: "/subjects",
    },
    TOPICS: {
        BY_SUBJECT: (subjectId: string) => `/topics/subject/${subjectId}`,
    },
    SUB_TOPICS: {
        BY_MULTI_TOPICS: "/sub-topics/multi-topics",
    },
    TESTS: {
        BASE: "/tests",
        BY_ID: (id: string) => `/tests/${id}`,
    },
    QUESTIONS: {
        BULK_CREATE: "/questions/bulk",
        FETCH_BULK:  "/questions/fetchBulk",
    },
} as const;
