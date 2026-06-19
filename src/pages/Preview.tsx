import { useState } from "react";
import { usePreview } from "../hooks/usePreview";
import TestDetailSection from "../components/Preview/TestDetailSection";
import QuestionCard      from "../components/Preview/QuestionCard";
import TestConfirmationSection from "../components/Preview/TestConfirmationSection";
import type { LiveUntilOption } from "../components/Preview/SchedulingConfig";
import type { QuestionResponse } from "../interfaces";

// ── Read-only sidebar (replicates the AddQuestions sidebar style) ─────────────
function PreviewSidebar({
    questions,
    activeIndex,
    onSelect,
}: {
    questions: QuestionResponse[];
    activeIndex: number;
    onSelect: (i: number) => void;
}) {
    return (
        <aside className="w-[260px] shrink-0 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden self-start shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Question creation</span>
                <span className="text-gray-400 text-xs font-semibold">&lt;&lt;</span>
            </div>

            {/* Total count */}
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-semibold">
                Total Questions . {questions.length}
            </div>

            {/* Question list */}
            <ul className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[60vh]">
                {questions.map((q, i) => {
                    const active = i === activeIndex;
                    // All questions in preview are "complete"
                    return (
                        <li key={q.id ?? i}>
                            <div
                                onClick={() => onSelect(i)}
                                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all
                                    ${active
                                        ? "bg-indigo-50/50 border-indigo-400 text-indigo-700 shadow-sm"
                                        : "bg-emerald-50/30 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                    }`}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    {/* Green checkmark dot */}
                                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="truncate">Question {i + 1}</span>
                                </div>
                                <span className={`text-[10px] font-bold shrink-0 ${active ? "text-indigo-500" : "text-emerald-500"}`}>&gt;</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

export default function Preview() {
    const {
        testDetail, questions, loading,
        publishing, published, error,
        testId, handlePublish, navigate,
    } = usePreview();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [publishType, setPublishType] = useState<"now" | "schedule">("now");
    const [liveUntil, setLiveUntil] = useState<LiveUntilOption>("always");
    const [activeIndex, setActiveIndex] = useState(0);

    // Custom duration dates
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [validationError, setValidationError] = useState("");

    const checkPastDate = (dateVal: string, timeVal: string) => {
        if (!dateVal) {
            setValidationError("");
            return;
        }

        const now = new Date();
        const selectedStartOfDay = new Date(`${dateVal}T00:00:00`);
        const todayStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (selectedStartOfDay < todayStartOfDay) {
            setValidationError("Expiration date and time cannot be in the past.");
            return;
        }

        if (selectedStartOfDay.getTime() === todayStartOfDay.getTime()) {
            if (timeVal) {
                const expiryDate = new Date(`${dateVal}T${timeVal}`);
                if (!isNaN(expiryDate.getTime()) && expiryDate.getTime() < now.getTime()) {
                    setValidationError("Expiration date and time cannot be in the past.");
                    return;
                }
            }
        }

        setValidationError("");
    };

    // ── Full-page success screen ──────────────────────────────────────────────
    if (published) {
        return (
            <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
                <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-10 text-center max-w-sm w-full shadow-sm animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-[#111827] mb-2">Test Published!</h2>
                    <p className="text-sm text-[#6B7280]">Your test is now live. Redirecting to dashboard…</p>
                </div>
            </div>
        );
    }

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F8FA] px-6 py-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-[#E5E7EB] rounded w-48" />
                    <div className="h-[140px] bg-white rounded-[10px] border border-[#E5E7EB]" />
                    <div className="h-[200px] bg-white rounded-[10px] border border-[#E5E7EB]" />
                </div>
            </div>
        );
    }

    // Shared sidebar for both views
    const sidebar = (
        <PreviewSidebar
            questions={questions}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
        />
    );

    // ── Test Confirmation Screen ──────────────────────────────────────────────
    if (showConfirmation && testDetail) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex flex-col">
                {/* Top bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
                    <div className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
                        <span>Test Creation</span>
                        <span className="text-gray-300">/</span>
                        <span>Create Test</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-semibold">Chapter Wise</span>
                    </div>
                    <button
                        onClick={() => navigate(`/tests/${testId}/questions`)}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                    >
                        Publish
                    </button>
                </div>

                {/* Body: sidebar + confirmation content */}
                <div className="p-6 flex gap-6 items-start">
                    {sidebar}
                    <div className="flex-1 min-w-0">
                        <TestConfirmationSection
                            testDetail={testDetail}
                            questionsCount={questions.length}
                            publishing={publishing}
                            error={validationError || error}
                            onCancel={() => {
                                setValidationError("");
                                setShowConfirmation(false);
                            }}
                            onConfirm={() => {
                                setValidationError("");
                                let expiresAt: string | undefined;
                                const nowMs = Date.now();
                                if (liveUntil === "1week") {
                                    expiresAt = new Date(nowMs + 7 * 24 * 60 * 60 * 1000).toISOString();
                                } else if (liveUntil === "2weeks") {
                                    expiresAt = new Date(nowMs + 14 * 24 * 60 * 60 * 1000).toISOString();
                                } else if (liveUntil === "3weeks") {
                                    expiresAt = new Date(nowMs + 21 * 24 * 60 * 60 * 1000).toISOString();
                                } else if (liveUntil === "1month") {
                                    expiresAt = new Date(nowMs + 30 * 24 * 60 * 60 * 1000).toISOString();
                                } else if (liveUntil === "custom") {
                                    if (!endDate) {
                                        setValidationError("Please select an end date.");
                                        return;
                                    }
                                    const expiryDate = new Date(`${endDate}T${endTime || "00:00"}`);
                                    if (isNaN(expiryDate.getTime())) {
                                        setValidationError("Invalid date or time format.");
                                        return;
                                    }
                                    if (expiryDate.getTime() < nowMs) {
                                        setValidationError("Expiration date and time cannot be in the past.");
                                        return;
                                    }
                                    expiresAt = expiryDate.toISOString();
                                }
                                if (validationError) return;
                                handlePublish(expiresAt);
                            }}
                            onEditTest={() => navigate(`/tests/${testId}/edit`)}
                            publishType={publishType}
                            setPublishType={(val) => setPublishType(val)}
                            liveUntil={liveUntil}
                            setLiveUntil={(val) => {
                                setLiveUntil(val);
                                if (val === "custom") {
                                    checkPastDate(endDate, endTime);
                                } else {
                                    setValidationError("");
                                }
                            }}
                            endDate={endDate}
                            setEndDate={(val) => {
                                setEndDate(val);
                                checkPastDate(val, endTime);
                            }}
                            endTime={endTime}
                            setEndTime={(val) => {
                                setEndTime(val);
                                checkPastDate(endDate, val);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // ── Regular Preview Screen ────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col">

            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
                <div className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
                    <span>Test Creation</span>
                    <span className="text-gray-300">/</span>
                    <span>Create Test</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-semibold">Chapter Wise</span>
                </div>
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                >
                    Publish
                </button>
            </div>

            {/* Error banner */}
            {error && (
                <div className="mx-6 mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Body: sidebar + preview content */}
            <div className="p-6 flex gap-6 items-start">
                {sidebar}

                <div className="flex-1 min-w-0 space-y-4">
                    {/* Test details card */}
                    {testDetail && (
                        <TestDetailSection
                            test={testDetail}
                            testId={testId ?? ""}
                            onEditTest={() => navigate(`/tests/${testId}/edit`)}
                            onEditQuestions={() => navigate(`/tests/${testId}/questions`)}
                        />
                    )}

                    {/* Questions list */}
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base font-semibold text-gray-900">
                            Questions
                            <span className="ml-2 text-sm font-normal text-gray-400">({questions.length})</span>
                        </h2>
                    </div>

                    {questions.length === 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-sm text-gray-400">
                            No questions added yet.{" "}
                            <button
                                onClick={() => navigate(`/tests/${testId}/questions`)}
                                className="text-indigo-500 hover:underline"
                            >
                                Add questions →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {questions.map((q, i) => (
                                <QuestionCard key={q.id ?? i} question={q} index={i} />
                            ))}
                        </div>
                    )}

                    {/* Bottom publish button */}
                    {questions.length > 0 && (
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowConfirmation(true)}
                                className="px-8 py-2.5 bg-[#5988EF] text-white text-sm font-semibold rounded-lg hover:bg-[#4a79e0] transition-colors shadow-sm cursor-pointer"
                            >
                                Publish Test
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
