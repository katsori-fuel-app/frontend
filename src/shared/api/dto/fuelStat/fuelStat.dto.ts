export type FuelStatCreate = {
    fuelCount: number;
    fuelType: '98' | '95' | '92';
    refuelCost: number;
    totalMileage: number;
    userId: string;
    comment?: string;
};

export type FuelStatUpdate = {
    uuid: string;
    userId: string;

    date?: Date;
    fuelCount?: number;
    fuelType?: string;
    refuelCost?: number;
    comment?: string;
    totalMileage?: number;
};

export type FuelStatDelete = {
    uuid: string;
    userId: string;
};
