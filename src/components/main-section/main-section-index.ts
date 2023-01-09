import { IProductsData, IFilters } from '../global-components/interfaces';
import { productsData } from '../data/data';
import { deleteDoubleAddUnique, addDoubleDeleteUnique } from '../helpers/helpers';
import { openPopup, closePopup } from './products-section/products-section';
import { deleteCheckBoxStyles } from './aside/aside';

//------------------main function for checkbox filters
export const findCurrentFilters = (el: HTMLInputElement, filters: IFilters, minPrice: string, maxPrice: string) => {
    const chosenCategory: IProductsData[] = productsData.filter((item) => item.categoryEng === el.getAttribute('id'));
    const chosenSubCategory: IProductsData[] = productsData.filter(
        (item) => item.subcategoryEng === el.getAttribute('id')
    );

    filters.categories = deleteDoubleAddUnique(filters.categories, chosenCategory);
    // .filter(
    //     (item) => item.price >= +minPrice && item.price <= +maxPrice
    // );
    // console.log('filters.categories', filters.categories);

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
            // .filter((item) => item.price >= +minPrice && item.price <= +maxPrice);
            el.checked === true ? showNotFound() : closePopup();
        } else {
            filters.subcategories = deleteDoubleAddUnique(filters.subcategories, chosenSubCategory);
            // .filter((item) => item.price >= +minPrice && item.price <= +maxPrice);
            closePopup();
        } //---------------если категория не выбрана
    } else {
        filters.subcategories = deleteDoubleAddUnique(filters.subcategories, chosenSubCategory);
        // .filter((item) => item.price >= +minPrice && item.price <= +maxPrice);
    }

    // console.log('filters.subcategories', filters.subcategories);

    filters.currArr =
        filters.subcategories.length === 0
            ? filters.categories
            : filters.categories.length === 0
            ? filters.subcategories
            : addDoubleDeleteUnique(filters.categories, filters.subcategories);

    //----------------RESET FILTERS
    if (el.classList.contains('input-reset')) {
        filters.currArr = [];
    }
    // console.log('max, min', maxPrice, minPrice);
    if (filters.currArr.length === 0) {
        filters.currArr = productsData;
        filters.categories = [];
        filters.subcategories = [];
        deleteCheckBoxStyles();
        return filters.currArr;
    } else return filters.currArr; //.filter((item) => item.price >= +minPrice && item.price <= +maxPrice);
    // return filters.currArr.length === 0 ? productsData : filters.currArr;
};

//---------------------create URL
export const stateFilters = (
    categories: string[],
    subcategories: string[],
    minPrice: string,
    maxPrice: string,
    minAmount: string,
    maxAmount: string,
    resultArr: IProductsData[],
    // element?: HTMLInputElement
) => {
    let categoryState = '';
    let subcategoryState = '';
    // let searchWord = '';

    if (categories.length > 0) categoryState = 'category=' + categories.join('↕');
    if (subcategories.length > 0) subcategoryState = 'subcategory=' + subcategories.join('↕');
    // if (element.className === 'sort__input' && element.value.length > 0) searchWord = `&search=${element.value}`;
    let state = `?${categoryState}&${subcategoryState}&price=${minPrice}↕${maxPrice}&stock=${minAmount}↕${maxAmount}${searchWord}`;
    if (resultArr.length === productsData.length) state = '/';

    return state;
};

//-------------------find cards bu searching
export const searchByWord = (word: string, arr: IProductsData[]) => {
    word = word.toLowerCase();
    if (word.length !== 0)
        return arr.filter((item) => {
            if (
                item.category.toLowerCase().includes(word) ||
                item.subcategory.toLowerCase().includes(word) ||
                item.title.toLowerCase().includes(word) ||
                item.description.toLowerCase().includes(word) ||
                item.price.toString().includes(word) ||
                item.discount.toString().includes(word) ||
                item.stock.toString().includes(word) ||
                item.raiting.toString().includes(word)
            )
                return item;
        });
    else return arr;
};

//---------------show goods are not founded
export const showNotFound = (): void => {
    const productsList = document.querySelector('.products__list') as HTMLUListElement;
    const sortSpan = document.querySelector('.found-items') as HTMLSpanElement;
    productsList.style.display = 'none';
    openPopup();
    sortSpan.innerHTML = '0';
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

//--------------------------set amount to slider
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
