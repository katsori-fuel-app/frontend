'use client';

import { useFuelTableColumnsTitle } from '../hooks/useFuelTableColumnsTitle';
import { useFuelTableRows } from './hooks/useFuelTableRows';

import './fuelTable.scss';
import { getColumnGrid } from './utils';

export const FuelTable = () => {
    const columnsTitle = useFuelTableColumnsTitle();

    const columnNames = columnsTitle.map((column) => column.columnName);
    const columnsRow = useFuelTableRows(getColumnGrid(columnNames));

    return (
        <div>
            <div className="fuel-table-header" style={getColumnGrid(columnNames)}>
                {columnsTitle.map((title, i) => (
                    <div key={i}>{title.columnName}</div>
                ))}
            </div>

            <div className="fuel-table-border">{columnsRow}</div>
        </div>
    );
};
