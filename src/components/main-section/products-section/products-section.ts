import './products-section.scss';
import {
    createButton,
    createElement,
    createImage,
    createInput,
    createLink,
    createParagraph,
    createSimpleInput,
} from '../../global-components/global-components';
import { createProductCard, keepViewStyle } from './item-card/item-card';
import { IProductsData } from '../../global-components/interfaces';
import { sortByASC, sortByDESC, sortByPriceDecr, sortByPriceInc } from '../../helpers/helpers';

const sortArrow = createImage('./assets/icons/arrow-down.svg', 'sort-arrow', 'sort-arrow') as HTMLImageElement;
export const sortList = createElement('ul', 'sort__list') as HTMLUListElement;
const sortItemAlphabetAZ = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemAlphabetZA = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemPriceInc = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemPrixeDecr = createElement('li', 'sort__item') as HTMLLIElement;
const btnsViewBlock = createElement('div', 'view-btns');
const btnStartView = createButton('one view', 'btn-start-view') as HTMLButtonElement;
export const btnAnotherView = createButton('another view', 'btn-another-view') as HTMLButtonElement;
btnStartView.classList.add('active');

const popup = createElement('div', 'popup-wrapper') as HTMLDivElement;
const popupCard = createElement('div', 'popup') as HTMLDivElement;
const popupContent = createElement('div', 'popup-content') as HTMLDivElement;
popupContent.innerHTML = 'ТОВАР НЕ НАЙДЕН';
export const contentBlock = createElement('div', 'products') as HTMLDivElement;
const sortSpan = createElement('span', 'found-items') as HTMLSpanElement;
// export const productsList = createElement('ul', 'products__list') as HTMLUListElement;

export function createProductsSection(currentArr: IProductsData[]): HTMLDivElement {
    // const contentBlock = createElement('div', 'products') as HTMLDivElement;
    const productsList = createProductsMainList(currentArr) as HTMLUListElement;
    // productsList.append(createPopup());
    contentBlock.append(createProductsHeader(currentArr), productsList, createPopup());

    return contentBlock;
}

//----------------------products header
function createProductsHeader(currentArr: IProductsData[]) {
    const sortBlock = createElement('div', 'products__header') as HTMLDivElement;

    sortList.textContent = 'Сортировка по:';

    sortItemAlphabetAZ.textContent = 'Сортировать от A до Я';
    sortItemAlphabetZA.textContent = 'Сортировать от Я до А';
    sortItemPriceInc.textContent = 'Сортировать по цене 🠕';
    sortItemPrixeDecr.textContent = 'Сортировать по цене 🠗';

    const sortText = createParagraph('Найдено товаров: ', 'sort__text') as HTMLParagraphElement;
    // const sortSpan = createElement('span', 'found-items') as HTMLSpanElement;
    // sortSpan.innerHTML = currentArr.length.toString();

    // const sortInput = createInput('sort__input', 'search', 'Найти товар') as HTMLFormElement;
    const sortInput = createSimpleInput('sort__input', 'search', 'Найти товар', '') as HTMLInputElement;

    sortText.append(sortSpan);
    sortList.append(sortItemAlphabetAZ, sortItemAlphabetZA, sortItemPriceInc, sortItemPrixeDecr, sortArrow);
    btnsViewBlock.append(btnStartView, btnAnotherView);
    sortBlock.append(sortList, sortText, sortInput, btnsViewBlock);

    return sortBlock;
}

//----------------------products list
export function createProductsMainList(currentArr: IProductsData[]): HTMLUListElement {
    const productsList = createElement('ul', 'products__list') as HTMLUListElement;

    sortList.addEventListener('click', (e) => {
        if (e.target instanceof Element && e.target.classList.contains('sort__item')) {
            const sortList = document.querySelectorAll('.sort__item');
            let sortArr: IProductsData[] = [];

            switch (e.target) {
                case sortList[0]:
                    sortArr = sortByASC(currentArr);
                    break;
                case sortList[1]:
                    sortArr = sortByDESC(currentArr);
                    break;
                case sortList[2]:
                    sortArr = sortByPriceDecr(currentArr);
                    break;
                case sortList[3]:
                    sortArr = sortByPriceInc(currentArr);
                    break;
            }

            productsList.innerHTML = '';
            sortArr.forEach((item) => {
                productsList.append(createProductCard(item.id));
                keepViewStyle();
            });
        }
    });

    // const sortSpan = document.querySelector('.found-items') as HTMLSpanElement;
    popup.classList.contains('.open')
        ? (sortSpan.innerHTML = '0')
        : (sortSpan.innerHTML = currentArr.length.toString());

    currentArr.forEach((item) => {
        productsList.append(createProductCard(item.id));
    });
    // productsList.append(createPopup());
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

//---------------click on View-buttons
btnsViewBlock.addEventListener('click', (e) => {
    const cards = [...document.querySelectorAll('.products__item')] as HTMLLIElement[];
    const btnStartView = document.querySelector('.btn-start-view') as HTMLButtonElement;
    const btnAnotherView = document.querySelector('.btn-another-view') as HTMLButtonElement;
    if (e.target instanceof HTMLButtonElement) {
        if (e.target.classList.contains('btn-another-view')) {
            btnAnotherView.classList.add('active');
            btnStartView.classList.remove('active');
            cards.forEach((el) => el.classList.add('another-view'));
        } else {
            btnAnotherView.classList.remove('active');
            btnStartView.classList.add('active');
            cards.forEach((el) => el.classList.remove('another-view'));
        }
    }
});

//----------------------------POPUP Error
function createPopup(): HTMLDivElement {
    popupCard.append(popupContent);
    popup.appendChild(popupCard);

    return popup;
}

export function popupToggle() {
    const POPUP_CARD = document.querySelector('.popup-content') as HTMLDivElement;
    const POPUP = document.querySelector('.popup-wrapper') as HTMLDivElement;
    popup.classList.toggle('popup-open');
    popupContent.classList.toggle('popup-open');
}
