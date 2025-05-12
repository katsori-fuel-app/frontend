import { useEffect, RefObject } from 'react';

type EventListener = (event: MouseEvent | TouchEvent) => void;

type UseClickOutsideProps = {
    refPrimary: RefObject<HTMLElement | null>;
    refSecondary?: RefObject<HTMLElement | null>;
    handler: EventListener;
};

export const useClickOutside = ({ refPrimary, handler, refSecondary }: UseClickOutsideProps) => {
    useEffect(() => {
        const handleClickOutsideMenu: EventListener = (event) => {
            const isOutsidePrimary =
                refPrimary?.current && !refPrimary.current.contains(event.target as Node);

            const isOutsideSecondary =
                refSecondary &&
                refSecondary.current &&
                !refSecondary?.current.contains(event.target as Node);

            if ((isOutsidePrimary && !refSecondary) || (isOutsidePrimary && isOutsideSecondary)) {
                handler(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [refPrimary, handler, refSecondary]);
};
