import { fueldMockData } from 'feature/fuel/mock-data/TableData';

import '../fuelTable.scss';
import { CSSProperties } from 'react';

export const useFuelTableRows = (cloumnGrid: CSSProperties) => {
    const fuelRows = fueldMockData.map((fuelRow) => {
        return fuelRow;
    });

    const html = fuelRows.reverse().map((row, i) => {
        return (
            <div className="fuel-row" style={cloumnGrid} key={i}>
                <div>{row.date}</div>
                <div>{row.fuelCount}л</div>
                <div>{row.fuelType}л</div>
                {/* <div>
                                     Прошел пробег с последней заправки:  {consumedMileage}
                                     км {' '}
                                </div> */}
                {/* <div>Расход топлива: {fuelConsumption}/100км</div> */}
                <div>{row.totalMileage}</div>
                <div>{row.comment ?? '-'}</div>
                <br />
            </div>
        );
    });

    return html;
};
