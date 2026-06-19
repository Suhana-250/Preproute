import MultiSelect from "./MultiSelect";
import type { Option } from "../../interfaces/option.interface";

interface SubjectFieldProps {
    subjects: Option[];
    selectedSubject: string[];
    onSubjectChange: (ids: string[]) => void;
    error?: string;
}

export default function SubjectField({ subjects, selectedSubject, onSubjectChange, error }: SubjectFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Subject</label>
            <MultiSelect
                options={subjects}
                selected={selectedSubject}
                onChange={(ids) => onSubjectChange(ids.slice(-1))} // single select
                placeholder="Choose from Drop-down"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
