import type { TestDetail } from "../../interfaces";

interface TestDetailSectionProps {
    test: TestDetail;
    testId: string;
    onEditTest: () => void;
    onEditQuestions: () => void;
}

const FIELD_STYLE = "text-sm text-[#374151]";
const LABEL_STYLE = "text-xs font-medium text-[#9CA3AF] uppercase tracking-wide";

export default function TestDetailSection({ test, testId: _testId, onEditTest, onEditQuestions }: TestDetailSectionProps) {
    const topics    = Array.isArray(test.topics)    ? test.topics    : [];
    const subTopics = Array.isArray(test.sub_topics) ? test.sub_topics : [];

    const rows: { label: string; value: string }[] = [
        { label: "Test Name",       value: test.name },
        { label: "Subject",         value: test.subject },
        { label: "Type",            value: test.type },
        { label: "Difficulty",      value: test.difficulty },
        { label: "Duration",        value: `${test.total_time} minutes` },
        { label: "Total Questions", value: String(test.total_questions) },
        { label: "Total Marks",     value: String(test.total_marks) },
        { label: "Correct Marks",   value: String(test.correct_marks) },
        { label: "Wrong Marks",     value: String(test.wrong_marks) },
        { label: "Unattempted",     value: String(test.unattempt_marks) },
    ];

    return (
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-5 mb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#111827]">Test Details</h2>
                <button
                    onClick={onEditTest}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5988EF] border border-[#5988EF] rounded-[6px] hover:bg-[#EEF3FF] transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Test
                </button>
            </div>

            {/* 2-column grid of fields */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                {rows.map(({ label, value }) => (
                    <div key={label}>
                        <p className={LABEL_STYLE}>{label}</p>
                        <p className={`${FIELD_STYLE} capitalize mt-0.5`}>{value || "—"}</p>
                    </div>
                ))}
            </div>

            {/* Topics */}
            {topics.length > 0 && (
                <div className="mt-3">
                    <p className={LABEL_STYLE}>Topics</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {topics.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#EEF3FF] text-[#5988EF] text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Sub-topics */}
            {subTopics.length > 0 && (
                <div className="mt-3">
                    <p className={LABEL_STYLE}>Sub-topics</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {subTopics.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit questions shortcut */}
            <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex justify-end">
                <button
                    onClick={onEditQuestions}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B7280] border border-[#D1D5DB] rounded-[6px] hover:bg-[#F9FAFB] transition-colors"
                >
                    Edit Questions
                </button>
            </div>
        </div>
    );
}
