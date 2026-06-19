import type { Difficulty } from "../../types/test.types";

interface DifficultyFieldProps {
    value: Difficulty;
    onChange: (d: Difficulty) => void;
}

const DIFFICULTY_OPTIONS: Difficulty[] = ["easy", "medium", "hard"];

export default function DifficultyField({ value, onChange }: DifficultyFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Test Difficulty Level</label>
            <div className="flex items-center gap-6">
                {DIFFICULTY_OPTIONS.map((d) => (
                    <label key={d} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                            type="radio"
                            name="difficulty"
                            value={d}
                            checked={value === d}
                            onChange={() => onChange(d)}
                            className="accent-[#5988EF]"
                        />
                        <span className="text-sm text-[#374151] capitalize">{d}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
