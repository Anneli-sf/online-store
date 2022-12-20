import './products-section.scss';
import { createElement, createImage, createInput, createParagraph } from '../../global-components/global-components';
import { createProductCard } from '../item-card/item-card';


//----------------------CONTENT

export function createProductsSection(): HTMLDivElement {
    const contentBlock = createElement('div', 'products') as HTMLDivElement;
    contentBlock.append(createProductsHeader(), createProductsList());
    return contentBlock;
}

function createProductsHeader() {
    const sortBlock = createElement('div', 'products__header') as HTMLDivElement;

    const sortList = createElement('ul', 'sort__list') as HTMLUListElement;
    sortList.textContent = 'Сортировка по:';

    const sortItemAlphabetAZ = createElement('li', 'sort__item') as HTMLLIElement;
    sortItemAlphabetAZ.textContent = 'Сортировка по алфавиту A-Я';

    const sortItemAlphabetZA = createElement('li', 'sort__item') as HTMLLIElement;
    sortItemAlphabetZA.textContent = 'Сортировка по алфавиту Я-А';

    const sortItemCategory = createElement('li', 'sort__item') as HTMLLIElement;
    sortItemCategory.textContent = 'Сортировка по категории';

    const sortItemSubCategory = createElement('li', 'sort__item') as HTMLLIElement;
    sortItemSubCategory.textContent = 'Сортировка по подкатегории';

    const sortItemPrice = createElement('li', 'sort__item') as HTMLLIElement;
    sortItemPrice.textContent = 'Сортировка по цене';

    const sortItemDiscount = createElement('li', 'sort__item') as HTMLLIElement;
    sortItemDiscount.textContent = 'Сортировка по скидке';

    const sortArrow = createImage(
        '../../../public/icons/arrow-down.svg',
        'sort-arrow',
        'sort-arrow'
    ) as HTMLImageElement;
    const sortText = createParagraph('Найдено товаров: 0', 'sort__text') as HTMLParagraphElement;
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

function createProductsList(): HTMLUListElement {
    const productsList = createElement('ul', 'products__list') as HTMLUListElement;
    let i = 0;
    while (i < 40) {
        // productsList.append(productsItem.cloneNode(true));
        productsList.append(createProductCard(i));
        i++;
    }
    return productsList;
}

// const fillProductsList = () => {
//     let i = 0;
//     while (i < 40) {
//         productsList.append(productsItem.cloneNode(true));
//         i++;
//     }
//     return productsList;
// };
