import { useCallback, useState } from 'react';

export const useToggle = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggled = useCallback(() => {
        setIsToggled((prev) => !prev);
    }, []);

    const toggleOn = useCallback(() => {
        setIsToggled(true);
    }, []);

    const toggleOff = useCallback(() => {
        setIsToggled(false);
    }, []);

    return {
        handleToggled,
        toggleOn,
        toggleOff,
        isToggled,
    };
};
