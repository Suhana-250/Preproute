export interface CreateTestPayload {
    name: string;
    type: "chapterwise" | "pyq" | "mock";
    subject: string;
    topics: string[];
    sub_topics: string[];
    correct_marks: number;
    wrong_marks: number;
    unattempt_marks: number;
    difficulty: "easy" | "medium" | "hard";
    total_time: number;
    total_marks: number;
    total_questions: number;
    status: "draft" | "live" | "unpublished" | "scheduled" | "expired";
    expires_at?: string;
}
