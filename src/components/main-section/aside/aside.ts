import './aside.scss';
import { createElement, createButton } from '../../global-components/global-components';
import { createFilterСategories, createFilterSubСategories } from './filter/filter';
import { createPriceDualSlider } from './dual-slider/dual-slider';

//------------------ASIDE

export function createAside(): HTMLElement {
    const asideBlock = createElement('aside', 'main__aside') as HTMLElement;

    const buttonContainer = createElement('div', 'btn__container') as HTMLDivElement;
    const buttonReset = createButton('сбросить фильтры', 'btn__reset') as HTMLButtonElement;
    const buttonCopy = createButton('скопировать ссылку', 'btn__copy') as HTMLButtonElement;

    buttonContainer.append(buttonReset, buttonCopy);
    asideBlock.append(buttonContainer, createFilterСategories(), createFilterSubСategories(), createPriceDualSlider());
    return asideBlock;
}
