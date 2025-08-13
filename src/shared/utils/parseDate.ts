type NormolizeDate = {
    /**
     * Дата формата DD.MM.YY
     */
    parsedDate: string;
};
type InitDate = Date | string;
type ParseDate = {
    dateFormat: Date;
    stringFormat: string;
};

export const normolizeDate = ({ parsedDate }: NormolizeDate) => {
    const [dd, mm, yy] = parsedDate.split('.');

    console.log(parsedDate);
    const yyyy = '20' + yy;

    const normolizeDate = yy.length === 2 ? `${yyyy}-${mm}-${dd}` : `${yy}-${mm}-${dd}`;

    return {
        dateFormat: new Date(normolizeDate),
        stringFormat: normolizeDate,
    };
};

/**
 * Парсит нормализованную дату в дату вида DD.MM.YYYY
 */
export const parseDate = (initDate?: InitDate): ParseDate => {
    console.log(`initDate ${initDate}`);
    if (!initDate) {
        console.warn('Ошибка в fn parseDate: аргумент initDate не передан.');
        return {
            dateFormat: new Date(),
            stringFormat: new Date().toDateString(),
        };
    }

    const date = new Date(initDate);

    if (`${date}` === 'Invalid Date') {
        console.warn('Ошибка в fn parseDate: Invalid Date');
        return {
            dateFormat: new Date(),
            stringFormat: `${date}`,
        };
    }

    const day = date.getDate();
    let month: number | string = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
        month = `0${month}`;
    }

    const finallDate = `${day}.${month}.${year}`;

    /* TODO: добавить возвращение в разных форматах:
        - hh:mm
        - hh:mm:ss
        - dd.mm.yy hh:mm:ss
        - dd.mm.yy hh:mm
        и другие варианты.
    */
    return {
        dateFormat: date,
        stringFormat: finallDate,
    };
};
