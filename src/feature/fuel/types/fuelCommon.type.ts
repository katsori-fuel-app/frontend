type FirstRefuelForm = {
    fuelTankCapacity: number;
    fuelConsumption: number;
};

export type FuelRecord = {
    date: string;
    totalMileage: number;
    fuelCount: number;
    fuelType: string;
    fuelCost: number;

    comment?: string;
} & FirstRefuelForm;

export type FuelData = {
    fuelData: FuelRecord[];
};
