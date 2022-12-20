import '.filter.scss';
import { createElement, createLabel } from '../../../global-components/global-components';

const checkbox = createElement('div', 'checkbox') as HTMLDivElement;

function createFilterСategories(): HTMLDivElement {
    const filterCategory = createElement('div', 'filter__category') as HTMLDivElement;
    const filterCategoryHeader = createElement('h3', 'filter-category-title') as HTMLHeadingElement;
    filterCategoryHeader.textContent = 'Категории';

    const categoryForm = createElement('form', 'form__category') as HTMLFormElement;

    const categoryFormLabelSport = createLabel('Спорт', 'category-label') as HTMLLabelElement;
    const categoryFormLabelClothes = createLabel('Одежда и аксессуары', 'category-label') as HTMLLabelElement;
    const categoryFormLabelMagicItems = createLabel('Магические предметы', 'category-label') as HTMLLabelElement;
    const categoryFormLabelPotions = createLabel('Зелья', 'category-label') as HTMLLabelElement;
    const categoryFormLabelAuto = createLabel('Транспорт', 'category-label') as HTMLLabelElement;
    const categoryFormLabelMagicalCreatures = createLabel('Магические существа', 'category-label') as HTMLLabelElement;

    const categoryFormInputSport = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputClothes = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputMagicItems = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputPotions = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputAuto = createElement('input', 'category-input') as HTMLInputElement;
    const categoryFormInputMagicalCreatures = createElement('input', 'category-input') as HTMLInputElement;

    appendCheckBox('.category-label');
    setTypeCheckBoks('.category-input');

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

// document.querySelectorAll('.category-label').forEach((item) => {
//     item.append(checkbox);
// });

// Array.from(categoryForm).forEach((item, index) => {
//     item.addEventListener('click', () => {
//         document.querySelectorAll('.checkbox')[index].classList.toggle('checked');
//     });
// });

function createFilterСategories(): HTMLDivElement {
    const filterSubcategory = createElement('div', 'filter__subcategory') as HTMLDivElement;
    const filterSubcategoryHeader = createElement('h3', 'filter-subcategory-title') as HTMLHeadingElement;
    filterSubcategoryHeader.textContent = 'Подкатегории';

    const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

    const subcategoryFormLabelSticks = createLabel('Волшебные палочки', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelStones = createLabel('Камни', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelInteriorItems = createLabel(
        'Предметы интерьера',
        'subcategory-label'
    ) as HTMLLabelElement;
    const subcategoryFormLabelBooks = createLabel('Книжные товары', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelWeapon = createLabel('Оружие', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelCLothes = createLabel('Одежда', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelAccessories = createLabel('Аксессуары', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelFlyingObjects = createLabel('Летающие объекты', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelGoodPotions = createLabel('Добрые зелья', 'subcategory-label') as HTMLLabelElement;
    const subcategoryFormLabelPositiveBeings = createLabel(
        'Положительные существа',
        'subcategory-label'
    ) as HTMLLabelElement;
    const subcategoryFormLabelNegativeBeings = createLabel(
        'Отрицательные существа',
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

    appendCheckBox('.subcategory-label');
    setTypeCheckBoks('.subcategory-input');

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

const appendCheckBox = (elClass: string): void => {
    document.querySelectorAll(elClass).forEach((item) => {
        item.append(checkbox);
    });
};

const setTypeCheckBoks = (elClass: string): void => {
    document.querySelectorAll(elClass).forEach((item) => {
        item.setAttribute('type', 'checkbox');
    });
};
