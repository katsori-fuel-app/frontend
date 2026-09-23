import { REFUEL_MODE } from 'feature/fuel/shared/refuel-form/constants';
import { RefuelMode } from 'feature/fuel/types';

export const getRefuelFormStatic = (mode: RefuelMode) => {
    switch (mode) {
        case REFUEL_MODE.INIT: {
            return {
                title: 'Заправьте полный бак для калибровки',
                submitButton: 'Добавить',
            };
        }
        case REFUEL_MODE.EDIT: {
            return {
                title: 'Редактирование.',
                submitButton: 'Сохранить',
            };
        }
        case REFUEL_MODE.REGULAR: {
            return {
                title: 'Добавление записи.',
                submitButton: 'Добавить',
            };
        }
        case REFUEL_MODE.CALIBRATION: {
            return {
                title: 'Актуализируйте данные. Проведите калибровку.',
                submitButton: 'Сохранить',
            };
        }
        default: {
            return {
                title: 'Добавление записи',
                submitButton: 'Добавить',
            };
        }
    }
};