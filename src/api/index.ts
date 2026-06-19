/**
 * Barrel export for the api/ folder.
 * Import all API functions from a single path:
 *   import { getTests, createTest } from "../api";
 */

export { loginUser }              from "./authApi";
export { getSubjects }            from "./SubjectsApi";
export { getTopicsBySubject }     from "./topicsApi";
export { getSubTopicsByTopics }   from "./subTopicsApi";
export { getTests, createTest, updateTest, getTestById, deleteTest } from "./TestsApi";
export { createQuestionsBulk, fetchQuestionsBulk } from "./questionsApi";
