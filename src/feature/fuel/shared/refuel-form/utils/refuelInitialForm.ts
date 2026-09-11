import { RefuelFormType, RefuelMode } from 'feature/fuel/types';
import { REFUEL_MODE } from 'feature/fuel/shared/refuel-form/constants';

// Confidence will be calculated in the backend.
export const refuelInitialForm = (mode: RefuelMode): RefuelFormType => {
    const commonFields = {
        date: Date.now().toString(),
        totalMileage: 0,
        fuelCost: 0,
        fuelCount: 0,
        fuelType: '95',
        comment: '',
    };

    switch (mode) {
        case REFUEL_MODE.INIT:
            return {
                ...commonFields,
                mode: REFUEL_MODE.INIT,
                fuelTankCapacity: 50,
                initFuelConsumption: 8,
            };

        case REFUEL_MODE.EDIT:
            return {
                ...commonFields,
                mode: REFUEL_MODE.EDIT,
            };

        case REFUEL_MODE.REGULAR:
            return {
                ...commonFields,
                mode: REFUEL_MODE.REGULAR,
            };
    }
};
