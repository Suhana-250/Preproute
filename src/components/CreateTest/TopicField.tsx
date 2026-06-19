import MultiSelect from "./MultiSelect";
import type { Option } from "../../interfaces/option.interface";

interface TopicFieldProps {
    topics: Option[];
    selectedTopics: string[];
    onTopicsChange: (ids: string[]) => void;
    disabled: boolean;
    error?: string;
}

export default function TopicField({ topics, selectedTopics, onTopicsChange, disabled, error }: TopicFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Topic</label>
            <MultiSelect
                options={topics}
                selected={selectedTopics}
                onChange={onTopicsChange}
                disabled={disabled}
                placeholder="Choose from Drop-down"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
