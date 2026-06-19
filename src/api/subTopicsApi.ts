import api from "./axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { ApiResponse, Option } from "../interfaces";

/** Sub-topic shape with its parent topic reference */
export interface SubTopic extends Option {
    topic_id: string;
}

/**
 * Fetches sub-topics for multiple selected topics in a single request.
 * @param topicIds - array of topic UUIDs
 */
export const getSubTopicsByTopics = (topicIds: string[]) => {
    return api.post<ApiResponse<SubTopic[]>>(
        API_ROUTES.SUB_TOPICS.BY_MULTI_TOPICS,
        { topicIds },
    );
};
