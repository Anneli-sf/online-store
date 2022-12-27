import './filter.scss';
import { createElement, createLabel, createSimpleInput } from '../../../global-components/global-components';
import { subCategoriesList, categoriesList } from './filter.constants';
import { productsData } from '../../../data/data';

const checkbox = createElement('div', 'checkbox') as HTMLDivElement;

export function createFilters(): HTMLDivElement {
    const filters = createElement('div', 'filters') as HTMLDivElement;
    filters.append(createFilterСategories(), createFilterSubСategories());
    return filters;
}

//------------------categories
function createFilterСategories(): HTMLDivElement {
    const filterCategory = createElement('div', 'filter__category') as HTMLDivElement;
    const filterCategoryHeader = createElement('h3', 'filter-category-title') as HTMLHeadingElement;
    const categoryForm = createElement('form', 'form__category') as HTMLFormElement;

    filterCategoryHeader.textContent = 'Категории';
    checkbox.classList.add('category-checkbox');

    setTypeCheckBox('.category-input');

    filterCategory.append(
        filterCategoryHeader,
        createCategoryFormLabel(categoryForm, categoriesList, 'category-label', 'category-input', categoriesList)
    );

    categoryForm.addEventListener('click', (e) => toggleFilterInput(e, 'category-checkbox', '.category-input'));
    return filterCategory;
}

//------------------subcategories
function createFilterSubСategories(): HTMLDivElement {
    const filterSubcategory = createElement('div', 'filter__subcategory') as HTMLDivElement;
    const filterSubcategoryHeader = createElement('h3', 'filter-subcategory-title') as HTMLHeadingElement;
    const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

    filterSubcategoryHeader.textContent = 'Подкатегории';
    checkbox.classList.add('subcategory-checkbox');

    setTypeCheckBox('.subcategory-input');

    filterSubcategory.append(
        filterSubcategoryHeader,
        createCategoryFormLabel(
            subcategoryForm,
            subCategoriesList,
            'subcategory-label',
            'subcategory-input',
            subCategoriesList
        )
    );

    subcategoryForm.addEventListener('click', (e) =>
        toggleFilterInput(e, 'subcategory-checkbox', '.subcategory-input')
    );

    return filterSubcategory;
}

//----------------------------------------HELPERS
//---------------------------------------create FORM
function createCategoryFormLabel(
    formEl: HTMLFormElement,
    arr: string[],
    labelClass: string,
    inputClass: string,
    list: Array<string>
): HTMLFormElement {
    for (let i = 0; i < arr.length; i++) {
        const categoryFormLabel = createLabel(arr[i], labelClass) as HTMLLabelElement;
        const categoryFormInput = createElement('input', inputClass) as HTMLInputElement;
        categoryFormLabel.innerText = arr[i];

        const currentAmount = createSimpleInput('amount-input-current', 'number', '', '') as HTMLInputElement;
        currentAmount.readOnly = true;
        switch (list) {
            case categoriesList:
                currentAmount.value = productsData
                    .filter((item) => item.category === list[i])
                    .reduce((acc, curr) => acc + curr.stock, 0);
                break;
            case subCategoriesList:
                currentAmount.value = productsData
                    .filter((item) => item.subcategory === list[i])
                    .reduce((acc, curr) => acc + curr.stock, 0);
                break;
        }

        const totalAmount = createSimpleInput('amount-input-total', 'number', '', '') as HTMLInputElement;
        totalAmount.readOnly = true;
        switch (list) {
            case categoriesList:
                totalAmount.value = productsData
                    .filter((item) => item.category === list[i])
                    .reduce((acc, curr) => acc + curr.stock, 0);
                break;
            case subCategoriesList:
                totalAmount.value = productsData
                    .filter((item) => item.subcategory === list[i])
                    .reduce((acc, curr) => acc + curr.stock, 0);
                break;
        }

        const amountBlock = createElement('div', 'amount-block') as HTMLDivElement;
        amountBlock.append(currentAmount, '/', totalAmount);

        categoryFormLabel.append(categoryFormInput, amountBlock);
        categoryFormLabel.prepend(checkbox.cloneNode(true));
        formEl.append(categoryFormLabel);
    }
    return formEl;
}

//-------------------------------toggle inputs at filters

const toggleFilterInput = (e: Event, checkboxClass: string, inputCalss: string) => {
    if (e.target instanceof Element && e.target.className === checkboxClass) {
        const currCheckBox = e.target as HTMLElement;
        currCheckBox.classList.toggle('checked');
    } else if (e.target instanceof Element && e.target.closest(inputCalss)) {
        const currCheckBox = e.target.previousElementSibling as HTMLElement;
        currCheckBox.classList.toggle('checked');
    }
};

const setTypeCheckBox = (elClass: string): void => {
    document.querySelectorAll(elClass).forEach((item) => {
        item.setAttribute('type', 'checkbox');
    });
};

// productsData.filter((item) => item.category === categoriesList[0]).reduce((acc, curr) => acc + curr.stock, 0);
