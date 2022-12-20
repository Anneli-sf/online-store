import './header.scss';
import { createElement } from '../../global-components/global-components';

const header = document.querySelector('.header') as HTMLBodyElement;

export function createHeader(): HTMLBodyElement {
    const logo: HTMLImageElement = createElement('img', 'logo');
    const quantity: HTMLParagraphElement = createElement('p', 'quantity');
    const basket: HTMLImageElement = createElement('img', 'basket');
    header.append(logo, quantity, basket);

    return header;
}
