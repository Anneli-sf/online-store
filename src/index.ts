import './sass/style.scss';
import './components/main-section/aside/filter/filter';
import './components/main-section/products-section/products-section';
import './components/main-section/aside/dual-slider/dual-slider';
import './components/main-section/aside/aside';
import './components/main-section/main-section';
import './components/main-page/header/header';
import './components/modal-window-page/modal-window-page';

import { createHeader } from './components/main-page/header/header';
import { createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
// import { createProductsSection } from './components/main-section/products-section/products-section';
import { createPriceDualSlider } from './components/main-section/aside/dual-slider/dual-slider';
import { createFilterSubСategories, createFilterСategories } from './components/main-section/aside/filter/filter';
// import { createAside } from './components/main-section/aside/aside';
import { createCartPage } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { productsCartBlock } from './components/cart-page/cart-page';

import { productsData } from './components/data/data';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;

// mainSection?.append(createDetailsPage(3));
// mainSection.append(createProductsSection());
// mainSection.append(createPriceDualSlider());
// mainSection.append(createFilterSubСategories());
// mainSection.append(createFilterСategories());
// mainSection.append(createProducstPage());
// createProductsSection();

//-----------------------------IDs-------------------------//
const idArray = productsData.map((item) => item.id);
//---------------------------------------------------------//

//---------------------------ROUTE------------------------//

const MainPage = {
    render: () => {
        mainSection.innerHTML = '';
        mainSection.append(createProducstPage());
    },
};

const Cart = {
    render: () => {
        mainSection.innerHTML = '';
        mainSection.append(productsCartBlock());
    },
};

const Details = {
    render: () => {
        mainSection.addEventListener('click', (e: Event) => {
            if (e.target.closest('.btn__details')) {
                const id = +e.target.id;
                mainSection.innerHTML = '';
                mainSection.append(createDetailsPage(id));
            }
        });
    },
};

const ErrorComponent = {
    render: () => {
        mainSection.innerHTML = '';
        mainSection.innerHTML = 'Error';
    },
};

const routes = [
    { path: '/', component: MainPage },
    { path: '/cart', component: Cart },
];

for (let i = 0; i < 40; i++) {
    routes.push({ path: `/details${i}`, component: Details });
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) =>
    routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const router = () => {
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

//--------------------------------------------------------//
