'use client';

import { useFuelTableColumnsTitle } from 'feature/fuel/hooks';
import { useFuelTableRows } from './hooks/useFuelTableRows';

import './fuelTable.scss';
import { getColumnGrid } from './utils';
import { FuelData } from '../types';

type FuelTableProps = {
    fuelData: FuelData['fuelData'];
};

export const FuelTable = ({ fuelData }: FuelTableProps) => {
    const columnsTitle = useFuelTableColumnsTitle();

    const columnNames = columnsTitle.map((column) => column.columnName);
    const columnsRow = useFuelTableRows({ cloumnGrid: getColumnGrid(columnNames), fuelData });

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
