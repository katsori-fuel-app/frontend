import { REFUEL_MODE } from 'feature/fuel/shared/refuel-form';
import { RefuelFormType } from 'feature/fuel/types';

type PropsType = {
    form: RefuelFormType;

    closeForm?: () => void;
};
export const useRefuelFormActions = ({ form, closeForm }: PropsType) => {
    const onCreate = async () => {
        console.info('create form', form);
    };

    const onEdit = async () => {
        console.log('edit', form);
    };

    const apply = async () => {
        if (form.mode === REFUEL_MODE.EDIT) {
            await onEdit();
        } else {
            await onCreate();
        }

        closeForm?.();
    };

    return {
        apply,
    }
};