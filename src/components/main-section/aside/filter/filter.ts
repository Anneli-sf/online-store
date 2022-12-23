import './filter.scss';
import { createElement, createLabel, createSimpleInput } from '../../../global-components/global-components';

export const categoriesList: string[] = [
    'Спорт',
    'Одежда и аксессуары',
    'Магические предметы',
    'Зелья',
    'Транспорт',
    'Магические существа',
];

export const subCategoriesList: string[] = [
    'Волшебные палочки',
    'Камни',
    'Предметы интерьера',
    'Книжные товары',
    'Оружие',
    'Одежда',
    'Аксессуары',
    'Летающие объекты',
    'Добрые зелья',
    'Положительные существа',
    'Отрицательные существа',
];

const checkbox = createElement('div', 'checkbox') as HTMLDivElement;
const categoryForm = createElement('form', 'form__category') as HTMLFormElement;
const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

const categoryFormLabelSport = createLabel(categoriesList[0], 'category-label') as HTMLLabelElement;
const categoryFormLabelClothes = createLabel(categoriesList[1], 'category-label') as HTMLLabelElement;
const categoryFormLabelMagicItems = createLabel(categoriesList[2], 'category-label') as HTMLLabelElement;
const categoryFormLabelPotions = createLabel(categoriesList[3], 'category-label') as HTMLLabelElement;
const categoryFormLabelAuto = createLabel(categoriesList[4], 'category-label') as HTMLLabelElement;
const categoryFormLabelMagicalCreatures = createLabel(categoriesList[5], 'category-label') as HTMLLabelElement;

//------------------categories
export function createFilterСategories(): HTMLDivElement {
    const filterCategory = createElement('div', 'filter__category') as HTMLDivElement;
    const filterCategoryHeader = createElement('h3', 'filter-category-title') as HTMLHeadingElement;
    filterCategoryHeader.textContent = 'Категории';

    // const categoryForm = createElement('form', 'form__category') as HTMLFormElement;

    const categoryFormInputSport = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputClothes = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputMagicItems = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputPotions = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputAuto = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputMagicalCreatures = createElement('input', 'category-input') as HTMLInputElement;

    checkbox.classList.add('category-checkbox');
    categoryFormLabelAuto.append(categoryFormInputAuto, createAmountBox());
    categoryFormLabelClothes.append(categoryFormInputClothes, createAmountBox());
    categoryFormLabelMagicItems.append(categoryFormInputMagicItems, createAmountBox());
    categoryFormLabelPotions.append(categoryFormInputPotions, createAmountBox());
    categoryFormLabelSport.append(categoryFormInputSport, createAmountBox());
    categoryFormLabelMagicalCreatures.append(categoryFormInputMagicalCreatures, createAmountBox());

    categoryFormLabelAuto.prepend(checkbox.cloneNode(true));
    categoryFormLabelClothes.prepend(checkbox.cloneNode(true));
    categoryFormLabelMagicItems.prepend(checkbox.cloneNode(true));
    categoryFormLabelPotions.prepend(checkbox.cloneNode(true));
    categoryFormLabelSport.prepend(checkbox.cloneNode(true));
    categoryFormLabelMagicalCreatures.prepend(checkbox.cloneNode(true));

    setTypeCheckBox('.category-input');

    categoryForm.append(
        categoryFormLabelAuto,
        categoryFormLabelClothes,
        categoryFormLabelMagicItems,
        categoryFormLabelPotions,
        categoryFormLabelSport,
        categoryFormLabelMagicalCreatures
    );

    filterCategory.append(filterCategoryHeader, categoryForm);
    return filterCategory;
}

categoryForm.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.className === 'category-checkbox') {
        const currCheckBox = e.target as HTMLElement;
        currCheckBox.classList.toggle('checked');
    } else if (e.target instanceof Element && e.target.closest('.category-input')) {
        const currCheckBox = e.target.previousElementSibling as HTMLElement;
        currCheckBox.classList.toggle('checked');
    }
});

//------------------subcategories
export function createFilterSubСategories(): HTMLDivElement {
    const filterSubcategory = createElement('div', 'filter__subcategory') as HTMLDivElement;
    const filterSubcategoryHeader = createElement('h3', 'filter-subcategory-title') as HTMLHeadingElement;
    filterSubcategoryHeader.textContent = 'Подкатегории';

    // const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

    const subcategoryFormLabelSticks = createLabel(subCategoriesList[0], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelStones = createLabel(subCategoriesList[1], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelInteriorItems = createLabel(
        subCategoriesList[2],
        'subcategory-label'
    ) as HTMLLabelElement;
    const subcategoryFormLabelBooks = createLabel(subCategoriesList[3], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelWeapon = createLabel(subCategoriesList[4], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelCLothes = createLabel(subCategoriesList[5], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelAccessories = createLabel(subCategoriesList[6], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelFlyingObjects = createLabel(
        subCategoriesList[7],
        'subcategory-label'
    ) as HTMLLabelElement;
    const subcategoryFormLabelGoodPotions = createLabel(subCategoriesList[8], 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelPositiveBeings = createLabel(
        subCategoriesList[9],
        'subcategory-label'
    ) as HTMLLabelElement;
    const subcategoryFormLabelNegativeBeings = createLabel(
        subCategoriesList[10],
        'subcategory-label'
    ) as HTMLLabelElement;

    const subcategoryFormInputSticks = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputStones = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputInteriorItems = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputBooks = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputWeapon = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputCLothes = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputAccessories = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputFlyingObjects = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputGoodPotions = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputPositiveBeings = createElement('input', 'subcategory-input') as HTMLInputElement;
    const subcategoryFormInputNegativeBeings = createElement('input', 'subcategory-input') as HTMLInputElement;

    checkbox.classList.add('subcategory-checkbox');
    subcategoryFormLabelAccessories.append(subcategoryFormInputAccessories, createAmountBox());
    subcategoryFormLabelBooks.append(subcategoryFormInputBooks, createAmountBox());
    subcategoryFormLabelCLothes.append(subcategoryFormInputCLothes, createAmountBox());
    subcategoryFormLabelFlyingObjects.append(subcategoryFormInputFlyingObjects, createAmountBox());
    subcategoryFormLabelGoodPotions.append(subcategoryFormInputGoodPotions, createAmountBox());
    subcategoryFormLabelInteriorItems.append(subcategoryFormInputInteriorItems, createAmountBox());
    subcategoryFormLabelSticks.append(subcategoryFormInputSticks, createAmountBox());
    subcategoryFormLabelStones.append(subcategoryFormInputStones, createAmountBox());
    subcategoryFormLabelWeapon.append(subcategoryFormInputWeapon, createAmountBox());
    subcategoryFormLabelPositiveBeings.append(subcategoryFormInputPositiveBeings, createAmountBox());
    subcategoryFormLabelNegativeBeings.append(subcategoryFormInputNegativeBeings, createAmountBox());

    subcategoryFormLabelAccessories.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelBooks.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelCLothes.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelFlyingObjects.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelGoodPotions.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelInteriorItems.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelSticks.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelStones.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelWeapon.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelPositiveBeings.prepend(checkbox.cloneNode(true));
    subcategoryFormLabelNegativeBeings.prepend(checkbox.cloneNode(true));

    setTypeCheckBox('.subcategory-input');

    subcategoryForm.append(
        subcategoryFormLabelAccessories,
        subcategoryFormLabelBooks,
        subcategoryFormLabelCLothes,
        subcategoryFormLabelFlyingObjects,
        subcategoryFormLabelGoodPotions,
        subcategoryFormLabelInteriorItems,
        subcategoryFormLabelSticks,
        subcategoryFormLabelStones,
        subcategoryFormLabelWeapon,
        subcategoryFormLabelPositiveBeings,
        subcategoryFormLabelNegativeBeings
    );

    filterSubcategory.append(filterSubcategoryHeader, subcategoryForm);
    return filterSubcategory;
}

subcategoryForm.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.className === 'subcategory-checkbox') {
        const currCheckBox = e.target as HTMLElement;
        currCheckBox.classList.toggle('checked');
    } else if (e.target instanceof Element && e.target.closest('.subcategory-input')) {
        const currCheckBox = e.target.previousElementSibling as HTMLElement;
        currCheckBox.classList.toggle('checked');
    }
});

//----------------HELPERS
// const appendCheckBoxandsetamountBox = (elClass: string, checkbox: HTMLDivElement): void => {
//     document.querySelectorAll(elClass).forEach((item) => {
//         item.prepend(checkbox.cloneNode(true));
//         item.append(createAmountBox());
//     });
// };

const setTypeCheckBox = (elClass: string): void => {
    document.querySelectorAll(elClass).forEach((item) => {
        item.setAttribute('type', 'checkbox');
    });
};

const createAmountBox = (): HTMLDivElement => {
    const currentAmount = createSimpleInput('amount-input', 'number', '', '0') as HTMLInputElement;
    const totalAmount = createSimpleInput('amount-input', 'number', '', '0') as HTMLInputElement;
    currentAmount.readOnly = true;
    totalAmount.readOnly = true;
    const amountBlock = createElement('div', 'amount-block') as HTMLDivElement;
    amountBlock.append(currentAmount, '/', totalAmount);

    return amountBlock;
};

export { categoryForm };
