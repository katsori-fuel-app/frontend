import { FC } from 'react';
import './cardRow.scss';

type Props = {
    fieldName: string;
    fieldValue: string | number;
};

export const CardRow: FC<Props> = ({ fieldName, fieldValue }) => {
    return fieldName === 'Комментарий' ? (
        <div className="card-row-comment">
            <p>
                {fieldName}: {fieldValue}
            </p>
        </div>
    ) : (
        <div className="card-row">
            <span>{fieldName}:</span>
            <span>{fieldValue}</span>
        </div>
    );
};
