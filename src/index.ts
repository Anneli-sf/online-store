import './sass/style.scss';
import { createDetailsPage } from './components/details-page/details';
import { header, createHeader } from './components/main-page/header/header';
import { footer, createFooter } from './components/main-page/footer/footer';

const BODY = document.querySelector('.wrapper') as HTMLBodyElement;
const mainSection = document.querySelector('.main') as HTMLBodyElement;
mainSection?.append(createDetailsPage(3));

BODY.addEventListener('load', () => {
    createHeader(header);
    // createFooter(footer);
});

createHeader(header);
createFooter(footer);
