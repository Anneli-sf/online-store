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

    const quantity = createParagraph('Общая сумма: 0', 'quantity') as HTMLParagraphElement;

    const cartLink = createElement('a', 'cart-link') as HTMLLinkElement;
    cartLink.href = '#/cart';

    const basket = createImage('../../../assets/icons/basket.png', 'basket', 'basket') as HTMLImageElement;
    cartLink.append(basket);

    header.append(logoLink, quantity, cartLink);

    return header;
}
