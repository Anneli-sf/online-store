import './main-section.scss';
import { createElement } from '../global-components/global-components';
import { createAside } from './aside/aside';
import { createProductsSection } from './products-section/products-section';

export function createProducstPage(): HTMLDivElement {
    const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
    productsWrapper.append(createAside(), createProductsSection());

    return productsWrapper;
}
