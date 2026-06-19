import React from "react";
import type { TestListItem } from "../../interfaces";

interface DeleteConfirmationModalProps {
    test: TestListItem;
    onCancel: () => void;
    onConfirm: () => void;
    deleting: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    test,
    onCancel,
    onConfirm,
    deleting
}) => {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-gray-200 flex gap-4 transform transition-all">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Delete Test Template</h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        Are you sure you want to delete <span className="font-semibold text-gray-700">"{test.name}"</span>? This action cannot be undone and all associated data will be permanently lost.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                            disabled={deleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm font-semibold text-white cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
