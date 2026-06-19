export type TestType = "chapterwise" | "pyq" | "mock";
export type Difficulty = "easy" | "medium" | "hard";

export interface Tab {
    label: string;
    value: TestType;
}

export const TEST_TABS: Tab[] = [
    { label: "Chapterwise", value: "chapterwise" },
    { label: "PYQ",         value: "pyq" },
    { label: "Mock Test",   value: "mock" },
];
