import React from "react";

interface DashboardFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedStatus: string;
    onStatusChange: (value: string) => void;
    selectedSubject: string;
    onSubjectChange: (value: string) => void;
    subjectsList: string[];
    sortBy: string;
    onSortChange: (value: string) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
    searchQuery,
    onSearchChange,
    selectedStatus,
    onStatusChange,
    selectedSubject,
    onSubjectChange,
    subjectsList,
    sortBy,
    onSortChange
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center shadow-sm max-w-7xl mx-auto">
            {/* Search */}
            <div className="relative w-full md:flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 placeholder-gray-400"
                />
            </div>

            {/* Subject Filter */}
            <div className="relative w-full md:w-48">
                <select
                    value={selectedSubject}
                    onChange={(e) => onSubjectChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 bg-white appearance-none"
                >
                    <option value="all">All Subjects</option>
                    {subjectsList.map(subj => (
                        <option key={subj} value={subj}>{subj}</option>
                    ))}
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Status Filter */}
            <div className="relative w-full md:w-48">
                <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 bg-white appearance-none"
                >
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="live">Live</option>
                    <option value="unpublished">Unpublished</option>
                    <option value="expired">Expired</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Sort Order dropdown */}
            <div className="relative w-full md:w-48">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 bg-white appearance-none"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};
