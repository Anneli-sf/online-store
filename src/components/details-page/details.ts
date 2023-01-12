import './details.scss';

import { createElement } from '../global-components/global-components';
import { createDetailsBlock } from './product-details/product-details';
import { createNavigation } from './nav-menu/nav-menu';

//------------create full page with product's info and navigation
export function createDetailsPage(productId: number): HTMLDivElement {
    const detailsPage = createElement('div', 'details-page') as HTMLDivElement;
    detailsPage.append(createNavigation(productId), createDetailsBlock(productId));
    return detailsPage;
}
