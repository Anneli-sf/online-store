import './aside.scss';
import { createElement, createButton, createSimpleInput, createLabel } from '../../global-components/global-components';
import { createFilters } from './filter/filter';
import { createSliders } from './dual-slider/dual-slider';
import { IProductsData } from '../../global-components/interfaces';

//------------------ASIDE
export const buttonReset = createButton('', 'btn-reset') as HTMLButtonElement;
export const inputReset = createSimpleInput('input-reset', 'checkbox');
export function createAside(currentArr: IProductsData[]): HTMLElement {
    const asideBlock = createElement('aside', 'main-aside') as HTMLElement;

    const buttonContainer = createElement('div', 'btn-container') as HTMLDivElement;
    const buttonCopy = createButton('скопировать ссылку', 'btn-copy') as HTMLButtonElement;
    const buttonResetLabel = createLabel('сбросить фильтры', 'label-reset', 'reset') as HTMLLabelElement;
    // buttonResetLabel.style.opacity = '1';
    inputReset.id = 'reset';
    buttonResetLabel.append(inputReset);
    buttonReset.prepend(buttonResetLabel);

    buttonContainer.append(buttonReset, buttonCopy);
    asideBlock.append(buttonContainer, createFilters(currentArr), createSliders(currentArr));
    return asideBlock;
}
