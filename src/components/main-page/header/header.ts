import './header.scss';
import { createElement, createImage, createParagraph } from '../../global-components/global-components';

const header = document.querySelector('.header') as HTMLBodyElement;

export function createHeader(): HTMLBodyElement {
    const logo = createImage('../../../public/img/logo.gif', 'logo', 'logo') as HTMLImageElement;
    const quantity = createParagraph('Общая сумма: 0', 'quantity') as HTMLParagraphElement;
    const basket = createImage('../../../public/icons/basket.png', 'basket', 'basket') as HTMLImageElement;
    header.append(logo, quantity, basket);

    return header;
}