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
    buttonCopy.classList.add('button-second');
    const buttonResetLabel = createLabel('сбросить фильтры', 'label-reset', 'reset') as HTMLLabelElement;
    buttonResetLabel.classList.add('button-second');

    inputReset.id = 'reset';
    inputReset.classList.add('filter-input');
    buttonResetLabel.append(inputReset);
    buttonReset.prepend(buttonResetLabel);

    buttonContainer.append(buttonReset, buttonCopy);
    asideBlock.append(buttonContainer, createFilters(currentArr), createSliders(currentArr));
    return asideBlock;
}
