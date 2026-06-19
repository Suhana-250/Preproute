import type { QuestionResponse } from "../../interfaces";

interface QuestionCardProps {
    question: QuestionResponse;
    index: number;
}

const OPTION_KEYS  = ["option1", "option2", "option3", "option4"] as const;
const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuestionCard({ question, index }: QuestionCardProps) {
    return (
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-5">
            {/* Question number + difficulty badge */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#EEF3FF] text-[#5988EF] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                    </span>
                    <p className="text-sm font-medium text-[#111827] leading-relaxed">{question.question}</p>
                </div>
                {question.difficulty && (
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium capitalize
                        ${question.difficulty === "easy"   ? "bg-green-100 text-green-700"  : ""}
                        ${question.difficulty === "medium" ? "bg-amber-100 text-amber-700"  : ""}
                        ${question.difficulty === "hard"   ? "bg-red-100   text-red-600"    : ""}`}>
                        {question.difficulty}
                    </span>
                )}
            </div>

            {/* Options */}
            <div className="space-y-2 ml-8">
                {OPTION_KEYS.map((key, i) => {
                    const isCorrect = question.correct_option === key;
                    return (
                        <div
                            key={key}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm
                                ${isCorrect
                                    ? "bg-green-50 border border-green-200 text-green-800 font-medium"
                                    : "bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151]"}`}
                        >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0
                                ${isCorrect ? "bg-green-500 text-white" : "bg-[#E5E7EB] text-[#6B7280]"}`}>
                                {OPTION_LABELS[i]}
                            </span>
                            {question[key]}
                            {isCorrect && (
                                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Explanation */}
            {question.explanation && (
                <div className="mt-3 ml-8 px-3 py-2 bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px]">
                    <p className="text-xs font-medium text-[#92400E] mb-0.5">Explanation</p>
                    <p className="text-xs text-[#78350F] leading-relaxed">{question.explanation}</p>
                </div>
            )}
        </div>
    );
}
