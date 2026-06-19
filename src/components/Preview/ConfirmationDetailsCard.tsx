import type { TestDetail } from "../../interfaces";

interface ConfirmationDetailsCardProps {
    testDetail: TestDetail;
    questionsCount: number;
    onEditTest: () => void;
}

export default function ConfirmationDetailsCard({
    testDetail,
    questionsCount,
    onEditTest,
}: ConfirmationDetailsCardProps) {
    const topics = Array.isArray(testDetail.topics) ? testDetail.topics : [];
    const subTopics = Array.isArray(testDetail.sub_topics) ? testDetail.sub_topics : [];

    // Format test type display
    const displayType = testDetail.type === "chapterwise" ? "Chapter Wise" :
                        testDetail.type === "pyq" ? "Previous Year Question" : "Mock Test";

    // Stats
    const duration = testDetail.total_time ? `${testDetail.total_time} Min` : "80 Min";
    const questionsLabel = `${questionsCount} Q's`;
    const marks = testDetail.total_marks ? `${testDetail.total_marks} Marks` : "250 Marks";

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm relative mb-4">
            {/* Edit icon — top right */}
            <button
                onClick={onEditTest}
                className="absolute right-5 top-5 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Edit test parameters"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>

            {/* Top badge row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* Dark pill type badge */}
                <span className="text-xs font-bold text-white bg-[#1E1B4B] px-2.5 py-1 rounded-md capitalize shrink-0">
                    {displayType}
                </span>

                {/* Test name with trophy emoji */}
                <span className="text-base font-bold text-gray-900 truncate">🏆 {testDetail.name}</span>

                {/* Difficulty badge — green pill */}
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {testDetail.difficulty ?? "Easy"}
                </span>
            </div>

            {/* Subject / Topic / Sub Topic rows */}
            <div className="flex flex-col gap-2.5 text-sm text-gray-500">
                {/* Subject */}
                <div className="flex items-center">
                    <span className="w-20 text-gray-500 font-medium text-sm">Subject</span>
                    <span className="text-gray-400 mr-3">:</span>
                    <span className="font-semibold text-gray-800 text-xs">{testDetail.subject || "English"}</span>
                </div>

                {/* Topic */}
                <div className="flex items-center">
                    <span className="w-20 text-gray-500 font-medium text-sm">Topic</span>
                    <span className="text-gray-400 mr-3">:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {topics.length > 0 ? (
                            topics.map((t, idx) => (
                                <span key={idx} className="px-2.5 py-0.5 border border-amber-300 text-amber-700 bg-amber-50/10 rounded-full text-xs font-medium">
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
                    <span className="w-20 text-gray-500 font-medium text-sm">Sub Topic</span>
                    <span className="text-gray-400 mr-3">:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {subTopics.length > 0 ? (
                            subTopics.map((st, idx) => (
                                <span key={idx} className="px-2.5 py-0.5 border border-yellow-300 text-yellow-700 bg-yellow-50/10 rounded-full text-xs font-medium">
                                    {st}
                                </span>
                            ))
                        ) : (
                            <span className="px-2.5 py-0.5 border border-yellow-300 text-yellow-700 bg-yellow-50/10 rounded-full text-xs font-medium">Application</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats — bottom right inline */}
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
                    {questionsLabel}
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
