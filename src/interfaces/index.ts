/**
 * Barrel export for the interfaces/ folder.
 * Import all interfaces from this single entry point:
 *   import type { Option, FormErrors, CreateTestPayload } from "../interfaces";
 */

export type { Option }                from "./option.interface";
export type { FormErrors }            from "./testForm.interface";
export type { CreateTestPayload }     from "./testPayload.interface";
export type { LoginRequest, LoginResponseData, AuthUser } from "./auth.interface";
export type { ApiResponse, ApiErrorDetail, ApiErrorResponse } from "./api.interface";
export type { TestListItem, TestDetail } from "./test.interface";
export type { QuestionFormData, QuestionPayload, QuestionResponse } from "./question.interface";
export { emptyQuestion } from "./question.interface";
