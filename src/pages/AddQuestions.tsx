import { useAddQuestions } from "../hooks/useAddQuestions";
import TestSummaryCard  from "../components/AddQuestions/TestSummaryCard";
import QuestionsSidebar from "../components/AddQuestions/QuestionsSidebar";
import QuestionFormArea from "../components/AddQuestions/QuestionFormArea";

export default function AddQuestions() {
    const {
        testDetail, testId,
        questions, currentQuestion, activeIndex,
        errors, submitting,
        updateField, selectQuestion, addQuestion, deleteQuestion, handleSave,
        navigate,
    } = useAddQuestions();

    const tabLabel = testDetail?.type
        ? testDetail.type.charAt(0).toUpperCase() + testDetail.type.slice(1)
        : "Chapter Wise";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ── Top bar: breadcrumb + Publish ──────────────────────────────── */}
            <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
                <div className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
                    <span>Test Creation</span>
                    <span className="text-gray-300">/</span>
                    <span>Create Test</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-semibold">{tabLabel === "Chapterwise" ? "Chapter Wise" : tabLabel}</span>
                </div>
                <button
                    onClick={() => navigate(`/tests/${testId}/preview`)}
                    className="px-8 py-2.5 bg-[#7A8FF4] hover:bg-[#687DED] text-white text-[15px] font-semibold rounded-lg transition-colors cursor-pointer"
                >
                    Publish
                </button>
            </div>

            {/* Main content body with padding */}
            <div className="p-6 space-y-6">
                {/* ── Test summary card ─────────────────────────────────────────── */}
                <TestSummaryCard test={testDetail} testId={testId ?? ""} />

                {/* ── Main content: sidebar + form ─────────────────────────────── */}
                <div className="flex gap-6 items-start">
                    <QuestionsSidebar
                        questions={questions}
                        activeIndex={activeIndex}
                        onSelect={selectQuestion}
                        onDelete={deleteQuestion}
                    />

                    <QuestionFormArea
                        question={currentQuestion}
                        questionNumber={activeIndex + 1}
                        totalQuestions={questions.length}
                        testDetail={testDetail}
                        errors={errors}
                        submitting={submitting}
                        onUpdate={updateField}
                        onAddAnother={addQuestion}
                        onSave={handleSave}
                        onNavigate={() => {}}
                        onExit={() => navigate("/")}
                    />
                </div>
            </div>
        </div>
    );
}
