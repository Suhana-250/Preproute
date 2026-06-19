import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSubjects, getTopicsBySubject, getSubTopicsByTopics, getTestById, updateTest } from "../api";
import { emptyQuestion } from "../interfaces";
import type { Option, FormErrors } from "../interfaces";
import type { TestType, Difficulty } from "../types/test.types";

// ── Error extraction ─────────────────────────────────────────────────────────
function extractApiError(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const d = err.response?.data;
        console.log("[API] Full error response:", JSON.stringify(d, null, 2));
        if (Array.isArray(d?.errors) && d.errors.length > 0)
            return (d.errors as { msg: string; path: string }[]).map((e) => `${e.path}: ${e.msg}`).join(" | ");
        if (Array.isArray(d?.message))      return (d.message as string[]).join(" | ");
        if (typeof d?.message === "string") return d.message;
        if (typeof d?.error   === "string") return d.error;
        return `Server error ${err.response?.status ?? ""}`.trim();
    }
    return "Network error — please check your connection.";
}

// suppress unused import
void emptyQuestion;

export function useEditTest() {
    const { testId } = useParams<{ testId: string }>();
    const navigate   = useNavigate();

    // ── Dropdown data ─────────────────────────────────────────────────────────
    const [subjects,  setSubjects]  = useState<Option[]>([]);
    const [topics,    setTopics]    = useState<Option[]>([]);
    const [subTopics, setSubTopics] = useState<Option[]>([]);

    // ── Selections ────────────────────────────────────────────────────────────
    const [testType,           setTestType]           = useState<TestType>("chapterwise");
    const [selectedSubject,    setSelectedSubject]    = useState<string[]>([]);
    const [selectedTopics,     setSelectedTopics]     = useState<string[]>([]);
    const [selectedSubTopics,  setSelectedSubTopics]  = useState<string[]>([]);

    // ── Form values ───────────────────────────────────────────────────────────
    const [name,           setName]           = useState("");
    const [difficulty,     setDifficulty]     = useState<Difficulty>("easy");
    const [totalTime,      setTotalTime]      = useState(0);
    const [correctMarks,   setCorrectMarks]   = useState(5);
    const [wrongMarks,     setWrongMarks]     = useState(-1);
    const [unattemptMarks, setUnattemptMarks] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const totalMarks = totalQuestions * correctMarks;

    // ── UI state ──────────────────────────────────────────────────────────────
    const [loading,    setLoading]    = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errors,     setErrors]     = useState<FormErrors>({});

    // ── Load subjects on mount ────────────────────────────────────────────────
    useEffect(() => {
        getSubjects().then((r) => setSubjects(r.data.data)).catch(console.error);
    }, []);

    // ── Load test data and pre-populate ──────────────────────────────────────
    useEffect(() => {
        if (!testId || subjects.length === 0) return;
        setLoading(true);
        getTestById(testId)
            .then(async (r) => {
                const test = r.data.data;
                setName(test.name);
                setTestType(test.type as TestType);
                setDifficulty(test.difficulty as Difficulty);
                setTotalTime(test.total_time);
                setCorrectMarks(test.correct_marks);
                setWrongMarks(test.wrong_marks);
                setUnattemptMarks(test.unattempt_marks);
                setTotalQuestions(test.total_questions);

                // Try to find the subject UUID by matching name
                const matchedSubject = subjects.find(
                    (s) => s.name.toLowerCase() === test.subject?.toLowerCase() || s.id === test.subject,
                );
                if (matchedSubject) {
                    setSelectedSubject([matchedSubject.id]);
                    // Fetch topics for this subject
                    const topicRes = await getTopicsBySubject(matchedSubject.id);
                    const allTopics = topicRes.data.data;
                    setTopics(allTopics);

                    // Match stored topics (could be names or UUIDs)
                    const storedTopics: string[] = Array.isArray(test.topics) ? test.topics : [];
                    const matchedTopicIds = allTopics
                        .filter((t) => storedTopics.includes(t.id) || storedTopics.includes(t.name))
                        .map((t) => t.id);
                    setSelectedTopics(matchedTopicIds);

                    if (matchedTopicIds.length > 0) {
                        const stRes = await getSubTopicsByTopics(matchedTopicIds);
                        const allSub = stRes.data.data;
                        setSubTopics(allSub);
                        const storedSub: string[] = Array.isArray(test.sub_topics) ? test.sub_topics : [];
                        const matchedSubIds = allSub
                            .filter((s) => storedSub.includes(s.id) || storedSub.includes(s.name))
                            .map((s) => s.id);
                        setSelectedSubTopics(matchedSubIds);
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [testId, subjects]);

    // ── Re-fetch topics when subject changes ──────────────────────────────────
    useEffect(() => {
        if (selectedSubject.length === 0) { setTopics([]); setSelectedTopics([]); return; }
        getTopicsBySubject(selectedSubject[0])
            .then((r) => { setTopics(r.data.data); })
            .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSubject]);

    // ── Re-fetch sub-topics when topics change ────────────────────────────────
    useEffect(() => {
        if (selectedTopics.length === 0) { setSubTopics([]); setSelectedSubTopics([]); return; }
        getSubTopicsByTopics(selectedTopics)
            .then((r) => setSubTopics(r.data.data))
            .catch(console.error);
    }, [selectedTopics]);

    // ── Validation ────────────────────────────────────────────────────────────
    const validate = (): FormErrors => {
        const e: FormErrors = {};
        if (!name.trim())                  e.name           = "Test name is required";
        if (selectedSubject.length === 0)  e.subject        = "Select a subject";
        if (selectedTopics.length === 0)   e.topics         = "Select at least one topic";
        if (totalTime <= 0)                e.totalTime      = "Enter duration";
        if (totalQuestions <= 0)           e.totalQuestions = "Enter number of questions";
        return e;
    };

    // ── Submit update ─────────────────────────────────────────────────────────
    const handleUpdate = async () => {
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        setErrors({});
        try {
            await updateTest(testId!, {
                name,
                type:            testType,
                subject:         selectedSubject[0],
                topics:          selectedTopics,
                sub_topics:      selectedSubTopics,
                correct_marks:   correctMarks,
                wrong_marks:     wrongMarks,
                unattempt_marks: unattemptMarks,
                difficulty,
                total_time:      totalTime,
                total_marks:     totalMarks,
                total_questions: totalQuestions,
            });
            navigate(`/tests/${testId}/preview`);
        } catch (err) {
            console.error("Update test error:", err);
            setErrors({ api: extractApiError(err) });
        } finally {
            setSubmitting(false);
        }
    };

    return {
        testId, loading,
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
    };
}
