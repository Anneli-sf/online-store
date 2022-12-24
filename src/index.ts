import './sass/style.scss';
import './components/main-section/aside/filter/filter';
import './components/main-section/products-section/products-section';
import './components/main-section/aside/dual-slider/dual-slider';
import './components/main-section/aside/aside';
import './components/main-section/main-section';
import './components/main-page/header/header';
import './components/modal-window-page/modal-window-page';

import { header, createHeader } from './components/main-page/header/header';
import { footer, createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
// import { createProductsSection } from './components/main-section/products-section/products-section';
import { createPriceDualSlider } from './components/main-section/aside/dual-slider/dual-slider';
import { createFilterSubСategories, createFilterСategories } from './components/main-section/aside/filter/filter';
// import { createAside } from './components/main-section/aside/aside';
import { createCartPage } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { createContainerCard } from './components/modal-window-page/modal-window-page';
import { createDetailsBlock } from './components/details-page/product-details/product-details';

createHeader(header);
createFooter(footer);
// createProducstPage();

const mainSection = document.querySelector('.main') as HTMLElement;

// mainSection?.append(createDetailsPage(3));
// mainSection.append(createProductsSection());
// mainSection.append(createPriceDualSlider());
// mainSection.append(createFilterSubСategories());
// mainSection.append(createFilterСategories());
// mainSection.append(createProducstPage());
// createProductsSection();
// mainSection.append(createContainerCard());

const HomePage = {
    render: () => {
        mainSection.innerHTML = ``;
        return mainSection.append(createProducstPage());
    },
};

const CartPage = {
    render: () => {
        mainSection.innerHTML = ``;
        return createCartPage();
    },
};

const DetailsPage = {
    render: () => {
        mainSection.innerHTML = ``;
        return createDetailsPage(2);
    },
};

const routes = [
    { path: '/', component: HomePage },
    { path: '/cart', component: CartPage },
    { path: '/details', component: DetailsPage },
];

const ErrorComponent = {
    render: () => {
        mainSection.innerHTML = ``;
        return `
        <section>
          <h1>Error</h1>
        </section>
      `;
    },
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) =>
    routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    //Get the current path
    const path = parseLocation();
    //If there's no matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    //Render the component in the "app" placeholder
    mainSection.append(component.render());
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
window.addEventListener('click', (e) => console.log(e.target));