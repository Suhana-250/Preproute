import { useState, useEffect, useRef } from "react";
import type { Option } from "../../interfaces/option.interface";

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (ids: string[]) => void;
    disabled?: boolean;
    placeholder?: string;
}

export default function MultiSelect({
    options,
    selected,
    onChange,
    disabled = false,
    placeholder = "Choose from Drop-down",
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = (id: string) => {
        onChange(
            selected.includes(id)
                ? selected.filter((s) => s !== id)
                : [...selected, id],
        );
    };

    const displayText =
        selected.length === 0
            ? placeholder
            : options
                  .filter((o) => selected.includes(o.id))
                  .map((o) => o.name)
                  .join(", ");

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => !disabled && setOpen((o) => !o)}
                disabled={disabled}
                className={`w-full flex items-center justify-between px-3 py-2 border border-[#D1D5DB] rounded-[6px] text-sm text-left transition-colors
                    ${disabled ? "bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed" : "bg-white hover:border-[#5988EF] cursor-pointer"}
                    ${selected.length > 0 ? "text-[#111827]" : "text-[#9CA3AF]"}`}
            >
                <span className="truncate">{displayText}</span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[6px] shadow-lg max-h-52 overflow-y-auto">
                    {options.length === 0 ? (
                        <p className="px-3 py-2 text-sm text-[#9CA3AF]">No options available</p>
                    ) : (
                        options.map((opt) => (
                            <label
                                key={opt.id}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#F3F4F6] cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(opt.id)}
                                    onChange={() => toggle(opt.id)}
                                    className="accent-[#5988EF]"
                                />
                                <span className="text-sm text-[#374151]">{opt.name}</span>
                            </label>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
