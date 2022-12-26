import './aside.scss';
import { createElement, createButton } from '../../global-components/global-components';
import { createFilters } from './filter/filter';
import { createSliders } from './dual-slider/dual-slider';

//------------------ASIDE

export function createAside(): HTMLElement {
    const asideBlock = createElement('aside', 'main-aside') as HTMLElement;

    const buttonContainer = createElement('div', 'btn-container') as HTMLDivElement;
    const buttonReset = createButton('сбросить фильтры', 'btn-reset') as HTMLButtonElement;
    const buttonCopy = createButton('скопировать ссылку', 'btn-copy') as HTMLButtonElement;

    buttonContainer.append(buttonReset, buttonCopy);
    asideBlock.append(buttonContainer, createFilters(), createSliders());
    return asideBlock;
}
