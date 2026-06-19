interface DurationFieldProps {
    value: number;
    onChange: (v: number) => void;
    error?: string;
}

export default function DurationField({ value, onChange, error }: DurationFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Duration (Minutes)</label>
            <input
                type="number"
                value={value || ""}
                placeholder="Enter the time"
                min={1}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[6px] text-sm outline-none focus:border-[#5988EF] placeholder-[#9CA3AF]"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
