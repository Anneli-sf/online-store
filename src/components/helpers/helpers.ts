import { IProductsData } from '../global-components/interfaces';
import { categoriesEngNames, subcategoriesEngNames } from '../main-section/aside/filter/filter.constants';

// export const deleteChosenCategory = (currentArr: IProductsData[], chosenCategory: IProductsData[]): IProductsData[] => {
//     for (let i = 0; i < chosenCategory.length; i++) {
//         const index: number = currentArr.findIndex((item) => item.id === chosenCategory[i].id);
//         currentArr.splice(index, 1);
//     }
//     return currentArr;
// };

export const isAlreadyHave = (currentArr: IProductsData[], chosenCategory: IProductsData[]): boolean => {
    return currentArr.some((el) => el.id === chosenCategory[0].id);
};

export const deleteDoubleAddUnique = (
    currentArr: IProductsData[],
    chosenCategory: IProductsData[]
): IProductsData[] => {
    for (let i = 0; i < chosenCategory.length; i++) {
        if (currentArr.some((el) => el.id === chosenCategory[i].id)) {
            const index: number = currentArr.findIndex((item) => item.id === chosenCategory[i].id);
            currentArr.splice(index, 1);
        } else currentArr.push(chosenCategory[i]);
    }
    return currentArr;
};

export const addDoubleDeleteUnique = (
    currentArr: IProductsData[],
    chosenCategory: IProductsData[]
): IProductsData[] => {
    const resultArr: IProductsData[] = [];
    for (let i = 0; i < chosenCategory.length; i++) {
        currentArr.some((item) => item.id === chosenCategory[i].id) ? resultArr.push(chosenCategory[i]) : resultArr;
    }
    return resultArr;
};

export const getMinPrice = (arr: IProductsData[]): number => {
    const numbersArray: number[] = arr.map((item) => item.price);
    return numbersArray.reduce((x, y) => Math.min(x, y));
};

export const getMaxPrice = (arr: IProductsData[]): number => {
    const numbersArray: number[] = arr.map((item) => item.price);
    return numbersArray.reduce((x, y) => Math.max(x, y));
};

export const getMinAmount = (arr: IProductsData[]): number => {
    const numbersArray: number[] = arr.map((item) => item.stock);
    return numbersArray.reduce((x, y) => Math.min(x, y));
};

export const getMaxAmount = (arr: IProductsData[]): number => {
    const numbersArray: number[] = arr.map((item) => item.stock);
    return numbersArray.reduce((x, y) => Math.max(x, y));
};

//------------------------SORT
export const sortByASC = (arr: IProductsData[]): IProductsData[] => {
    return [...arr].sort((x, y) => (x.title.toLowerCase() < y.title.toLowerCase() ? -1 : 1));
};

export const sortByDESC = (arr: IProductsData[]): IProductsData[] => {
    return [...arr].sort((x, y) => (x.title.toLowerCase() > y.title.toLowerCase() ? -1 : 1));
};

export const sortByPriceInc = (arr: IProductsData[]): IProductsData[] => {
    return [...arr].sort((x, y) => y.price - x.price);
};

export const sortByPriceDecr = (arr: IProductsData[]): IProductsData[] => {
    return [...arr].sort((x, y) => x.price - y.price);
};

//------------------------unic categories
export const unicCategories = (arr: IProductsData[]): string[] => {
    const set = new Set(arr.map((el) => el.categoryEng));
    return [...set];
};

export const unicSubcategories = (arr: IProductsData[]): string[] => {
    const set = new Set(arr.map((el) => el.subcategoryEng));
    return [...set];
};

//-------------------------LocalStorage start parameteres

export const fillLocalStorageOnStart = () => {
    if (!localStorage.getItem('cartList')) {
        localStorage.setItem('cartList', JSON.stringify([]));
    }
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
    if (!localStorage.getItem('totalStock')) {
        localStorage.setItem('totalStock', '0');
    }
    if (!localStorage.getItem('totalPrice')) {
        localStorage.setItem('totalPrice', '0');
    }
    if (JSON.parse(localStorage.getItem('cartList') as string).length === 0) {
        localStorage.setItem('btnLeft', 'hide');
        localStorage.setItem('btnRight', 'hide');
    }
    if (!localStorage.getItem('size')) {
        localStorage.setItem('size', '3');
    }
};

export const savePageUrl = (element: HTMLButtonElement) => {
    navigator.clipboard
        .writeText(`${window.location.href}`)
        .then(() => {
            const text = element.textContent;
            element.textContent = 'скопировано';
            setTimeout(() => {
                element.textContent = text;
            }, 1000);
        })
        .catch((err) => console.error(err));
};

export const checkExcess = (searchParams: string) => {
    const indexPrice = searchParams.indexOf('price');
    let x: string = searchParams
        .replace(`${searchParams.slice(indexPrice)}`, '')
        .replace('?', '')
        .replace(/=/g, '')
        .replace('category', '')
        .replace('subcategory', '')
        .replace(/%E2%86%95/g, '')
        .replace(/&/g, '');

    categoriesEngNames.forEach((item) => {
        x = x.replace(item, '');
    });
    subcategoriesEngNames.forEach((item) => {
        x = x.replace(item, '');
    });
    return x;
};
