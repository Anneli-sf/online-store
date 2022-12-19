import './details.scss';

import { createElement } from '../global-components/global-components';
import { createDetailsBlock } from './product-details/product-details';
import { createNavigation } from './nav-menu/nav-menu';

//------------create full page with product's info and navigation
export function createDetailsPage(productId: number): HTMLElement {
    const mainSection = createElement('main', 'main');
    mainSection.append(createNavigation(productId), createDetailsBlock(productId));
    return mainSection;
}
