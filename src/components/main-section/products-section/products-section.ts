import './products-section.scss';
import { createElement, createImage, createInput, createParagraph } from '../../global-components/global-components';
import { createProductCard } from './item-card/item-card';
import { IProductsData, productsData } from '../../data/data';

const sortArrow = createImage('./assets/icons/arrow-down.svg', 'sort-arrow', 'sort-arrow') as HTMLImageElement;
const sortList = createElement('ul', 'sort__list') as HTMLUListElement;
const sortItemAlphabetAZ = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemAlphabetZA = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemCategory = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemSubCategory = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemPrice = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemDiscount = createElement('li', 'sort__item') as HTMLLIElement;

export function createProductsSection(currentArr: IProductsData[]): HTMLDivElement {
    const contentBlock = createElement('div', 'products') as HTMLDivElement;
    contentBlock.append(createProductsHeader(), createProductsList(currentArr)); //вернула
    document.querySelector('.main')?.append(contentBlock);
    return contentBlock;
}

//----------------------products header
function createProductsHeader() {
    const sortBlock = createElement('div', 'products__header') as HTMLDivElement;

    sortList.textContent = 'Сортировка по:';

    sortItemAlphabetAZ.textContent = 'Сортировка по алфавиту A-Я';
    sortItemAlphabetZA.textContent = 'Сортировка по алфавиту Я-А';
    sortItemCategory.textContent = 'Сортировка по категории';
    sortItemSubCategory.textContent = 'Сортировка по подкатегории';
    sortItemPrice.textContent = 'Сортировка по цене';
    sortItemDiscount.textContent = 'Сортировка по скидке';

    const sortText = createParagraph('Найдено товаров: ', 'sort__text') as HTMLParagraphElement;
    const sortSpan = createElement('span', 'found-items');
    sortSpan.textContent = '0';
    sortText.append(sortSpan);
    const sortInput = createInput('sort__input', 'search', 'Найти товар') as HTMLFormElement; //HTMLInputElement;

    sortList.append(
        sortItemAlphabetAZ,
        sortItemAlphabetZA,
        sortItemCategory,
        sortItemSubCategory,
        sortItemPrice,
        sortItemDiscount,
        sortArrow
    );
    sortBlock.append(sortList, sortText, sortInput);

    return sortBlock;
}

//----------------------products list
function createProductsList(currentArr: IProductsData[]): HTMLUListElement {
    //вернула
    const productsList = createElement('ul', 'products__list') as HTMLUListElement;

    // const array: IProductsData[] = JSON.parse(localStorage.getItem('productsList') as string);

    // if (array !== null && array.length !== 0) {
    //     array.forEach((item) => {
    //         productsList.append(createProductCard(item.id));
    //     });
    // } else {
    //     productsData.forEach((item) => {
    //         productsList.append(createProductCard(item.id));
    //     });
    // }

    currentArr.forEach((item) => {
        productsList.append(createProductCard(item.id));
    });

    return productsList;
}

sortArrow.addEventListener('click', () => {
    if (sortList.classList.contains('open')) {
        sortList.classList.remove('open');
        sortList.querySelectorAll('.sort__item').forEach((el) => el.classList.remove('open'));
        sortArrow.classList.remove('open');
    } else {
        sortList.classList.add('open');
        sortList.querySelectorAll('.sort__item').forEach((el) => el.classList.add('open'));
        sortArrow.classList.add('open');
    }
});
