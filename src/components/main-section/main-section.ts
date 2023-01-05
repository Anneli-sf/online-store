import './main-section.scss';
import { createElement } from '../global-components/global-components';
import { createAside } from './aside/aside';
import { createProductsSection } from './products-section/products-section';
import { productsData, IProductsData } from '../data/data';
import { deleteDoubleAddUnique, addDoubleDeleteUnique } from '../helpers/helpers';

export const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
export function createProducstPage(currentArr: IProductsData[]): HTMLDivElement {
    // const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
    productsWrapper.append(createAside(currentArr), createProductsSection(currentArr));

    return productsWrapper;
}

//---------------------------------SETTINGS
export const filters = {
    categories: [] as IProductsData[],
    subcategories: [] as IProductsData[],
    currArr: [] as IProductsData[],
    price: [] as IProductsData[],
};

export const findCurrentFilters = (el: HTMLInputElement) => {
    // if (filters.currArr.length === productsData.length) {
    //     filters.currArr = [];
    //     //     // [...document.querySelectorAll('label')].forEach((label) => label.classList.remove('checked'));
    //     //     // [...document.querySelectorAll('input')].forEach((input) => (input.checked = false));
    // }
    const chosenCategory: IProductsData[] = productsData.filter((item) => item.categoryEng === el.getAttribute('id'));
    const chosenSubCategory: IProductsData[] = productsData.filter(
        (item) => item.subcategoryEng === el.getAttribute('id')
    );

    filters.categories = deleteDoubleAddUnique(filters.categories, chosenCategory);
    // console.log('filters.categories', filters.categories);
    filters.subcategories = deleteDoubleAddUnique(filters.subcategories, chosenSubCategory);
    // console.log('filters.subcategories', filters.subcategories);
    filters.currArr =
        filters.subcategories.length === 0
            ? filters.categories
            : filters.categories.length === 0
            ? filters.subcategories
            : addDoubleDeleteUnique(filters.categories, filters.subcategories);
    console.log('filters.currArr', filters.currArr);
    // if (filters.currArr.length === 0) {
    //     const contentBlock = document.querySelector('.products') as HTMLDivElement;
    //     contentBlock.innerHTML = `ПРОСТИТЕ, ТОВАР НЕ НАЙДЕН`;
    //     filters.currArr = filters.categories;
    //     // [...document.querySelectorAll('label')].forEach((label) => label.classList.remove('checked'));
    //     // [...document.querySelectorAll('input')].forEach((input) =>
    //     // (input.checked = true) ? (input.checked = false) : input
    //     // );
    //     // return productsData;
    // } else {
    //     return filters.currArr;
    // }
    // return filters.currArr.length === 0 ? filters.categories : filters.currArr;
    if (filters.currArr.length === 0) {
        filters.currArr = productsData;
        filters.categories = [];
        filters.subcategories = [];
        [...document.querySelectorAll('label')].forEach((label) => label.classList.remove('checked'));
        [...document.querySelectorAll('input')].forEach((input) =>
            (input.checked = true) ? (input.checked = false) : input
        );
        return filters.currArr;
    } else return filters.currArr;
    // return filters.currArr.length === 0 ? productsData : filters.currArr;
};

export const stateFilters = (categories: string[], subcategories: string[], resultArr: IProductsData[]) => {
    let categoryState = '';
    let subcategoryState = '';

    if (categories.length > 0) categoryState = 'category=' + categories.join('↕');
    if (subcategories.length > 0) subcategoryState = 'subcategory=' + subcategories.join('↕');
    let state = `/?${categoryState}&${subcategoryState}`;
    if (resultArr.length === productsData.length) state = '/';
    // console.log(state);
    return state;
};

//--------------------------set prices to slider
export const setPricesToSlider = (resultArr: IProductsData[]): void => {
    const minPrice = document.querySelector('#min-price') as HTMLInputElement;
    const maxPrice = document.querySelector('#max-price') as HTMLInputElement;
    const minPriceNumber = document.querySelector('#min-input-price') as HTMLInputElement;
    const maxPriceNumber = document.querySelector('#max-input-price') as HTMLInputElement;
    const prices: number[] = resultArr.reduce((total, item: IProductsData) => {
        total.push(item.price);
        return total;
    }, []);

    minPrice.value = Math.min(...prices).toString();
    maxPrice.value = Math.max(...prices).toString();
    minPriceNumber.value = minPrice.value;
    maxPriceNumber.value = maxPrice.value;
};

export const setAmountToSlider = (resultArr: IProductsData[]): void => {
    const minAmount = document.querySelector('#min-amount') as HTMLInputElement;
    const maxAmount = document.querySelector('#max-amount') as HTMLInputElement;
    const minAmountNumber = document.querySelector('#min-input-amount') as HTMLInputElement;
    const maxAmountNumber = document.querySelector('#max-input-amount') as HTMLInputElement;
    const stock: number[] = resultArr.reduce((total, item: IProductsData) => {
        total.push(item.stock);
        return total;
    }, []);

    minAmount.value = Math.min(...stock).toString();
    maxAmount.value = Math.max(...stock).toString();
    minAmountNumber.value = minAmount.value;
    maxAmountNumber.value = maxAmount.value;
};
