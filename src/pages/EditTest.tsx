import { useEditTest } from "../hooks/useEditTest";
import { TEST_TABS }   from "../types/test.types";

// Reuse the exact same field components from CreateTest
import TestBreadcrumb      from "../components/CreateTest/TestBreadcrumb";
import TestTabsBar         from "../components/CreateTest/TestTabsBar";
import ErrorBanner         from "../components/CreateTest/ErrorBanner";
import SubjectField        from "../components/CreateTest/SubjectField";
import NameField           from "../components/CreateTest/NameField";
import TopicField          from "../components/CreateTest/TopicField";
import SubTopicField       from "../components/CreateTest/SubTopicField";
import DurationField       from "../components/CreateTest/DurationField";
import DifficultyField     from "../components/CreateTest/DifficultyField";
import MarkingSchemeField  from "../components/CreateTest/MarkingSchemeField";
import QuestionsMarksField from "../components/CreateTest/QuestionsMarksField";

export default function EditTest() {
    const {
        loading,
        testType, setTestType,
        subjects, topics, subTopics,
        selectedSubject, setSelectedSubject,
        selectedTopics,  setSelectedTopics,
        selectedSubTopics, setSelectedSubTopics,
        name, setName,
        difficulty, setDifficulty,
        totalTime, setTotalTime,
        correctMarks, setCorrectMarks,
        wrongMarks, setWrongMarks,
        unattemptMarks, setUnattemptMarks,
        totalQuestions, setTotalQuestions,
        totalMarks,
        submitting, errors,
        handleUpdate,
        navigate,
        testId,
    } = useEditTest();

    const tabLabel = TEST_TABS.find((t) => t.value === testType)?.label ?? "";

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-white px-6 py-4 animate-pulse space-y-4">
                <div className="h-3 bg-[#E5E7EB] rounded w-48" />
                <div className="h-8 bg-[#E5E7EB] rounded w-64" />
                <div className="grid grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 bg-[#E5E7EB] rounded" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">

            <TestBreadcrumb tabLabel={`Edit — ${tabLabel}`} />
            <TestTabsBar testType={testType} onTabChange={setTestType} />
            <ErrorBanner message={errors.api} />

            {/* 2-column form grid — identical layout to CreateTest */}
            <div className="px-6 grid grid-cols-2 gap-x-10 gap-y-5">

                <SubjectField
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSubjectChange={setSelectedSubject}
                    error={errors.subject}
                />

                <NameField
                    value={name}
                    onChange={setName}
                    error={errors.name}
                />

                <TopicField
                    topics={topics}
                    selectedTopics={selectedTopics}
                    onTopicsChange={setSelectedTopics}
                    disabled={selectedSubject.length === 0}
                    error={errors.topics}
                />

                <SubTopicField
                    subTopics={subTopics}
                    selectedSubTopics={selectedSubTopics}
                    onSubTopicsChange={setSelectedSubTopics}
                    disabled={selectedTopics.length === 0}
                />

                <DurationField
                    value={totalTime}
                    onChange={setTotalTime}
                    error={errors.totalTime}
                />

                <DifficultyField
                    value={difficulty}
                    onChange={setDifficulty}
                />

                <MarkingSchemeField
                    wrongMarks={wrongMarks}
                    unattemptMarks={unattemptMarks}
                    correctMarks={correctMarks}
                    onWrongChange={setWrongMarks}
                    onUnattemptChange={setUnattemptMarks}
                    onCorrectChange={setCorrectMarks}
                />

                <QuestionsMarksField
                    totalQuestions={totalQuestions}
                    totalMarks={totalMarks}
                    onQuestionsChange={setTotalQuestions}
                    error={errors.totalQuestions}
                />

            </div>

            {/* Action buttons */}
            <div className="px-6 mt-8 flex items-center justify-end gap-3 border-t border-[#E5E7EB] pt-4">
                <button
                    type="button"
                    onClick={() => navigate(`/tests/${testId}/preview`)}
                    className="px-6 py-2 rounded-[6px] border border-[#D1D5DB] text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={submitting}
                    className="px-6 py-2 rounded-[6px] bg-[#5988EF] text-sm font-medium text-white hover:bg-[#4a79e0] transition-colors disabled:opacity-50"
                >
                    {submitting ? "Saving…" : "Save Changes"}
                </button>
            </div>

        </div>
    );
}
