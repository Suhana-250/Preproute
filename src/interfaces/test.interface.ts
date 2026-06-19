/** A test item returned by GET /tests */
export interface TestListItem {
    id: string;
    name: string;
    subject: string;
    topics: string[];
    status: "draft" | "live" | "unpublished" | "scheduled" | "expired" | null;
    created_at: string;
    expires_at?: string;
    total_time?: number;
    total_questions?: number;
    total_marks?: number;
}

/** Full test detail returned by GET /tests/:id */
export interface TestDetail extends TestListItem {
    type: "chapterwise" | "pyq" | "mock";
    sub_topics: string[];
    correct_marks: number;
    wrong_marks: number;
    unattempt_marks: number;
    difficulty: "easy" | "medium" | "hard";
    total_time: number;
    total_marks: number;
    total_questions: number;
    questions: string[];
}
