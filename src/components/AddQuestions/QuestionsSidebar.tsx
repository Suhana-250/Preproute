import type { QuestionFormData } from "../../interfaces";

interface QuestionsSidebarProps {
    questions: QuestionFormData[];
    activeIndex: number;
    onSelect: (index: number) => void;
    onDelete: (index: number) => void;
}

function isComplete(q: QuestionFormData): boolean {
    return !!(q.question.trim() && q.option1.trim() && q.option2.trim() && q.option3.trim() && q.option4.trim());
}

export default function QuestionsSidebar({ questions, activeIndex, onSelect, onDelete }: QuestionsSidebarProps) {
    return (
        <aside className="w-[260px] shrink-0 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden self-start shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Question creation</span>
                <button 
                    type="button"
                    className="text-blue-500 hover:text-blue-600 transition-colors text-xs font-semibold cursor-pointer"
                    title="Collapse panel"
                >
                    &lt;&lt;
                </button>
            </div>
            
            {/* Total count sub-header */}
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-semibold">
                Total Questions . {questions.length}
            </div>

            {/* Question list */}
            <ul className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[60vh]">
                {questions.map((q, i) => {
                    const active    = i === activeIndex;
                    const complete  = isComplete(q);

                    return (
                        <li key={i} className="group relative">
                            <div
                                onClick={() => onSelect(i)}
                                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all
                                    ${active || complete
                                        ? "bg-white border-[#28a745] text-[#28a745] shadow-sm shadow-emerald-100/50"
                                        : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"}`}
                            >
                                {/* Checkmark representing completed state vs empty checkbox dot */}
                                <div className="flex items-center gap-2 min-w-0">
                                    {active || complete ? (
                                        <span className="w-4 h-4 rounded-full bg-[#28a745] flex items-center justify-center shrink-0">
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    ) : (
                                        <span className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0 bg-white flex items-center justify-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                        </span>
                                    )}

                                    {/* Label */}
                                    <span className="truncate">Question {i + 1}</span>
                                </div>

                                {/* Arrow indicator */}
                                <span className={`text-[10px] font-bold shrink-0 ${active || complete ? "text-[#28a745]" : "text-gray-300"}`}>
                                    &gt;&gt;
                                </span>
                            </div>

                            {/* Delete button (only when multiple questions, overlaying on hover) */}
                            {questions.length > 1 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(i); }}
                                    className="absolute -right-1 -top-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-sm z-10"
                                    title="Remove question"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
