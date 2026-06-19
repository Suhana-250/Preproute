import api from "./axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { ApiResponse, Option } from "../interfaces";

/** Returns all available subjects. */
export const getSubjects = () => {
    return api.get<ApiResponse<Option[]>>(API_ROUTES.SUBJECTS.GET_ALL);
};
