import './main-section.scss';
import { createElement } from '../global-components/global-components';
import { createAside } from './aside/aside';
import { createProductsSection } from './products-section/products-section';
import { IProductsData } from '../global-components/interfaces';

export const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
export function createProducstPage(currentArr: IProductsData[]): HTMLDivElement {
    if (localStorage.getItem('currentProducts')) {
        const array = JSON.parse(localStorage.getItem('currentProducts') as string);
        productsWrapper.append(createAside(currentArr), createProductsSection(array));
    } else {
        productsWrapper.append(createAside(currentArr), createProductsSection(currentArr));
    }

    return productsWrapper;
}
