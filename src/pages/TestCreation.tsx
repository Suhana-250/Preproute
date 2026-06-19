import { useNavigate } from "react-router-dom";

export default function TestCreation() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center px-6">

            {/* Hero card */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-10 max-w-lg w-full text-center shadow-sm">

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-[#EEF3FF] flex items-center justify-center mx-auto mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5988EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9"  y1="15" x2="15" y2="15" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-[#111827] mb-2">
                    Ready to Create a Test?
                </h1>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
                    Build a structured test with questions, marking scheme, and difficulty levels.
                    Takes only a few minutes.
                </p>

                {/* Steps preview */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    {["Test Details", "Add Questions", "Preview & Publish"].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <span className="w-6 h-6 rounded-full bg-[#EEF3FF] text-[#5988EF] text-xs font-semibold flex items-center justify-center">
                                    {i + 1}
                                </span>
                                <span className="text-[11px] text-[#6B7280] whitespace-nowrap">{step}</span>
                            </div>
                            {i < 2 && <span className="text-[#D1D5DB] text-lg mb-4">→</span>}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate("/tests/create")}
                    className="w-full py-3 bg-[#5988EF] text-white text-sm font-semibold rounded-[8px] hover:bg-[#4a79e0] transition-colors shadow-sm"
                >
                    + Create New Test
                </button>
            </div>
        </div>
    );
}