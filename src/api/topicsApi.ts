import api from "./axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { ApiResponse, Option } from "../interfaces";

/** Topic shape with its parent subject reference */
export interface Topic extends Option {
    subject_id: string;
}

/**
 * Fetches all topics belonging to a given subject.
 * @param subjectId - UUID of the subject
 */
export const getTopicsBySubject = (subjectId: string) => {
    return api.get<ApiResponse<Topic[]>>(API_ROUTES.TOPICS.BY_SUBJECT(subjectId));
};
