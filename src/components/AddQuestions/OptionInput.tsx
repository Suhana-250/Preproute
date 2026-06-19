

interface OptionInputProps {
    label: string;         // declared for compatibility, but omitted from display to match Figma exactly
    optionKey: "option1" | "option2" | "option3" | "option4";
    value: string;
    isCorrect: boolean;
    error?: string;
    onChange: (value: string) => void;
    onSelect: () => void;  // marks this as the correct answer
}

export default function OptionInput({ optionKey, value, isCorrect, error, onChange, onSelect }: OptionInputProps) {
    void optionKey;
    return (
        <div className={`border rounded-lg p-3 bg-white flex items-center gap-3 transition-all hover:border-gray-300 focus-within:border-indigo-500
            ${isCorrect ? "border-indigo-400 bg-indigo-50/5" : "border-gray-200"}
            ${error ? "border-red-300 bg-red-50/10" : ""}`}
        >
            {/* Radio selector on the left */}
            <button
                type="button"
                onClick={onSelect}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer
                    ${isCorrect
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-gray-300 hover:border-indigo-600"}`}
                title="Set as correct answer"
            >
                {isCorrect && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>

            {/* Option Input box */}
            <input
                type="text"
                value={value}
                placeholder="Type Option here"
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-300 text-gray-700"
            />
            
            {/* Trash icon to clear text */}
            <button
                type="button"
                onClick={() => onChange("")}
                className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                title="Clear option text"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
}
