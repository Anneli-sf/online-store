import './aside.scss';
import { createElement, createButton } from '../../global-components/global-components';
import { createFilters } from './filter/filter';
import { createSliders } from './dual-slider/dual-slider';
import { IProductsData } from '../../data/data';

//------------------ASIDE
export const buttonReset = createButton('сбросить фильтры', 'btn-reset') as HTMLButtonElement;
export function createAside(currentArr: IProductsData[]): HTMLElement {
    const asideBlock = createElement('aside', 'main-aside') as HTMLElement;

    const buttonContainer = createElement('div', 'btn-container') as HTMLDivElement;
    const buttonCopy = createButton('скопировать ссылку', 'btn-copy') as HTMLButtonElement;

    buttonContainer.append(buttonReset, buttonCopy);
    asideBlock.append(buttonContainer, createFilters(currentArr), createSliders(currentArr));
    return asideBlock;
}


