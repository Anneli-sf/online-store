import { IProductsData } from '../data/data';

export const deleteChosenCategory = (currentArr: IProductsData[], chosenCategory: IProductsData[]): IProductsData[] => {
    for (let i = 0; i < chosenCategory.length; i++) {
        const index: number = currentArr.findIndex((item) => item.id === chosenCategory[i].id);
        currentArr.splice(index, 1);
    }
    return currentArr;
};

export const isAlreadyHave = (currentArr: IProductsData[], chosenCategory: IProductsData[]): boolean => {
    return currentArr.some((el) => el.id === chosenCategory[0].id);
};
