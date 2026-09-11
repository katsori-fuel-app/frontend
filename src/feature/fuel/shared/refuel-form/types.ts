import { RefuelFormType, RefuelMode } from 'feature/fuel/types';

export type RefuelProps = {
    mode: RefuelMode;

    closeForm?: () => void;
    data?: RefuelFormType;
};
