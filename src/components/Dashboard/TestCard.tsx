import React from "react";
import type { TestListItem } from "../../interfaces";
import { getSubjectStyles } from "./getSubjectStyles";

interface TestCardProps {
    test: TestListItem;
    onViewClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const getStatusBadgeStyles = (status: string | null) => {
    switch (status) {
        case "live":
            return {
                container: "text-green-700 bg-green-50 border border-green-200",
                dot: "bg-green-500",
                pulse: true
            };
        case "unpublished":
            return {
                container: "text-amber-700 bg-amber-50 border border-amber-200",
                dot: "bg-amber-500",
                pulse: false
            };
        case "draft":
            return {
                container: "text-gray-700 bg-gray-100 border border-gray-200",
                dot: "bg-gray-400",
                pulse: false
            };
        case "expired":
            return {
                container: "text-red-700 bg-red-50 border border-red-200",
                dot: "bg-red-500",
                pulse: false
            };
        case "scheduled":
            return {
                container: "text-violet-700 bg-violet-50 border border-violet-200",
                dot: "bg-violet-500",
                pulse: false
            };
        default:
            return {
                container: "text-blue-700 bg-blue-50 border border-blue-200",
                dot: "bg-blue-500",
                pulse: false
            };
    }
};

export const TestCard: React.FC<TestCardProps> = ({
    test,
    onViewClick,
    onEditClick,
    onDeleteClick
}) => {
    const subStyles = getSubjectStyles(test.subject);
    const statusInfo = getStatusBadgeStyles(test.status);

    // Dynamic stats with reasonable fallbacks if the API doesn't return them
    const duration = test.total_time ? `${test.total_time} Mins` : "180 Mins";
    const questions = test.total_questions ? `${test.total_questions} Questions` : "90 Questions";
    const marks = test.total_marks ? `${test.total_marks} Marks` : "360 Marks";

    const createdAtFormatted = new Date(test.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100">
            {/* Top colored accent stripe */}
            <div className={`h-1 w-full absolute top-0 left-0 ${subStyles.bar}`} />

            {/* Card Body */}
            <div className="p-5 pt-6 flex-1 flex flex-col">
                {/* Top Row: Subject & Status */}
                <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${subStyles.pill}`}>
                        {test.subject || "General"}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${statusInfo.container}`}>
                        <span className="relative flex h-2 w-2 shrink-0">
                            {statusInfo.pulse && (
                                <span className="animate-ping absolute top-0 left-0 h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${statusInfo.dot}`}></span>
                        </span>
                        {test.status ? test.status.charAt(0).toUpperCase() + test.status.slice(1) : "No status"}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-[1.15rem] font-bold text-gray-900 tracking-tight line-clamp-1 mb-1.5 mt-2" title={test.name}>
                    {test.name}
                </h2>

                {/* Topics */}
                <p className="text-[0.85rem] text-gray-400 line-clamp-1">
                    <span className="font-medium text-gray-500">Topics:</span> {test.topics && test.topics.length > 0 ? test.topics.join(", ") : "None"}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 my-3">
                    <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-xs">{duration}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-medium text-xs">{questions}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        <span className="font-medium text-xs">{marks}</span>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-2">
                    <span className="text-[0.75rem] text-gray-400 font-medium tracking-wide">
                        Created at : {createdAtFormatted}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onViewClick}
                            className="p-2 bg-indigo-50 text-indigo-600 border border-transparent hover:bg-indigo-600 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                            title="View"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button
                            onClick={onEditClick}
                            className="p-2 bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                            title="Edit"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            onClick={onDeleteClick}
                            className="p-2 bg-red-50 text-red-500 border border-transparent hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                            title="Delete"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
