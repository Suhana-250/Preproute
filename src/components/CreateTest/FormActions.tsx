interface FormActionsProps {
    submitting: boolean;
    onCancel: () => void;
    onDraft: () => void;
    onNext: () => void;
}

export default function FormActions({ submitting, onCancel, onDraft, onNext }: FormActionsProps) {
    return (
        <div className="px-6 mt-8 flex items-center justify-end gap-3 border-t border-[#E5E7EB] pt-4">
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 rounded-[6px] border border-[#D1D5DB] text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={onDraft}
                disabled={submitting}
                className="px-6 py-2 rounded-[6px] border border-[#5988EF] text-sm font-medium text-[#5988EF] hover:bg-[#EEF3FF] transition-colors disabled:opacity-50"
            >
                Save as Draft
            </button>
            <button
                type="button"
                onClick={onNext}
                disabled={submitting}
                className="px-6 py-2 rounded-[6px] bg-[#5988EF] text-sm font-medium text-white hover:bg-[#4a79e0] transition-colors disabled:opacity-50"
            >
                {submitting ? "Saving..." : "Next"}
            </button>
        </div>
    );
}
