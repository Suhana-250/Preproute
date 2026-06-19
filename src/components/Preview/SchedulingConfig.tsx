export type LiveUntilOption = "always" | "1week" | "2weeks" | "3weeks" | "1month" | "custom";

interface SchedulingConfigProps {
    publishType: "now" | "schedule";
    setPublishType: (type: "now" | "schedule") => void;
    liveUntil: LiveUntilOption;
    setLiveUntil: (val: LiveUntilOption) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    endTime: string;
    setEndTime: (time: string) => void;
}

export default function SchedulingConfig({
    publishType,
    setPublishType,
    liveUntil,
    setLiveUntil,
    endDate,
    setEndDate,
    endTime,
    setEndTime,
}: SchedulingConfigProps) {
    const options: { value: LiveUntilOption; label: string }[] = [
        { value: "always", label: "Always Available" },
        { value: "3weeks", label: "3 Weeks" },
        { value: "1week",  label: "1 Week" },
        { value: "1month", label: "1 Month" },
        { value: "2weeks", label: "2 Weeks" },
        { value: "custom", label: "Custom Duration" },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mb-4">
            {/* Tab Switcher — underline style */}
            <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
                <button
                    type="button"
                    onClick={() => setPublishType("now")}
                    className={`pb-2.5 text-sm font-semibold border-b-2 transition-all cursor-pointer -mb-px ${
                        publishType === "now"
                            ? "border-gray-900 text-gray-900"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Publish Now
                </button>
                <button
                    type="button"
                    onClick={() => setPublishType("schedule")}
                    className={`pb-2.5 text-sm font-semibold border-b-2 transition-all cursor-pointer -mb-px ${
                        publishType === "schedule"
                            ? "border-gray-900 text-gray-900"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Schedule Publish
                </button>
            </div>

            {/* Live Until Title */}
            <h3 className="text-base font-bold text-gray-800 mb-1">Live Until</h3>
            <p className="text-xs text-gray-500 mb-5">Choose how long this test should remain available on the platform.</p>

            {/* Radio Options Grid — no border boxes, just radio + label */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mb-5">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="liveUntil"
                            value={opt.value}
                            checked={liveUntil === opt.value}
                            onChange={() => setLiveUntil(opt.value)}
                            className="w-4 h-4 accent-[#5988EF] cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                ))}
            </div>

            {/* Custom Duration — styled text inputs with icons */}
            {liveUntil === "custom" && (
                <div className="grid grid-cols-2 gap-4 max-w-2xl mt-2">
                    {/* End Date */}
                    <div className="relative">
                        <input
                            type={endDate ? "date" : "text"}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                            onClick={(e) => {
                                try { e.currentTarget.showPicker(); } catch { /* ignore fallback */ }
                            }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 placeholder-gray-400 outline-none focus:border-[#5988EF] focus:ring-1 focus:ring-[#5988EF]/20 transition-all bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                            placeholder="Select End Date"
                        />
                        {/* Custom Calendar Icon - always visible */}
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="relative">
                        <input
                            type={endTime ? "time" : "text"}
                            onFocus={(e) => (e.target.type = "time")}
                            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                            onClick={(e) => {
                                try { e.currentTarget.showPicker(); } catch { /* ignore fallback */ }
                            }}
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 placeholder-gray-400 outline-none focus:border-[#5988EF] focus:ring-1 focus:ring-[#5988EF]/20 transition-all bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                            placeholder="Select End Time"
                        />
                        {/* Custom Clock/Chevron Icon - always visible */}
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
