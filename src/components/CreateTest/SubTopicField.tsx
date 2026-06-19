import MultiSelect from "./MultiSelect";
import type { Option } from "../../interfaces/option.interface";

interface SubTopicFieldProps {
    subTopics: Option[];
    selectedSubTopics: string[];
    onSubTopicsChange: (ids: string[]) => void;
    disabled: boolean;
}

export default function SubTopicField({ subTopics, selectedSubTopics, onSubTopicsChange, disabled }: SubTopicFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Sub Topic</label>
            <MultiSelect
                options={subTopics}
                selected={selectedSubTopics}
                onChange={onSubTopicsChange}
                disabled={disabled}
                placeholder="Choose from Drop-down"
            />
        </div>
    );
}
