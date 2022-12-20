import './header.scss';
import { createElement, createParagraph } from '../../global-components/global-components';

const header = document.querySelector('.header') as HTMLBodyElement;

export function createHeader(): HTMLBodyElement {
    const logo = createElement('img', 'logo') as HTMLImageElement;
    const quantity = createParagraph('Общая сумма: 0', 'quantity') as HTMLParagraphElement;
    const basket = createElement('img', 'basket') as HTMLImageElement;
    header.append(logo, quantity, basket);

    return header;
}
