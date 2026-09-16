import { REFUEL_MODE } from 'feature/fuel/shared/refuel-form/constants';

type CommonRefuelField = {
    date: string;
    totalMileage: number;
    fuelCount: number;
    fuelType: string;
    fuelCost: number;

    comment?: string;
};

type FirstRefuelForm = {
    mode: typeof REFUEL_MODE.INIT;
    fuelTankCapacity: number;
    initFuelConsumption: number;
} & CommonRefuelField;

type EditRefuelForm = {
    mode: typeof REFUEL_MODE.EDIT;
} & CommonRefuelField;

type RegularRefuelForm = {
    mode: typeof REFUEL_MODE.REGULAR;
} & CommonRefuelField;

/** TODO next feature. */
// type CalibrationRefuelForm = {
//     mode: 'calibration';
// } & CommonRefuelField;

export type RefuelMode = (typeof REFUEL_MODE)[keyof typeof REFUEL_MODE];
export type RefuelFormType = FirstRefuelForm | RegularRefuelForm | EditRefuelForm;

// TODO need to rename. This is general data, not just fuelTable.
export type FuelData = {
    fuelData: RefuelFormType[];
    expectedRefuelDistance: number;
    expectedRefuelDays: number;
};
