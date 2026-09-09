'use client';

import { Fuel } from 'feature/fuel/Fuel';
import { FirstRefuel } from 'feature/fuel/ui/first-refuel/FirstRefuel';

export default function FuelPage() {
    const isFirstRefuel = true;

    return (
        isFirstRefuel ? <FirstRefuel /> : <Fuel />
    );
}
