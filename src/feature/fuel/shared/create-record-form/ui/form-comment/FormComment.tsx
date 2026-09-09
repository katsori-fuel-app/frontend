import { ChangeEvent, FC, useEffect, useRef } from 'react';
import './formComment.scss';

type FormCommentProps = {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const FormComment: FC<FormCommentProps> = ({ label, value, onChange }) => {
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

            <textarea
                ref={textareaRef}
                className="form-comment__textarea"
                value={value}
                placeholder="Введите текст комментария"
                onChange={onChange}
            />
        </div>
    );
};
