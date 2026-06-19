import React from "react";
import type { TestListItem } from "../../interfaces";

interface PublishConfirmationModalProps {
    test: TestListItem;
    onCancel: () => void;
    onConfirm: () => void;
    publishing: boolean;
}

export const PublishConfirmationModal: React.FC<PublishConfirmationModalProps> = ({
    test,
    onCancel,
    onConfirm,
    publishing
}) => {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-gray-200 flex gap-4 transform transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Publish Test Template</h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        Are you sure you want to publish <span className="font-semibold text-gray-700">"{test.name}"</span>? Once published, students will be able to take this test immediately, and you will not be able to make further edits.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                            disabled={publishing}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold text-white cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                            disabled={publishing}
                        >
                            {publishing ? "Publishing..." : "Publish"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
