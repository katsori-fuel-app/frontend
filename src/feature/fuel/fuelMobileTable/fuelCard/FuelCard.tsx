import './fuelCard.scss';

const nameProp = [
    {
        prop: 'date',
        name: 'дата',
    },
    {
        prop: 'fuelConst',
        name: 'цена',
    },
    {
        prop: 'fuelCount',
        name: 'количество',
    },
    {
        prop: 'fuelType',
        name: 'тип',
    },
    {
        prop: 'totalMileage',
        name: 'пробег',
    },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FuelCard = (info: any) => {
    console.log('inf', info);
    // const asd = () 
    return (
        <div className="fuel-card">
            <span>пробег:</span>
            <span>{info.totalMileage}</span>
        </div>
    );
};
