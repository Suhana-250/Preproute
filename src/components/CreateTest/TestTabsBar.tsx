import { TEST_TABS } from "../../types/test.types";
import type { TestType } from "../../types/test.types";

interface TestTabsBarProps {
    testType: TestType;
    onTabChange: (value: TestType) => void;
}

export default function TestTabsBar({ testType, onTabChange }: TestTabsBarProps) {
    return (
        <div className="px-6 flex gap-1 border-b border-[#E5E7EB] mb-6">
            {TEST_TABS.map((tab) => (
                <button
                    key={tab.value}
                    type="button"
                    onClick={() => onTabChange(tab.value)}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-[4px]
                        ${testType === tab.value
                            ? "text-[#5988EF] border-b-2 border-[#5988EF]"
                            : "text-[#6B7280] hover:text-[#374151]"}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
