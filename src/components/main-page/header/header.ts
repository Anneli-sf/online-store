import './header.scss';
import { createElement, createImage, createParagraph } from '../../global-components/global-components';

export const header = document.querySelector('.header') as HTMLBodyElement;

export function createHeader(header: HTMLBodyElement): HTMLBodyElement {
    const logo = createImage('../../../assets/img/logo.gif', 'logo', 'logo') as HTMLImageElement;
    const quantity = createParagraph('Общая сумма: 0', 'quantity') as HTMLParagraphElement;
    const basket = createImage('../../../assets/icons/basket.png', 'basket', 'basket') as HTMLImageElement;
    header.append(logo, quantity, basket);

    return header;
}
