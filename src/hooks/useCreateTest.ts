import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSubjects, getTopicsBySubject, getSubTopicsByTopics, createTest } from "../api";
import type { CreateTestPayload, Option, FormErrors } from "../interfaces";
import type { TestType, Difficulty } from "../types/test.types";

// Extracts a human-readable message from an Axios error response
function extractApiError(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const d = err.response?.data;
        // Always log the full response so we can debug in the console
        console.log("[API] Full error response:", JSON.stringify(d, null, 2));
        // Backend returns: { errors: [{ msg, path }] }
        if (Array.isArray(d?.errors) && d.errors.length > 0) {
            return (d.errors as { msg: string; path: string }[])
                .map((e) => `${e.path}: ${e.msg}`)
                .join(" | ");
        }
        // NestJS class-validator returns message as string[] on validation failure
        if (Array.isArray(d?.message))      return (d.message as string[]).join(" | ");
        if (typeof d?.message === "string") return d.message;
        if (typeof d?.error   === "string") return d.error;
        return `Server error ${err.response?.status ?? ""}`.trim();
    }
    return "Network error — please check your connection.";
}

export function useCreateTest() {
    const navigate = useNavigate();

    // ── Tab ─────────────────────────────────────────────────────────────
    const [testType, setTestType] = useState<TestType>("chapterwise");

    // ── Dropdown data ────────────────────────────────────────────────────
    const [subjects,  setSubjects]  = useState<Option[]>([]);
    const [topics,    setTopics]    = useState<Option[]>([]);
    const [subTopics, setSubTopics] = useState<Option[]>([]);

    // ── Selected IDs ─────────────────────────────────────────────────────
    const [selectedSubject,   setSelectedSubject]   = useState<string[]>([]);
    const [selectedTopics,    setSelectedTopics]    = useState<string[]>([]);
    const [selectedSubTopics, setSelectedSubTopics] = useState<string[]>([]);

    // ── Form values ───────────────────────────────────────────────────────
    const [name,           setName]           = useState("");
    const [difficulty,     setDifficulty]     = useState<Difficulty>("easy");
    const [totalTime,      setTotalTime]      = useState(0);
    const [correctMarks,   setCorrectMarks]   = useState(5);
    const [wrongMarks,     setWrongMarks]     = useState(-1);
    const [unattemptMarks, setUnattemptMarks] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    // ── Derived ──────────────────────────────────────────────────────────
    const totalMarks = totalQuestions * correctMarks;

    // ── UI state ─────────────────────────────────────────────────────────
    const [submitting, setSubmitting] = useState(false);
    const [errors,     setErrors]     = useState<FormErrors>({});

    // ── Fetch subjects on mount ──────────────────────────────────────────
    useEffect(() => {
        getSubjects()
            .then((r) => setSubjects(r.data.data))
            .catch(console.error);
    }, []);

    // ── Fetch topics whenever subject changes ────────────────────────────
    useEffect(() => {
        if (selectedSubject.length === 0) {
            setTopics([]);
            setSelectedTopics([]);
            setSubTopics([]);
            setSelectedSubTopics([]);
            return;
        }
        getTopicsBySubject(selectedSubject[0])
            .then((r) => {
                setTopics(r.data.data);
                setSelectedTopics([]);
                setSubTopics([]);
                setSelectedSubTopics([]);
            })
            .catch(console.error);
    }, [selectedSubject]);

    // ── Fetch sub-topics whenever selected topics change ─────────────────
    useEffect(() => {
        if (selectedTopics.length === 0) {
            setSubTopics([]);
            setSelectedSubTopics([]);
            return;
        }
        getSubTopicsByTopics(selectedTopics)
            .then((r) => {
                setSubTopics(r.data.data);
                setSelectedSubTopics([]);
            })
            .catch(console.error);
    }, [selectedTopics]);

    // ── Validation ────────────────────────────────────────────────────────
    const validate = (): FormErrors => {
        const e: FormErrors = {};
        if (!name.trim())                  e.name           = "Test name is required";
        if (selectedSubject.length === 0)  e.subject        = "Select a subject";
        if (selectedTopics.length === 0)   e.topics         = "Select at least one topic";
        if (totalTime <= 0)                e.totalTime      = "Enter duration";
        if (totalQuestions <= 0)           e.totalQuestions = "Enter number of questions";
        return e;
    };

    // ── Build payload ──────────────────────────────────────────────────────────
    const buildPayload = (status: "draft" | "live" = "draft"): CreateTestPayload => ({
        name:            name.trim(),
        type:            testType,
        subject:         selectedSubject[0] ?? "",
        topics:          selectedTopics,
        sub_topics:      selectedSubTopics,
        correct_marks:   correctMarks,
        wrong_marks:     wrongMarks,
        unattempt_marks: unattemptMarks,
        difficulty,
        total_time:      totalTime,
        total_marks:     totalMarks,
        total_questions: totalQuestions,
        status,
    });

    // ── Handlers ──────────────────────────────────────────────────────────
    const handleNext = async () => {
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        setErrors({});
        try {
            const response = await createTest(buildPayload("draft"));
            const testId: string = response.data.data.id;
            navigate(`/tests/${testId}/questions`);
        } catch (err) {
            console.error("Create test error:", err);
            setErrors({ api: extractApiError(err) });
        } finally {
            setSubmitting(false);
        }
    };

    // Draft uses the same validation as Next because the API has a single
    // POST /tests endpoint that requires all fields to be valid.
    const handleDraft = async () => {
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        setErrors({});
        try {
            await createTest(buildPayload());
            navigate("/dashboard");
        } catch (err) {
            console.error("Draft save error:", err);
            setErrors({ api: extractApiError(err) });
        } finally {
            setSubmitting(false);
        }
    };

    return {
        // Tab
        testType, setTestType,
        // Dropdown data
        subjects, topics, subTopics,
        // Selections
        selectedSubject,   setSelectedSubject,
        selectedTopics,    setSelectedTopics,
        selectedSubTopics, setSelectedSubTopics,
        // Form values
        name, setName,
        difficulty, setDifficulty,
        totalTime, setTotalTime,
        correctMarks, setCorrectMarks,
        wrongMarks, setWrongMarks,
        unattemptMarks, setUnattemptMarks,
        totalQuestions, setTotalQuestions,
        // Derived
        totalMarks,
        // UI state
        submitting, errors,
        // Handlers
        handleNext, handleDraft,
    };
}
