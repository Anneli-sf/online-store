import './main-section.scss';
import { createElement } from '../global-components/global-components';
import { createAside } from './aside/aside';
import { createProductsSection } from './products-section/products-section';
import { IProductsData } from '../data/data';

export const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
export function createProducstPage(currentArr: IProductsData[]): HTMLDivElement {
    // const productsWrapper = createElement('div', 'products-wrapper') as HTMLDivElement;
    productsWrapper.append(createAside(currentArr), createProductsSection(currentArr));//вернула

    return productsWrapper;
}
