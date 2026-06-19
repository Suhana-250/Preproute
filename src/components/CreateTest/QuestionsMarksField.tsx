interface QuestionsMarksFieldProps {
    totalQuestions: number;
    totalMarks: number;
    onQuestionsChange: (v: number) => void;
    error?: string;
}

export default function QuestionsMarksField({ totalQuestions, totalMarks, onQuestionsChange, error }: QuestionsMarksFieldProps) {
    return (
        <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-[#374151] mb-1">No of Questions</label>
                <input
                    type="number"
                    value={totalQuestions || ""}
                    placeholder="Ex: 50"
                    min={1}
                    onChange={(e) => onQuestionsChange(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[6px] text-sm outline-none focus:border-[#5988EF] placeholder-[#9CA3AF]"
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-[#374151] mb-1">Total Marks</label>
                <input
                    type="number"
                    value={totalMarks || ""}
                    readOnly
                    placeholder="Ex: 250"
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[6px] text-sm bg-[#F9FAFB] text-[#6B7280] cursor-not-allowed placeholder-[#9CA3AF]"
                />
                <p className="text-xs text-[#9CA3AF] mt-0.5">Auto = questions × correct marks</p>
            </div>
        </div>
    );
}
