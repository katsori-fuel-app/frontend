import { ChangeEvent, useEffect, useState } from 'react';
import { RefuelFormType, RefuelMode } from 'feature/fuel/types';
import { refuelInitialForm } from 'feature/fuel/shared/refuel-form/utils';
import { normolizeDate } from 'shared/utils';

type UseRefuelFormProps = {
    mode: RefuelMode;

    data?: RefuelFormType;
    closeForm?: () => void;
};

export const useRefuelForm = ({ mode, data, closeForm }: UseRefuelFormProps) => {
    const [form, setForm] = useState<RefuelFormType>(refuelInitialForm(mode));

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setForm((prev) => ({
            ...prev,
            comment: e.target.value,
        }));
    };

    const cansel = () => {
        if (data) setForm(data);

        closeForm?.();
    };

    useEffect(() => {
        if (!data) return;

        const date = normolizeDate({ parsedDate: data.date }).stringFormat;
        const formattedData = {
            ...data,
            date,
        };

        setForm(formattedData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        form,
        handleForm,
        changeComment,
        cansel,
    };
};