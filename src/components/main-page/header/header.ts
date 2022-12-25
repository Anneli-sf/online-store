import './header.scss';
import { createElement, createImage, createLink, createParagraph } from '../../global-components/global-components';

// export const header = document.querySelector('.header') as HTMLBodyElement;
// const basketLink = createLink('/#/cart', 'basket-link') as HTMLLinkElement;
// const logoLink = createLink('/#/home', 'home-link') as HTMLLinkElement;


export function createHeader(): HTMLBodyElement {
    const header = document.querySelector('.header') as HTMLBodyElement;
    const basketLink = createLink('/#/cart', 'basket-link') as HTMLLinkElement;
    const logoLink = createLink('/#/home', 'home-link') as HTMLLinkElement;
    const logo = createImage('../../../assets/img/logo.gif', 'logo', 'logo') as HTMLImageElement;
    const quantity = createParagraph('Общая сумма: 0', 'quantity') as HTMLParagraphElement;
    const basket = createImage('../../../assets/icons/basket.png', 'basket', 'basket') as HTMLImageElement;
    basketLink.append(basket);
    logoLink.append(logo);
    header.append(logoLink, quantity, basketLink);

    return header;
}
