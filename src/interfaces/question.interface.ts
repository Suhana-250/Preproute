import type { Difficulty } from "../types/test.types";

/** Single question as stored in the form (local state) */
export interface QuestionFormData {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_option: "option1" | "option2" | "option3" | "option4";
    explanation: string;
    difficulty: Difficulty | "";
    media_url: string;
}

/** What we send to POST /questions/bulk */
export interface QuestionPayload {
    type: "mcq";
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_option: "option1" | "option2" | "option3" | "option4";
    explanation?: string;
    difficulty?: Difficulty;
    test_id: string;
    subject: string;
    media_url?: string;
}

/** Question returned from the API after creation */
export interface QuestionResponse extends QuestionPayload {
    id: string;
}

/** Returns a blank question form */
export const emptyQuestion = (): QuestionFormData => ({
    question:       "",
    option1:        "",
    option2:        "",
    option3:        "",
    option4:        "",
    correct_option: "option1",
    explanation:    "",
    difficulty:     "",
    media_url:      "",
});
