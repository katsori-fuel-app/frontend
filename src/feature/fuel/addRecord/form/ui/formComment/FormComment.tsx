import { FC, useEffect, useRef } from 'react';
import './formComment.scss';

type FormCommentProps = {
    label: string;
};

export const FormComment: FC<FormCommentProps> = ({ label }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        const handleResize = () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        };

        textarea.addEventListener('input', handleResize);
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', handleResize);
            }
        };
    }, []);

    return (
        <div className="form-comment">
            <label htmlFor="date">
                <span>{label} </span>
            </label>

            <textarea ref={textareaRef} className="form-comment__textarea" />
        </div>
    );
};
