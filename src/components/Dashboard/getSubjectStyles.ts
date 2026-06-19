export interface SubjectStyle {
    bar: string;
    pill: string;
    dot: string;
}

const SUBJECT_THEMES: Record<string, SubjectStyle> = {
    math: {
        bar: "bg-indigo-500",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-100",
        dot: "bg-indigo-500"
    },
    physic: {
        bar: "bg-rose-500",
        pill: "bg-rose-50 text-rose-700 border-rose-100",
        dot: "bg-rose-500"
    },
    chem: {
        bar: "bg-amber-500",
        pill: "bg-amber-50 text-amber-700 border-amber-100",
        dot: "bg-amber-500"
    },
    biolog: {
        bar: "bg-emerald-500",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
        dot: "bg-emerald-500"
    },
    english: {
        bar: "bg-cyan-500",
        pill: "bg-cyan-50 text-cyan-700 border-cyan-100",
        dot: "bg-cyan-500"
    },
    computer: {
        bar: "bg-violet-500",
        pill: "bg-violet-50 text-violet-700 border-violet-100",
        dot: "bg-violet-500"
    },
    history: {
        bar: "bg-orange-500",
        pill: "bg-orange-50 text-orange-700 border-orange-100",
        dot: "bg-orange-500"
    },
    geography: {
        bar: "bg-teal-500",
        pill: "bg-teal-50 text-teal-700 border-teal-100",
        dot: "bg-teal-500"
    }
};

const FALLBACK_PALETTES: SubjectStyle[] = [
    { bar: "bg-blue-500", pill: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500" },
    { bar: "bg-pink-500", pill: "bg-pink-50 text-pink-700 border-pink-100", dot: "bg-pink-500" },
    { bar: "bg-fuchsia-500", pill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100", dot: "bg-fuchsia-500" },
    { bar: "bg-purple-500", pill: "bg-purple-50 text-purple-700 border-purple-100", dot: "bg-purple-500" },
    { bar: "bg-lime-500", pill: "bg-lime-50 text-lime-700 border-lime-100", dot: "bg-lime-500" },
    { bar: "bg-sky-500", pill: "bg-sky-50 text-sky-700 border-sky-100", dot: "bg-sky-500" },
];

export const getSubjectStyles = (subject: string): SubjectStyle => {
    const s = (subject || "").toLowerCase().trim();
    
    // Check direct matches or sub-string matches
    for (const key of Object.keys(SUBJECT_THEMES)) {
        if (s.includes(key)) {
            return SUBJECT_THEMES[key];
        }
    }
    
    // Generate deterministic hash based on name length/chars
    if (!s) return FALLBACK_PALETTES[0];
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % FALLBACK_PALETTES.length;
    return FALLBACK_PALETTES[index];
};
