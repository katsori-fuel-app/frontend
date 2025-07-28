export type FuelRecord = {
    date: string;
    fuelCount: number;
    fuelType: string;
    totalMileage: number;
    fuelCost: number;
    comment?: string;
};

export type FuelData = {
    fuelData: FuelRecord[];
};
