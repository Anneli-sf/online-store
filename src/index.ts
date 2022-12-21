import './sass/style.scss';
import { header, createHeader } from './components/main-page/header/header';
import { footer, createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
import { createProductsSection } from './components/main-section/products-section/products-section';
import { createPriceDualSlider } from './components/main-section/aside/dual-slider/dual-slider';
import { createFilterSubСategories, createFilterСategories } from './components/main-section/aside/filter/filter';
import { createAside } from './components/main-section/aside/aside';

const BODY = document.querySelector('.wrapper') as HTMLBodyElement;
const mainSection = document.querySelector('.main') as HTMLBodyElement;

// BODY.addEventListener('DOMContentLoaded', () => {
//     createHeader(header);
//     createFooter(footer);
// });

createHeader(header);
createFooter(footer);

// mainSection?.append(createDetailsPage(3));
// mainSection.append(createProductsSection());
// mainSection.append(createPriceDualSlider());
// mainSection.append(createFilterSubСategories());
// mainSection.append(createFilterСategories());
mainSection.append(createAside(), createProductsSection());

