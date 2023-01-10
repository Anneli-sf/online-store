import './nav-menu.scss';
import { createButton, createElement } from '../../global-components/global-components';
import { productsData } from '../../data/data';

//--------------nav menu with path to product into catalogue
export const createNavigation = (productId: number): HTMLElement => {
    const list: HTMLElement = createElement('div', 'nav-list');
    const navStore = createElement('a', 'nav-list-btn') as HTMLLinkElement;
    navStore.classList.add('button');
    navStore.href = new URL(window.location.pathname, window.location.origin).href;
    navStore.textContent = 'Все товары';
    const navCategory: HTMLButtonElement = createButton(productsData[productId].category, 'nav-list-btn');
    const navSubCategory: HTMLButtonElement = createButton(productsData[productId].subcategory, 'nav-list-btn');
    const navProduct: HTMLButtonElement = createButton(productsData[productId].title, 'nav-list-btn');
    navProduct.classList.add('active');

    list.append(navStore, navCategory, navSubCategory, navProduct);

    return list;
};
