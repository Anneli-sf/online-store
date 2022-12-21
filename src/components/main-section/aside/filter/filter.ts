import './filter.scss';
import { createElement, createLabel } from '../../../global-components/global-components';

const checkbox = createElement('div', 'checkbox') as HTMLDivElement;
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

export function createFilterСategories(): HTMLDivElement {
    const filterCategory = createElement('div', 'filter__category') as HTMLDivElement;
    const filterCategoryHeader = createElement('h3', 'filter-category-title') as HTMLHeadingElement;
    filterCategoryHeader.textContent = 'Категории';

    const categoryForm = createElement('form', 'form__category') as HTMLFormElement;

    const categoryFormLabelSport = createLabel(categoriesList[0], 'category-label') as HTMLLabelElement;
    const categoryFormLabelClothes = createLabel(categoriesList[1], 'category-label') as HTMLLabelElement;
    const categoryFormLabelMagicItems = createLabel(categoriesList[2], 'category-label') as HTMLLabelElement;
    const categoryFormLabelPotions = createLabel(categoriesList[3], 'category-label') as HTMLLabelElement;
    const categoryFormLabelAuto = createLabel(categoriesList[4], 'category-label') as HTMLLabelElement;
    const categoryFormLabelMagicalCreatures = createLabel(categoriesList[5], 'category-label') as HTMLLabelElement;

    const categoryFormInputSport = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputClothes = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputMagicItems = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputPotions = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputAuto = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputMagicalCreatures = createElement('input', 'category-input') as HTMLInputElement;

    appendCheckBox('.category-label', checkbox);
    setTypeCheckBox('.category-input');

    Array.from(categoryForm).forEach((item, index) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.checkbox')[index].classList.toggle('checked');
        });
    });

    categoryFormLabelAuto.append(categoryFormInputAuto);
    categoryFormLabelClothes.append(categoryFormInputClothes);
    categoryFormLabelMagicItems.append(categoryFormInputMagicItems);
    categoryFormLabelPotions.append(categoryFormInputPotions);
    categoryFormLabelSport.append(categoryFormInputSport);
    categoryFormLabelMagicalCreatures.append(categoryFormInputMagicalCreatures);

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

export function createFilterSubСategories(): HTMLDivElement {
    const filterSubcategory = createElement('div', 'filter__subcategory') as HTMLDivElement;
    const filterSubcategoryHeader = createElement('h3', 'filter-subcategory-title') as HTMLHeadingElement;
    filterSubcategoryHeader.textContent = 'Подкатегории';

    const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

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

    appendCheckBox('.subcategory-label', checkbox);
    setTypeCheckBox('.subcategory-input');

    Array.from(subcategoryForm).forEach((item, index) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.checkbox')[index + 6].classList.toggle('checked');
        });
    });

    subcategoryFormLabelAccessories.append(subcategoryFormInputAccessories);
    subcategoryFormLabelBooks.append(subcategoryFormInputBooks);
    subcategoryFormLabelCLothes.append(subcategoryFormInputCLothes);
    subcategoryFormLabelFlyingObjects.append(subcategoryFormInputFlyingObjects);
    subcategoryFormLabelGoodPotions.append(subcategoryFormInputGoodPotions);
    subcategoryFormLabelInteriorItems.append(subcategoryFormInputInteriorItems);
    subcategoryFormLabelSticks.append(subcategoryFormInputSticks);
    subcategoryFormLabelStones.append(subcategoryFormInputStones);
    subcategoryFormLabelWeapon.append(subcategoryFormInputWeapon);
    subcategoryFormLabelPositiveBeings.append(subcategoryFormInputPositiveBeings);
    subcategoryFormLabelNegativeBeings.append(subcategoryFormInputNegativeBeings);

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

const appendCheckBox = (elClass: string, checkbox: HTMLDivElement): void => {
    document.querySelectorAll(elClass).forEach((item) => {
        item.append(checkbox.cloneNode(true));
    });
};

const setTypeCheckBox = (elClass: string): void => {
    document.querySelectorAll(elClass).forEach((item) => {
        item.setAttribute('type', 'checkbox');
    });
};
