const MAX_DAYS_WITHOUT_FULL_REFUEL = 60;
const CONFIDENCE = {
    INIT: 100,
    WARNING: 70,
    MIN: 50,
}

type CalcConfidenceType = {
    partialRefuels: number;
    daysSinceFullRefuel: number;
    currentConfidence: number;
};

export const getConfidenceEstimate = (months: number, confidence: number) => {
    if (months < MAX_DAYS_WITHOUT_FULL_REFUEL && confidence > CONFIDENCE.WARNING) return;

    if (confidence > CONFIDENCE.MIN && confidence < CONFIDENCE.WARNING) return 'Оценка неточная. Заправьте полный бак.';

    if (months >= MAX_DAYS_WITHOUT_FULL_REFUEL || confidence <= CONFIDENCE.MIN) {
        return 'Точность ниже 50%. Заправьте полный бак.';
    }
};

export const calcConfidence = ({ partialRefuels, daysSinceFullRefuel, currentConfidence}: CalcConfidenceType): number => {
    if (currentConfidence < CONFIDENCE.MIN) return CONFIDENCE.MIN;

    const PARTIAL_REFUEL_COEFF = 0.9;
    const DAYS_WITHOUT_FULL_REFUEL_COEFF = 0.4;

    const totalDiff =
        partialRefuels * PARTIAL_REFUEL_COEFF +
        daysSinceFullRefuel * DAYS_WITHOUT_FULL_REFUEL_COEFF;

    return Math.max(CONFIDENCE.MIN, currentConfidence - totalDiff);
};

const firstEstimate = () => {
    const maxLitersOfCar = 50;
    const currentRashodLiters = 8;
    const currentMilageKm = 188550;
}

const sendNextRefuel = () => {
    const fuelType = '95';
    const fuelCount = 23.5
    const totalRefuelPrice = 1880;
    const currentMilageKm = 188850;

    // это на бэке делается для медианного значения заливания топлива
    const refuelStatAccumulate = [12, 20, 14, 8, 15.5]
    refuelStatAccumulate.push(fuelCount)


    return {
        fuelType,
        fuelCount,
        totalRefuelPrice,
        currentMilageKm,
        // с бэка придёт допом
        confidenceRashod: 0, // тут чот типа milegeDiff/litersDiff;
        nextRefuel: 0, // через сколько км примерно
        confidenceCurrentLiters: 30 //  прога сама считает скок литров теперь, так как доверие
    };
}

// история с оценкой, оценка в виде массива объектов хранится с датой и изменениями для аналитики.
// для юзания использовать последнее значение массива прост, не содержит фул заправки.
// выглядит как: дата, значение оценки, изменение оценки (-0.1 например),
// эта штука уже лежит внутри рефуел хистори

// MODELS
// transport: данные о баке, пробеге начальном/конечном, название, расход топлива, доки какие нить и т.д
// refuels: состоит из общих полей и массив истории
// - общие поля включают: последня калибровка - дата, медиана - объект с меданами,
// - массив включает, дата, количество залитого, цена за рефуел, доверие, расход высчитанный,
// кол топлива посчитанное, тип заправки - фул не фул можно булевкой можно инамкой,