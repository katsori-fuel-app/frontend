import { ChangeEvent } from 'react';
import { REFUEL_MODE } from 'feature/fuel/shared/refuel-form';
import { RadioButton } from 'shared/uiKit';
import { RefuelMode } from 'feature/fuel/types';

const modeOptions = [
    { label: 'Заправка', value: REFUEL_MODE.REGULAR },
    { label: 'Калибровка', value: REFUEL_MODE.CALIBRATION },
] as const;

type PropsType = {
    mode: Extract<RefuelMode, typeof REFUEL_MODE.REGULAR | typeof REFUEL_MODE.CALIBRATION>;
    handleForm: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ModeFormChanger = ({ mode, handleForm }: PropsType) => {
    return (
        <>
            {modeOptions.map(({ label, value }) => (
                <RadioButton
                    key={value}
                    label={label}
                    name="mode"
                    value={value}
                    checked={mode === value}
                    onChange={handleForm}
                />
            ))}
        </>
    );
};
