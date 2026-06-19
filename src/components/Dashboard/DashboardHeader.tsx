import React from "react";

interface DashboardHeaderProps {
    onCreateClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    onCreateClick
}) => {
    return (
        <div className="flex items-center justify-between gap-6 mb-8 max-w-7xl mx-auto">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-outfit">Dashboard</h1>
                </div>
            </div>

            <button
                onClick={onCreateClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create Test
            </button>
        </div>
    );
};
