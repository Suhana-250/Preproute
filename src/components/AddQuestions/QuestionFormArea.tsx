import { useState } from "react";
import type { QuestionFormData, TestDetail } from "../../interfaces";
import OptionInput from "./OptionInput";
import RichTextEditor from "./RichTextEditor";

interface QuestionFormAreaProps {
    question: QuestionFormData;
    questionNumber: number;
    totalQuestions: number;
    testDetail: TestDetail | null;
    errors: Record<string, string>;
    submitting: boolean;
    onUpdate: (field: keyof QuestionFormData, value: string) => void;
    onAddAnother: () => void;
    onSave: () => void;
    onNavigate: (direction: "prev" | "next") => void;
    onExit: () => void;
}

const OPTION_KEYS = ["option1", "option2", "option3", "option4"] as const;
const OPTION_LABELS = ["A", "B", "C", "D"];
const DIFFICULTY_OPTIONS = ["", "easy", "medium", "hard"] as const;

export default function QuestionFormArea({
    question, questionNumber, totalQuestions, testDetail,
    errors, submitting,
    onUpdate, onSave, onExit
}: QuestionFormAreaProps) {
    const topics = testDetail?.topics ?? [];
    const subTopics = testDetail?.sub_topics ?? [];

    // Local states for UI options (Figma spec) as backend doesn't store them on questions
    const [localTopic, setLocalTopic] = useState("");
    const [localSubTopic, setLocalSubTopic] = useState("");

    const handleClearAll = () => {
        onUpdate("question", "");
        onUpdate("option1", "");
        onUpdate("option2", "");
        onUpdate("option3", "");
        onUpdate("option4", "");
        onUpdate("explanation", "");
    };

    return (
        <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
                <span className="text-base font-bold text-gray-900">
                    Question {questionNumber}/<span className="text-orange-400">{totalQuestions}</span>
                </span>

                <div className="flex items-center gap-2">
                    <button type="button" className="border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md bg-white hover:bg-gray-50 flex items-center gap-1 shrink-0 font-medium">
                        <span className="text-[10px]">+</span> MCQ
                    </button>
                    <button type="button" className="border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md bg-white hover:bg-gray-50 flex items-center gap-1 shrink-0 font-medium">
                        <span className="text-[10px]">+</span> CSV
                    </button>
                </div>
            </div>

            {/* Delete All Edits (placed below header, aligned left, in red) */}
            <div className="px-5 pt-4">
                <button
                    type="button"
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors cursor-pointer"
                >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete All Edits
                </button>
            </div>

            {/* Scrollable form body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                {/* API-level error banner */}
                {errors.api && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                        {errors.api}
                    </div>
                )}

                {/* Rich Editor panel */}
                <RichTextEditor 
                    value={question.question}
                    onChange={(val) => onUpdate("question", val)}
                    hasError={!!errors.question}
                />
                {errors.question && <p className="text-xs text-red-500 mt-1">{errors.question}</p>}

                {/* Options Section */}
                <div className="space-y-3.5">
                    <label className="block text-sm font-bold text-gray-900 mb-1">
                        Type the options below
                    </label>
                    
                    <div className="space-y-3">
                        {OPTION_KEYS.map((key, i) => (
                            <OptionInput
                                key={key}
                                label={OPTION_LABELS[i]}
                                optionKey={key}
                                value={question[key]}
                                isCorrect={question.correct_option === key}
                                error={errors[key]}
                                onChange={(v) => onUpdate(key, v)}
                                onSelect={() => onUpdate("correct_option", key)}
                            />
                        ))}
                    </div>
                    {(errors.option1 || errors.option2 || errors.option3 || errors.option4) && (
                        <p className="text-xs text-red-500 mt-2">All 4 options are required</p>
                    )}
                </div>

                {/* Explanation / Solution Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-900 mb-1.5">
                        Add Solution
                    </label>
                    <div className="relative border border-gray-200 rounded-lg focus-within:border-indigo-500 transition-all overflow-hidden">
                        <textarea
                            value={question.explanation}
                            placeholder="Type here"
                            rows={3}
                            onChange={(e) => onUpdate("explanation", e.target.value)}
                            className="w-full pl-3 pr-10 py-3 text-sm outline-none resize-none text-gray-700 bg-white placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => onUpdate("explanation", "")}
                            className="absolute right-3.5 bottom-3.5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                            title="Clear solution"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Prev / Next navigation arrows */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <button
                        type="button"
                        onClick={() => {}}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-300 bg-white transition-colors cursor-pointer"
                        title="Previous question"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => {}}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-300 bg-white transition-colors cursor-pointer"
                        title="Next question"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Question Settings (Stacked Vertically) */}
                <div className="border-t border-gray-200 pt-5 space-y-4">
                    <p className="text-sm font-bold text-gray-900 mb-2">Question settings</p>

                    {/* Level of Difficulty select */}
                    <div className="relative w-full">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Level of Difficulty</label>
                        <div className="relative">
                            <select
                                value={question.difficulty}
                                onChange={(e) => onUpdate("difficulty", e.target.value)}
                                className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500 text-gray-700 bg-white appearance-none cursor-pointer"
                            >
                                <option value="">Select from Drop-down</option>
                                {DIFFICULTY_OPTIONS.filter(Boolean).map((d) => (
                                    <option key={d} value={d}>
                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Topic select */}
                    <div className="relative w-full">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Topic</label>
                        <div className="relative">
                            <select
                                value={localTopic}
                                onChange={(e) => setLocalTopic(e.target.value)}
                                className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500 text-gray-700 bg-white appearance-none cursor-pointer"
                            >
                                <option value="">Select from Drop-down</option>
                                {topics.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Sub Topic select */}
                    <div className="relative w-full">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Sub-topic</label>
                        <div className="relative">
                            <select
                                value={localSubTopic}
                                onChange={(e) => setLocalSubTopic(e.target.value)}
                                className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500 text-gray-700 bg-white appearance-none cursor-pointer"
                            >
                                <option value="">Select from Drop-down</option>
                                {subTopics.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-gray-50">
                <button
                    type="button"
                    onClick={onExit}
                    className="px-5 py-2.5 rounded-md bg-[#EF4444] hover:bg-red-500 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                    Exit Test Creation
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    disabled={submitting}
                    className="px-8 py-2.5 rounded-md bg-[#5988EF] hover:bg-[#4a79e0] text-white text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? "Saving..." : "Next"}
                </button>
            </div>
        </div>
    );
}
