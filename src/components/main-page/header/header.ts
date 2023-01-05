import './header.scss';
import { createElement, createImage, createLink, createParagraph } from '../../global-components/global-components';

// export const header = document.querySelector('.header') as HTMLBodyElement;
// const basketLink = createLink('/#/cart', 'basket-link') as HTMLLinkElement;
// const logoLink = createLink('/#/home', 'home-link') as HTMLLinkElement;

export function createHeader(): HTMLBodyElement {
    const header = document.querySelector('.header') as HTMLBodyElement;
    const logo = createImage('../../../assets/img/logo.gif', 'logo', 'logo') as HTMLImageElement;

    const logoLink = createElement('a', 'logo-link') as HTMLLinkElement;
    logoLink.append(logo);
    logoLink.href = '#/';

    const quantity = createParagraph('Общая сумма: ', 'quantity') as HTMLParagraphElement;
    const span = createElement('span', 'total-quantity-header');
    span.textContent = localStorage.getItem('totalPrice');

    quantity.append(span);

    const cartLink = createElement('a', 'cart-link') as HTMLLinkElement;
    cartLink.href = '#/cart';

    const basketContainer = createElement('div', 'basket-container');

    const basket = createImage('../../../assets/icons/basket.png', 'basket', 'basket') as HTMLImageElement;
    const basketSpan = createElement('span', 'found-products');
    if (localStorage.getItem('totalStock')) {
        basketSpan.textContent = localStorage.getItem('totalStock');
    } else {
        basketSpan.textContent = '0';
    }

    basketContainer.append(basket, basketSpan);
    cartLink.append(basketContainer);

    header.append(logoLink, quantity, cartLink);

    return header;
}
