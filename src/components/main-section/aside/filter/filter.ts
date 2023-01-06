import './filter.scss';
import { createElement, createLabel, createSimpleInput } from '../../../global-components/global-components';
import { subCategoriesList, categoriesList, categoriesEngNames, subcategoriesEngNames } from './filter.constants';
import { productsData } from '../../../data/data';
import { IProductsData } from '../../../global-components/interfaces';

export function createFilters(currentArr: IProductsData[]): HTMLDivElement {
    const filters = createElement('div', 'filters') as HTMLDivElement;
    filters.append(createFilterСategories(currentArr), createFilterSubСategories(currentArr));

    return filters;
}

//------------------categories
function createFilterСategories(currentArr: IProductsData[]): HTMLDivElement {
    const filterCategory = createElement('div', 'filter__category') as HTMLDivElement;
    const filterCategoryHeader = createElement('h3', 'filter-category-title') as HTMLHeadingElement;
    const categoryForm = createElement('form', 'form__category') as HTMLFormElement;

    filterCategoryHeader.textContent = 'Категории';

    filterCategory.append(
        filterCategoryHeader,
        createCategoryFormLabel(
            currentArr,
            categoryForm,
            categoriesList,
            categoriesEngNames,
            'category-label',
            'category-input'
        )
    );

    filterCategory.addEventListener('change', (e) => {
        const element = e.target as HTMLInputElement;
        const label = element.parentElement as HTMLLabelElement;
        if (element instanceof Element && element.closest('input')) {
            element.checked ? label.classList.add('checked') : label.classList.remove('checked');
        }
    });

    return filterCategory;
}

//------------------subcategories
function createFilterSubСategories(currentArr: IProductsData[]): HTMLDivElement {
    const filterSubcategory = createElement('div', 'filter__subcategory') as HTMLDivElement;
    const filterSubcategoryHeader = createElement('h3', 'filter-subcategory-title') as HTMLHeadingElement;
    const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

    filterSubcategoryHeader.textContent = 'Подкатегории';

    filterSubcategory.append(
        filterSubcategoryHeader,
        createCategoryFormLabel(
            currentArr,
            subcategoryForm,
            subCategoriesList,
            subcategoriesEngNames,
            'subcategory-label',
            'subcategory-input'
        )
    );

    filterSubcategory.addEventListener('change', (e) => {
        const element = e.target as HTMLInputElement;
        const label = element.parentElement as HTMLLabelElement;
        if (element instanceof Element && element.closest('input')) {
            element.checked ? label.classList.add('checked') : label.classList.remove('checked');
        }
    });

    return filterSubcategory;
}

//----------------------------------------HELPERS
//---------------------------------------create FORM
function createCategoryFormLabel(
    currentArr: IProductsData[],
    formEl: HTMLFormElement,
    arrCategoriesNames: string[],
    arrEngNames: string[],
    labelClass: string,
    inputClass: string
): HTMLFormElement {
    for (let i = 0; i < arrCategoriesNames.length; i++) {
        const categoryFormLabel = createLabel(arrCategoriesNames[i], labelClass, arrEngNames[i]) as HTMLLabelElement;
        const categoryFormInput = createSimpleInput(inputClass, 'checkbox') as HTMLInputElement;
        categoryFormInput.id = arrEngNames[i];

        // createCurrentAmount();

        const totalAmount = createSimpleInput('amount-input-total', 'number', '', '') as HTMLInputElement;
        totalAmount.readOnly = true;
        switch (arrCategoriesNames) {
            case categoriesList:
                totalAmount.value = String(
                    productsData
                        .filter((item) => item.category === arrCategoriesNames[i])
                        .reduce((acc, curr) => acc + curr.stock, 0)
                );
                break;
            case subCategoriesList:
                totalAmount.value = String(
                    productsData
                        .filter((item) => item.subcategory === arrCategoriesNames[i])
                        .reduce((acc, curr) => acc + curr.stock, 0)
                );
                break;
        }

        const amountBlock = createElement('div', 'amount-block') as HTMLDivElement;
        const spanSlash = createElement('span', 'slash') as HTMLSpanElement;
        spanSlash.textContent = '/';
        amountBlock.append(createCurrentAmount(arrCategoriesNames, currentArr, arrEngNames, i), spanSlash, totalAmount);

        categoryFormLabel.append(amountBlock);
        categoryFormLabel.prepend(categoryFormInput);

        formEl.append(categoryFormLabel);
    }
    return formEl;
}

const createCurrentAmount = (
    arrCategoriesNames: string[],
    currentArr: IProductsData[],
    arrEngNames: string[],
    i: number
): HTMLInputElement => {
    const currentAmount = createSimpleInput('amount-input-current', 'number', '', '') as HTMLInputElement;
    currentAmount.readOnly = true;
    currentAmount.id = arrEngNames[i];
    switch (arrCategoriesNames) {
        case categoriesList:
            currentAmount.value = String(
                currentArr
                    .filter((item) => item.category === arrCategoriesNames[i])
                    .reduce((acc, curr) => acc + curr.stock, 0)
            );
            break;
        case subCategoriesList:
            currentAmount.value = String(
                currentArr
                    .filter((item) => item.subcategory === arrCategoriesNames[i])
                    .reduce((acc, curr) => acc + curr.stock, 0)
            );
            break;
    }
    return currentAmount;
};
//-------------------------------toggle inputs at filters

// const toggleFilterInput = (e: Event, inputClass: string) => {
//     if (e.target instanceof Element && e.target.closest(inputClass)) {
//         const currInput = document.querySelector(inputClass) as HTMLInputElement;
//         currInput.checked ? (currInput.checked = true) : (currInput.checked = false);
//     }
// };
