import type { TestDetail } from "../../interfaces";
import ConfirmationDetailsCard from "./ConfirmationDetailsCard";
import SchedulingConfig from "./SchedulingConfig";
import type { LiveUntilOption } from "./SchedulingConfig";

interface TestConfirmationSectionProps {
    testDetail: TestDetail;
    questionsCount: number;
    publishing: boolean;
    error: string;
    onCancel: () => void;
    onConfirm: () => void;
    onEditTest: () => void;
    publishType: "now" | "schedule";
    setPublishType: (type: "now" | "schedule") => void;
    liveUntil: LiveUntilOption;
    setLiveUntil: (val: LiveUntilOption) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    endTime: string;
    setEndTime: (time: string) => void;
}

export default function TestConfirmationSection({
    testDetail,
    questionsCount,
    publishing,
    error,
    onCancel,
    onConfirm,
    onEditTest,
    publishType,
    setPublishType,
    liveUntil,
    setLiveUntil,
    endDate,
    setEndDate,
    endTime,
    setEndTime,
}: TestConfirmationSectionProps) {
    return (
        <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4 font-medium">Test creation</p>

            {/* Sub-header */}
            <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-bold text-gray-900">Test created</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    All {questionsCount} Questions done
                </span>
            </div>

            {/* Details Card */}
            <ConfirmationDetailsCard
                testDetail={testDetail}
                questionsCount={questionsCount}
                onEditTest={onEditTest}
            />

            {/* Scheduling */}
            <SchedulingConfig
                publishType={publishType}
                setPublishType={setPublishType}
                liveUntil={liveUntil}
                setLiveUntil={setLiveUntil}
                endDate={endDate}
                setEndDate={setEndDate}
                endTime={endTime}
                setEndTime={setEndTime}
            />

            {/* Validation Error */}
            {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 mb-4">
                    {error}
                </div>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2.5 text-sm font-semibold text-[#5988EF] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    disabled={publishing}
                    className="px-8 py-2.5 rounded-lg bg-[#5988EF] text-white text-sm font-semibold hover:bg-[#4a79e0] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                >
                    {publishing ? "Confirming..." : "Confirm"}
                </button>
            </div>
        </div>
    );
}
