type Setting = {
    date: string;
    fuelCount: number;
    fuelType: number;
    totalMileage: number;
    fuelCost: number;
    comment?: string;
}[];

export const fueldMockData: Setting = [
    {
        date: '12.02.2025',
        fuelCount: 25.67,
        fuelType: 95,
        totalMileage: 168075,
        fuelCost: 1500,
    },
    {
        date: '18.02.2025',
        fuelCount: 17.11,
        fuelType: 95,
        totalMileage: 168250, // в данных было 168 только
        fuelCost: 1000,
    },
    {
        date: '02.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 168447,
        fuelCost: 1523,
    },
    {
        date: '12.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 168711,
        fuelCost: 1523,
    },
    {
        date: '19.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 168933,
        fuelCost: 1500,
    },
    {
        date: '29.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 169159,
        fuelCost: 1500,
    },
    {
        date: '06.04.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 169438,
        fuelCost: 1500,
        comment: 'машина дёргается после заправки иногда',
    },
    {
        date: '11.04.2025',
        fuelCount: 25.51,
        fuelType: 95,
        totalMileage: 169709,
        fuelCost: 1523,
    },
];
