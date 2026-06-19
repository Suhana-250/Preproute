interface SpinnerInputProps {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
}

export default function SpinnerInput({ label, value, onChange, min, max }: SpinnerInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280]">{label}</label>
            <div className="flex items-center border border-[#D1D5DB] rounded-[6px] overflow-hidden w-[90px]">
                <input
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="flex-1 px-2 py-2 text-sm text-center outline-none w-[60px]"
                />
                <div className="flex flex-col border-l border-[#D1D5DB]">
                    <button
                        type="button"
                        onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
                        className="px-1 py-0.5 hover:bg-[#F3F4F6] text-xs leading-none"
                    >
                        ▲
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange(min !== undefined ? Math.max(min, value - 1) : value - 1)}
                        className="px-1 py-0.5 hover:bg-[#F3F4F6] text-xs leading-none border-t border-[#D1D5DB]"
                    >
                        ▼
                    </button>
                </div>
            </div>
        </div>
    );
}
