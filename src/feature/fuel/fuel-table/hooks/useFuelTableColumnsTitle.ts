export const useFuelTableColumnsTitle = () => {
    const fueldTableColumnsTitle = [
        {
            columnName: 'Дата', // стоит сделать дату заправки и отдельно табличку с ремонтом, которые по табу переключаются
        },
        {
            columnName: 'Влито',
        },
        {
            columnName: 'Тип*', // сделать тултип где будет написано "тип топлива"
        },
        {
            columnName: 'Пройдено', // сделать тултип где будет написано "Расстояние после последней заправки"
        },
        {
            columnName: 'Расход',
        },
        {
            columnName: 'Пробег*', // сделать тултип где будет написано "Текущий пробег"
        },
        {
            columnName: 'Комментарий',
        },
    ];

    return fueldTableColumnsTitle;
};
