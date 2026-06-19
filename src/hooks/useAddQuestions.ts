import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTestById, updateTest, createQuestionsBulk, fetchQuestionsBulk } from "../api";
import { emptyQuestion } from "../interfaces";
import type { QuestionFormData, QuestionPayload, TestDetail } from "../interfaces";
import type { Difficulty } from "../types/test.types";

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

// ── Question validation ───────────────────────────────────────────────────────
function validateQuestion(q: QuestionFormData): Record<string, string> {
    const e: Record<string, string> = {};
    if (!q.question.trim()) e.question = "Question text is required";
    if (!q.option1.trim())  e.option1  = "Option 1 is required";
    if (!q.option2.trim())  e.option2  = "Option 2 is required";
    if (!q.option3.trim())  e.option3  = "Option 3 is required";
    if (!q.option4.trim())  e.option4  = "Option 4 is required";
    return e;
}

// ── Convert form data → API payload ─────────────────────────────────────────
function toPayload(q: QuestionFormData, testId: string, subject: string): QuestionPayload {
    return {
        type:           "mcq",
        question:       q.question.trim(),
        option1:        q.option1.trim(),
        option2:        q.option2.trim(),
        option3:        q.option3.trim(),
        option4:        q.option4.trim(),
        correct_option: q.correct_option,
        test_id:        testId,
        subject:        subject,
        ...(q.explanation.trim() && { explanation: q.explanation.trim() }),
        ...(q.difficulty         && { difficulty: q.difficulty as Difficulty }),
        ...(q.media_url.trim()   && { media_url: q.media_url.trim() }),
    };
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useAddQuestions() {
    const { testId } = useParams<{ testId: string }>();
    const navigate   = useNavigate();

    // Test meta
    const [testDetail, setTestDetail] = useState<TestDetail | null>(null);

    // Local question list — submitted as a batch on save
    const [questions,    setQuestions]    = useState<QuestionFormData[]>([emptyQuestion()]);
    const [activeIndex,  setActiveIndex]  = useState(0);

    // UI state
    const [errors,     setErrors]     = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    // Fetch test detail and existing questions on mount
    useEffect(() => {
        if (!testId) return;
        const loadTestData = async () => {
            try {
                const testRes = await getTestById(testId);
                const testData = testRes.data.data;
                setTestDetail(testData);

                if (testData.questions && testData.questions.length > 0) {
                    const qRes = await fetchQuestionsBulk(testData.questions);
                    const qList = qRes.data.data;
                    
                    if (qList && qList.length > 0) {
                        const mappedQuestions = qList.map((q) => ({
                            question:       q.question || "",
                            option1:        q.option1 || "",
                            option2:        q.option2 || "",
                            option3:        q.option3 || "",
                            option4:        q.option4 || "",
                            correct_option: q.correct_option || "option1",
                            explanation:    q.explanation || "",
                            difficulty:     (q.difficulty || "") as Difficulty | "",
                            media_url:      q.media_url || "",
                        }));
                        setQuestions(mappedQuestions);
                    }
                }
            } catch (err) {
                console.error("Error loading test data:", err);
            }
        };
        loadTestData();
    }, [testId]);

    // ── Derived ──────────────────────────────────────────────────────────────
    const currentQuestion = questions[activeIndex];

    // ── Field updater ────────────────────────────────────────────────────────
    const updateField = (field: keyof QuestionFormData, value: string) => {
        setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
        setQuestions((prev) => {
            const next = [...prev];
            next[activeIndex] = { ...next[activeIndex], [field]: value };
            return next;
        });
    };

    // ── Navigation ──────────────────────────────────────────────────────────
    const selectQuestion = (index: number) => {
        setErrors({});
        setActiveIndex(index);
    };

    // ── Add another question ─────────────────────────────────────────────────
    const addQuestion = () => {
        const errs = validateQuestion(currentQuestion);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        const newIndex = questions.length;
        setQuestions((prev) => [...prev, emptyQuestion()]);
        setActiveIndex(newIndex);
    };

    // ── Delete a question ─────────────────────────────────────────────────────
    const deleteQuestion = (index: number) => {
        if (questions.length === 1) return; // must keep at least 1
        const next = questions.filter((_, i) => i !== index);
        setQuestions(next);
        setActiveIndex(Math.min(activeIndex, next.length - 1));
    };

    // ── Save & Continue ──────────────────────────────────────────────────────
    const handleSave = async () => {
        // Validate the currently active question first
        const errs = validateQuestion(currentQuestion);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        setErrors({});
        try {
            const subject = testDetail?.subject || "";
            const payload = questions.map((q) => toPayload(q, testId!, subject));
            const bulkRes = await createQuestionsBulk(payload);
            const questionIds = bulkRes.data.data.map((q) => q.id);

            // Link questions to the test
            await updateTest(testId!, {
                questions:       questionIds,
                total_questions: questionIds.length,
            });

            navigate(`/tests/${testId}/preview`);
        } catch (err) {
            console.error("Save questions error:", err);
            setErrors({ api: extractApiError(err) });
        } finally {
            setSubmitting(false);
        }
    };

    return {
        // Data
        testDetail, testId,
        questions, currentQuestion, activeIndex,
        // UI
        errors, submitting,
        // Handlers
        updateField, selectQuestion, addQuestion, deleteQuestion, handleSave,
        navigate,
    };
}
