import { CSSProperties } from 'react';

export const getColumnGrid = (array: string[]): CSSProperties => {
    return {
        display: 'grid',
        gridTemplateColumns: array
            .map((el) => {
                if (el.length < 20) {
                    return '100px';
                }

                return 'minmax(100px, 200px)';
            })
            .join(' '),
    };
};
