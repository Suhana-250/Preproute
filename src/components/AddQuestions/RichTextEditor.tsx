import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { MathExtension } from '@aarkue/tiptap-math-extension';
import 'katex/dist/katex.min.css';
import { useRef } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
}

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    className?: string;
}

const ToolbarButton = ({ onClick, isActive, children, className = "" }: ToolbarButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-1.5 flex items-center justify-center rounded transition-colors cursor-pointer text-gray-600 hover:bg-gray-200 ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : ''} ${className}`}
    >
        {children}
    </button>
);

export default function RichTextEditor({ value, onChange, placeholder = "Type here", hasError }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false }),
            Image,
            MathExtension.configure({ evaluation: false }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[120px] p-4 text-gray-700 bg-white placeholder-gray-400',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const src = event.target?.result as string;
                editor.chain().focus().setImage({ src }).run();
            };
            reader.readAsDataURL(file);
        }
        // Reset input so the same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    return (
        <div className={`border rounded-lg overflow-hidden transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/10 ${hasError ? "border-red-400" : "border-gray-200"}`}>
            
            {/* Hidden File Input for Images */}
            <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
            />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white border-b border-gray-100 px-3 py-2">
                
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
                    <span className="font-serif italic text-[17px]">I</span>
                </ToolbarButton>
                
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
                    <span className="font-serif font-bold text-[15px]">B</span>
                </ToolbarButton>
                
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
                    <span className="font-serif underline text-[16px]">U</span>
                </ToolbarButton>
                
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
                    <span className="font-serif line-through text-[16px]">S</span>
                </ToolbarButton>

                {/* Vertical Divider */}
                <span className="w-px h-5 bg-gray-200 mx-1" />

                <ToolbarButton onClick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    } else if (url === '') {
                        editor.chain().focus().unsetLink().run();
                    }
                }} isActive={editor.isActive('link')}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </ToolbarButton>

                {/* Highlight Block (Square icon) */}
                <ToolbarButton onClick={() => {}}>
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="5" y="5" width="14" height="14" rx="2" />
                    </svg>
                </ToolbarButton>

                {/* Vertical Divider */}
                <span className="w-px h-5 bg-gray-200 mx-1" />

                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h14" /></svg>
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M4 18h16" /></svg>
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 12h10M4 18h16" /></svg>
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /><circle cx="2.5" cy="6" r="1.5" fill="currentColor" /><circle cx="2.5" cy="12" r="1.5" fill="currentColor" /><circle cx="2.5" cy="18" r="1.5" fill="currentColor" /></svg>
                </ToolbarButton>

                {/* Specialized Block */}
                <div className="flex items-center gap-1 ml-auto bg-gray-50 px-2 py-1 rounded-lg">
                    <ToolbarButton onClick={() => editor.chain().focus().insertContent('$$\n\n$$').run()} className="text-gray-700 hover:text-black">
                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M8 8v4" />
                            <path d="M6 10h4" />
                            <path d="M14 8h4" />
                            <path d="M14 12h4" />
                            <path d="M8 16l4-4" />
                            <path d="M8 12l4 4" />
                        </svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().insertContent('$x = y$').run()} className="text-gray-700 hover:text-black">
                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 9h14M5 15h14" />
                        </svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => fileInputRef.current?.click()} className="text-gray-700 hover:text-black">
                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                            <path d="M21 9v6" />
                        </svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().insertContent('$f(x)$').run()} className="text-gray-700 hover:text-black font-serif italic font-bold">
                        fx
                    </ToolbarButton>
                </div>
            </div>

            <EditorContent editor={editor} className="relative min-h-[120px]" />
            
            {/* Placeholder simulation if empty */}
            {editor.isEmpty && (
                <div className="absolute top-[68px] left-4 text-sm text-gray-400 pointer-events-none">
                    {placeholder}
                </div>
            )}
        </div>
    );
}
