import { useNavigate } from "react-router-dom";
import { useCreateTest } from "../hooks/useCreateTest";

// Layout components
import TestBreadcrumb      from "../components/CreateTest/TestBreadcrumb";
import TestTabsBar         from "../components/CreateTest/TestTabsBar";
import ErrorBanner         from "../components/CreateTest/ErrorBanner";
import FormActions         from "../components/CreateTest/FormActions";

// Form field components
import SubjectField        from "../components/CreateTest/SubjectField";
import NameField           from "../components/CreateTest/NameField";
import TopicField          from "../components/CreateTest/TopicField";
import SubTopicField       from "../components/CreateTest/SubTopicField";
import DurationField       from "../components/CreateTest/DurationField";
import DifficultyField     from "../components/CreateTest/DifficultyField";
import MarkingSchemeField  from "../components/CreateTest/MarkingSchemeField";
import QuestionsMarksField from "../components/CreateTest/QuestionsMarksField";

import { TEST_TABS } from "../types/test.types";

export default function CreateTest() {
    const navigate = useNavigate();

    const {
        testType, setTestType,
        subjects, topics, subTopics,
        selectedSubject, setSelectedSubject,
        selectedTopics, setSelectedTopics,
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
        handleNext, handleDraft,
    } = useCreateTest();

    const tabLabel = TEST_TABS.find((t) => t.value === testType)?.label ?? "";

    return (
        <div className="min-h-screen bg-white">

            <TestBreadcrumb tabLabel={tabLabel} />
            <TestTabsBar testType={testType} onTabChange={setTestType} />
            <ErrorBanner message={errors.api} />

            {/* 2-column form grid */}
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

            <FormActions
                submitting={submitting}
                onCancel={() => navigate("/tests")}
                onDraft={handleDraft}
                onNext={handleNext}
            />

        </div>
    );
}