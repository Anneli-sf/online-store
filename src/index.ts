import './sass/style.scss';
import { header, createHeader } from './components/main-page/header/header';
import { footer, createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
import { createProductsSection } from './components/main-section/products-section/products-section';

const BODY = document.querySelector('.wrapper') as HTMLBodyElement;
const mainSection = document.querySelector('.main') as HTMLBodyElement;

// BODY.addEventListener('DOMContentLoaded', () => {
//     createHeader(header);
//     createFooter(footer);
// });

createHeader(header);
createFooter(footer);

// mainSection?.append(createDetailsPage(3));
mainSection.append(createProductsSection());
