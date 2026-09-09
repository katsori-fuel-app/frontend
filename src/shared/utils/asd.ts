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
// + transport: данные о баке, пробеге начальном/конечном, название, расход топлива, доки какие нить и т.д


const firstCalibrationDate = () => {
    /**
     * Транспорт в отдельной таблице.
     *
     * Расширения для показа прошлого владельца и его данных не будет.
     * Если нужно будет расширять, то приложуха будет делаться с нуля, учитывая возможные масштабирования.
     * Текущая версия очень маленькая, без масштаба в будущем.
     */
    const transport = {
        maxLitersOfCar: 50,
        currentRashodLiters: 8,
        currentMilageKm: 188550,
        initMilageKm: 188550,
        name: 'Lada Kalina',
        docs: null,
        ownershipSince: '01-01-2022',
        ownershipEnd: '01-01-2029',
    };

    /**
     * Медана в отдельной таблице.
     *
     * Берём литраж каждый заправки, а через 7 дней сетим медиану в medianHistory.
     * За год получаем 48 (4х12) значений, кабуто можно спокойно лет 10 хранить это.
     */
    const medians = {
        medianHistory: [],
        finallyMedian: 0,
    };

    /**
     * Доверие/точность в отдельной таблице.
     *
     * Падает до своей фиксированной точки и больше не изменяется.
     * Если заправляться с низкой точность, то она не будет меняться.
     * Обновляетяс до 100 процентов каждую full refuel.
     */
    const confidence = [
        {
            date: '12-12-12',
            value: 100,
            change: 0,
        },
    ];

    const refuelSendData = {
        data: '22-11-2026',
        /**
         * Калибровка - это самый первый ввод данных. Может быть только 1 раз.
         * Рекалибровка - можно вызваться, чтобы сбросить все показатели. Отменить нельзя.
         * Частичная заправка.
         * Полная заправка минимум раз в 2 мес.
         */
        type: 'REFUEL', // 'CALIBRATION', 'RECALIBRATION', 'REFUEL', 'FULL'
        isFull: false,
        fuel: {
            type: '95',
            addLiters: 23,
        },
        price: 2032, // cost/price or smth else
        mileage: 188850,
        comment: 'try another fuel station.',
    };

    const nextRefuelBackendAnswerData = {
        ...refuelSendData,
        fuel: {
            ...refuelSendData.fuel,
            currentLiters: 41,
        },
        id: 1,
        mileage: {
            rashod: {
                // calc by backend
                onMileage: 100,
                fuelCount: 8.53,
            },
            nextRefuel: 189250,
        },
        confidence: 99, // из таблицы будет тянуть
        medianRefuel: 23, // из таблицы будет тянуть
    };

    const sendRec = (ts: object) => {
        /**....code*/
    };

    sendRec(transport); // api to backend
};
