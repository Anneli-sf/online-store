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
import { productsData, IProductsData } from './components/data/data';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;
mainSection.append(createProducstPage(productsData));

//-----------------------------IDs-------------------------//
const idArray = productsData.map((item) => item.id);
//---------------------------------------------------------//

//---------------------------ROUTE------------------------//

const MainPage = {
    render: (productsData: IProductsData[]) => {
        // mainSection.innerHTML = '';
        return createProducstPage(productsData);
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

// // TODO   SAVE THE PAGE when RELOAD
document.addEventListener('click', (e) => {
    console.log(e.target);

    //---------if click on DETAILS
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

    //---------if click on FILTERS
    if (
        e.target instanceof Element &&
        (e.target.className === 'category-checkbox' || e.target.className === 'category-input')
    ) {
        console.log(e.target.id);
        const currentDataArr: IProductsData[] = productsData.filter((item) => item.categoryEng === e.target.id);
        console.log(currentDataArr);
        mainSection.innerHTML = ``;
        mainSection.append(createProducstPage(currentDataArr));
    }
});

// const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
// const findComponentByPath = (path, routes) =>
//     routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

// const router = (id?: number) => {
//     const path = parseLocation();
//     const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

//     mainSection.innerHTML = ``;
//     mainSection.append(component.render(id));
// };

// window.addEventListener('hashchange', () => router());
// window.addEventListener('load', () => router());

// //--------------------------------------------------------//
