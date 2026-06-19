import SpinnerInput from "./SpinnerInput";

interface MarkingSchemeFieldProps {
    wrongMarks: number;
    unattemptMarks: number;
    correctMarks: number;
    onWrongChange: (v: number) => void;
    onUnattemptChange: (v: number) => void;
    onCorrectChange: (v: number) => void;
}

export default function MarkingSchemeField({
    wrongMarks,
    unattemptMarks,
    correctMarks,
    onWrongChange,
    onUnattemptChange,
    onCorrectChange,
}: MarkingSchemeFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Marking Scheme:</label>
            <div className="flex items-start gap-4">
                <SpinnerInput label="Wrong Answer"   value={wrongMarks}     onChange={onWrongChange}     max={0} />
                <SpinnerInput label="Unattempted"    value={unattemptMarks} onChange={onUnattemptChange} max={0} />
                <SpinnerInput label="Correct Answer" value={correctMarks}   onChange={(v) => onCorrectChange(Math.max(0, v))} min={0} />
            </div>
        </div>
    );
}
