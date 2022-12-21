import './sass/style.scss';
import './components/main-section/aside/filter/filter';
import './components/main-section/products-section/products-section';
import './components/main-section/aside/dual-slider/dual-slider';
import './components/main-section/aside/aside';
import './components/main-section/main-section';
import './components/main-page/header/header';

import { header, createHeader } from './components/main-page/header/header';
import { footer, createFooter } from './components/main-page/footer/footer';
// import { createDetailsPage } from './components/details-page/details';
// import { createProductsSection } from './components/main-section/products-section/products-section';
// import { createPriceDualSlider } from './components/main-section/aside/dual-slider/dual-slider';
// import { createFilterSubСategories, createFilterСategories } from './components/main-section/aside/filter/filter';
// import { createAside } from './components/main-section/aside/aside';
import { productsCartBlock, summaryCartBlock } from './components/cart-page/cart-page';

const BODY = document.querySelector('.wrapper') as HTMLBodyElement;
const mainSection = document.querySelector('.main') as HTMLBodyElement;

createHeader(header);
createFooter(footer);

// mainSection?.append(createDetailsPage(3));
// mainSection.append(createProductsSection());
// mainSection.append(createPriceDualSlider());
// mainSection.append(createFilterSubСategories());
// mainSection.append(createFilterСategories());
// mainSection.append(createAside(), createProductsSection());
// createProductsSection();
mainSection.append(productsCartBlock(), summaryCartBlock());
