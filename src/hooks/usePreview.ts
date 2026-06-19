import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestById, updateTest, fetchQuestionsBulk } from "../api";
import type { TestDetail, QuestionResponse } from "../interfaces";

export function usePreview() {
    const { testId } = useParams<{ testId: string }>();
    const navigate   = useNavigate();

    const [testDetail,  setTestDetail]  = useState<TestDetail | null>(null);
    const [questions,   setQuestions]   = useState<QuestionResponse[]>([]);
    const [loading,     setLoading]     = useState(true);
    const [publishing,  setPublishing]  = useState(false);
    const [published,   setPublished]   = useState(false);
    const [error,       setError]       = useState("");

    useEffect(() => {
        if (!testId) return;
        const load = async () => {
            setLoading(true);
            try {
                const testRes = await getTestById(testId);
                const test    = testRes.data.data;
                setTestDetail(test);

                if (Array.isArray(test.questions) && test.questions.length > 0) {
                    try {
                        const qRes = await fetchQuestionsBulk(test.questions);
                        setQuestions(qRes.data.data ?? []);
                    } catch {
                        setQuestions([]); // questions may not exist yet — not a fatal error
                    }
                }
            } catch (err) {
                console.error("Preview load error:", err);
                setError("Failed to load test data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [testId]);

    const handlePublish = async (expiresAt?: string) => {
        if (!testId) return;
        setPublishing(true);
        setError("");
        try {
            await updateTest(testId, { 
                status: "live",
                ...(expiresAt && { expires_at: expiresAt })
            });
            setPublished(true);
            setTimeout(() => navigate("/dashboard"), 2500);
        } catch (err) {
            console.error("Publish error:", err);
            setError("Failed to publish. Please try again.");
        } finally {
            setPublishing(false);
        }
    };

    return {
        testDetail, questions, loading,
        publishing, published, error,
        testId, handlePublish, navigate,
    };
}
