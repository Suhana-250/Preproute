interface TestBreadcrumbProps {
    tabLabel: string;
}

export default function TestBreadcrumb({ tabLabel }: TestBreadcrumbProps) {
    return (
        <div className="px-6 pt-4 pb-2 text-sm text-[#6B7280] flex items-center gap-1">
            <span>Test Creation</span>
            <span>/</span>
            <span>Create Test</span>
            <span>/</span>
            <span className="text-[#111827] font-medium">{tabLabel}</span>
        </div>
    );
}
