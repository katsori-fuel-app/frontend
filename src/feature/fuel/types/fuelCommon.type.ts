export type FuelRecord = {
    date: string;
    fuelCount: number;
    fuelType: number;
    totalMileage: number;
    fuelCost: number;
    comment?: string;
};

export type FuelData = {
    fuelData: FuelRecord[];
};
