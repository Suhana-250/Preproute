interface NameFieldProps {
    value: string;
    onChange: (v: string) => void;
    error?: string;
}

export default function NameField({ value, onChange, error }: NameFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Name of Test</label>
            <input
                type="text"
                value={value}
                placeholder="Enter name of Test"
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[6px] text-sm outline-none focus:border-[#5988EF] placeholder-[#9CA3AF]"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
