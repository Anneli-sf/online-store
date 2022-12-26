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
import { createCartPage } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { productsData } from './components/data/data';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;

//-----------------------------IDs-------------------------//
const idArray = productsData.map((item) => item.id);
//---------------------------------------------------------//

//---------------------------ROUTE------------------------//

const MainPage = {
    render: () => {
        // mainSection.innerHTML = '';
        return createProducstPage();
    },
};

const CartPage = {
    render: () => {
        return createCartPage();
    },
};

const DetailsPage = {
    render: (id: number): HTMLDivElement => {
        mainSection.innerHTML = ``;
        return createDetailsPage(id);
    },
};

const ErrorComponent = {
    render: () => {
        mainSection.innerHTML = '';
        return (mainSection.innerHTML = 'Error');
    },
};

const routes = [
    { path: '/', component: MainPage },
    { path: '/cart', component: CartPage },
];

// idArray.forEach((item) => {
//     routes.push({ path: `#/product-details/${item}`, component: DetailsPage });
// });

// TODO   SAVE THE PAGE when RELOAD
document.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const state: string = '#/product-details/' + e.target.id;
        window.history.pushState({ path: state }, '', state);

        const link = e.target.parentElement as HTMLLinkElement;
        link.href = `#${window.location.href.split('#')[1]}`;
        // console.log('link.href', link.href);

        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage });
        console.log('routes', routes);
        router(Number(e.target.id));
    }
});

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) =>
    routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const router = (id?: number) => {
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    mainSection.innerHTML = ``;
    mainSection.append(component.render(id));
};

window.addEventListener('hashchange', () => router());
window.addEventListener('load', () => router());

//--------------------------------------------------------//
