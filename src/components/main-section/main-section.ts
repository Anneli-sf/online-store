import './main-section.scss';
import { createElement } from '../global-components/global-components';
import { createAside } from './aside/aside';
import { createProductsSection, popupToggle } from './products-section/products-section';
import { productsData } from '../data/data';
import { deleteDoubleAddUnique, addDoubleDeleteUnique } from '../helpers/helpers';
import { IProductsData, IFilters } from '../global-components/interfaces';

export const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
export function createProducstPage(currentArr: IProductsData[]): HTMLDivElement {
    productsWrapper.append(createAside(currentArr), createProductsSection(currentArr));

    return productsWrapper;
}

export const findCurrentFilters = (el: HTMLInputElement, filters: IFilters) => {
    const chosenCategory: IProductsData[] = productsData.filter((item) => item.categoryEng === el.getAttribute('id'));
    const chosenSubCategory: IProductsData[] = productsData.filter(
        (item) => item.subcategoryEng === el.getAttribute('id')
    );

    filters.categories = deleteDoubleAddUnique(filters.categories, chosenCategory);
    console.log('filters.categories', filters.categories);
    //-----------содержит ли категории выбранные подкатегории
    if (filters.categories.length > 0) {
        let isContain = 0;
        filters.categories.forEach((item) => {
            chosenSubCategory.forEach((element) => {
                if (item.categoryEng == element.categoryEng) isContain++;
            });
        });
        // console.log('isContain', isContain);

        if (isContain == 0 && chosenSubCategory.length > 0) {
            filters.subcategories = filters.subcategories;
            showNotFound();
        } else {
            filters.subcategories = deleteDoubleAddUnique(filters.subcategories, chosenSubCategory);
        } //---------------если категория не выбрана
    }
    // else if (filters.categories.length == 0 && filters.subcategories.length > 0) {
    //     let isContain = 0;
    //     filters.subcategories.forEach((item) => {
    //         chosenCategory.forEach((element) => {
    //             if (item.subcategoryEng == element.subcategoryEng) isContain++;
    //         });
    //     });

    //     if (isContain == 0) {
    //         filters.categories = filters.categories;
    //         const contentBlock = document.querySelector('.products') as HTMLElement;
    //         contentBlock.style.display = 'none';
    //         // console.log('ERROR');
    //         popupToggle();
    //     } else {
    //         filters.categories = addDoubleDeleteUnique(filters.subcategories, chosenCategory);
    //     }
    // }
    else {
        filters.subcategories = deleteDoubleAddUnique(filters.subcategories, chosenSubCategory);
    }

    console.log('filters.subcategories', filters.subcategories);

    filters.currArr =
        filters.subcategories.length === 0
            ? filters.categories
            : filters.categories.length === 0
            ? filters.subcategories
            : addDoubleDeleteUnique(filters.categories, filters.subcategories);
    // console.log('filters.currArr', filters.currArr);
    if (el.classList.contains('input-reset')) {
        filters.currArr = [];
        // console.log('works');
    }

    if (filters.currArr.length === 0) {
        filters.currArr = productsData;
        filters.categories = [];
        filters.subcategories = [];
        deleteCheckBoxStyles();
        return filters.currArr;
    } else return filters.currArr;
    // return filters.currArr.length === 0 ? productsData : filters.currArr;
};

export const deleteCheckBoxStyles = (): void => {
    [...document.querySelectorAll('label')].forEach((label) => label.classList.remove('checked'));
    [...document.querySelectorAll('input')].forEach((input) =>
        (input.checked = true) ? (input.checked = false) : input
    );
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
    const prices: number[] = resultArr.reduce((total: Array<number>, item: IProductsData) => {
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
    const stock: number[] = resultArr.reduce((total: Array<number>, item: IProductsData) => {
        total.push(item.stock);
        return total;
    }, []);

    minAmount.value = Math.min(...stock).toString();
    maxAmount.value = Math.max(...stock).toString();
    minAmountNumber.value = minAmount.value;
    maxAmountNumber.value = maxAmount.value;
};

//---------------show goods are not founded
export const showNotFound = (): void => {
    // const contentBlock = document.querySelector('.products') as HTMLElement;
    const productsList = document.querySelector('.products__list') as HTMLUListElement;
    const sortSpan = document.querySelector('.found-items') as HTMLSpanElement;
    
    // contentBlock.style.display = 'none';
    productsList.style.display = 'none';
    popupToggle();
    // sortSpan.innerHTML = '0';
};
