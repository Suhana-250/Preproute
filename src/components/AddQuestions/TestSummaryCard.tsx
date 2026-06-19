import { useNavigate } from "react-router-dom";
import type { TestDetail } from "../../interfaces";

interface TestSummaryCardProps {
    test: TestDetail | null;
    testId: string;
}

export default function TestSummaryCard({ test, testId }: TestSummaryCardProps) {
    const navigate = useNavigate();

    if (!test) {
        return (
            <div className="mx-6 mt-4 rounded-lg border border-gray-200 bg-white p-5 animate-pulse h-20" />
        );
    }

    const topics = Array.isArray(test.topics) ? test.topics : [];
    const subTopics = Array.isArray(test.sub_topics) ? test.sub_topics : [];

    // Stats variables
    const duration = test.total_time ? `${test.total_time} Min` : "80 Min";
    const questions = test.total_questions ? `${test.total_questions} Q's` : "50 Q's";
    const marks = test.total_marks ? `${test.total_marks} Marks` : "250 Marks";

    return (
        <div className="mx-6 mt-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm relative">
            {/* Edit Icon on top far right */}
            <button
                onClick={() => navigate(`/tests/${testId}/edit`)}
                className="absolute right-5 top-5 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Edit test parameters"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left side: Chapter classifications and tag badges */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        {/* Dark Navy Class badge */}
                        <span className="text-xs font-semibold text-white bg-[#0A1128] px-3.5 py-1 rounded-full capitalize shrink-0">
                            {test.type ? (test.type === "chapterwise" ? "Chapter Wise" : test.type) : "Chapter Wise"}
                        </span>
                        
                        {/* Main Title with custom SVG icon */}
                        <span className="text-base font-bold text-gray-900 truncate flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                            {test.name}
                        </span>
                        
                        {/* Difficulty Badge — green pill with icon */}
                        <span className="text-xs font-medium text-white bg-[#20B2AA] px-3 py-1 rounded-full capitalize tracking-wide shrink-0 flex items-center gap-1.5 ml-2">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {test.difficulty ?? "Easy"}
                        </span>
                    </div>

                    {/* Subject, Topic and Subtopic tags aligned list */}
                    <div className="flex flex-col gap-2.5 text-sm text-gray-500 mt-3">
                        {/* Subject */}
                        <div className="flex items-center">
                            <span className="w-20 text-gray-500 font-medium">Subject</span>
                            <span className="text-gray-400 mr-3">:</span>
                            <span className="font-semibold text-gray-800 text-xs">{test.subject || "English"}</span>
                        </div>

                        {/* Topic */}
                        <div className="flex items-center">
                            <span className="w-20 text-gray-500 font-medium">Topic</span>
                            <span className="text-gray-400 mr-3">:</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {topics.length > 0 ? (
                                    topics.map((t, i) => (
                                        <span key={i} className="px-2.5 py-0.5 border border-amber-300 text-amber-700 bg-amber-50/10 rounded-full text-xs font-medium">
                                            {t}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-2.5 py-0.5 border border-amber-300 text-amber-700 bg-amber-50/10 rounded-full text-xs font-medium">Grammar</span>
                                )}
                            </div>
                        </div>

                        {/* Sub Topic */}
                        <div className="flex items-center">
                            <span className="w-20 text-gray-500 font-medium">Sub Topic</span>
                            <span className="text-gray-400 mr-3">:</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {subTopics.length > 0 ? (
                                    subTopics.map((st, i) => (
                                        <span key={i} className="px-2.5 py-0.5 border border-yellow-300 text-yellow-700 bg-yellow-50/10 rounded-full text-xs font-medium">
                                            {st}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-2.5 py-0.5 border border-yellow-300 text-yellow-700 bg-yellow-50/10 rounded-full text-xs font-medium">Application</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats — absolutely positioned at bottom-right */}
            <div className="absolute bottom-5 right-5 flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-md text-xs font-semibold text-gray-500 bg-gray-50/20">
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {duration}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {questions}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    {marks}
                </span>
            </div>
        </div>
    );
}
