import './sass/style.scss';
import './components/main-section/aside/filter/filter';
import './components/main-section/products-section/products-section';
import './components/main-section/aside/dual-slider/dual-slider';
import './components/main-section/aside/aside';
import './components/main-section/main-section';
import './components/main-page/header/header';

import './components/modal-window-page/modal-window-page';
import './components/cart-page/cart-page-target/cart-page-target';

import { createHeader } from './components/main-page/header/header';
import { createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
import { createCartPage } from './components/cart-page/cart-page';

import { createProductsSection } from './components/main-section/products-section/products-section';

import {
    createProducstPage,
    productsWrapper,
    findCurrentFilters,
    stateFilters,
    setPricesToSlider,
    setAmountToSlider,
    showNotFound,
} from './components/main-section/main-section';
import { productsData } from './components/data/data';
import { unicCategories, unicSubcategories, fillLocalStorageOnStart } from './components/helpers/helpers';
import {
    fillCartPageNext,
    fillCartPagePrev,
    showHideBtnNext,
    showHideBtnPrev,
    executeWhenAddProductToCart,
    executeWhenDeleteBtnQuantityOfProduct,
    executeWhenAddBtnQuantityOfProduct,
} from './components/cart-page/cart-page-target/cart-page-target';
import { IProductsData, IComponent, IRoutes, IStock, IFilters } from './components/global-components/interfaces';
import { keepViewStyle } from './components/main-section/products-section/item-card/item-card';

createHeader();
createFooter();
fillLocalStorageOnStart();

window.addEventListener('hashchange', () => router());
// window.addEventListener('load', () => router());
window.addEventListener('load', () => {
    mainSection.append(createProducstPage(productsData));
});

const mainSection = document.querySelector('.main') as HTMLElement;

// mainSection.append(createProducstPage(productsData));

//---------------------------ROUTE------------------------//

const MainPage = {
    render: (array = productsData) => updateProductsSection(array),
};

function updateProductsSection(array: IProductsData[]): HTMLDivElement {
    const contentBlock = document.querySelector('.products') as HTMLElement;

    contentBlock.remove();
    productsWrapper.append(createProductsSection(array));

    keepViewStyle();

    return productsWrapper;
}

const CartPage = {
    render: () => {
        mainSection.innerHTML = '';
        return createCartPage();
    },
};

const DetailsPage = {
    render: (id: number) => {
        mainSection.innerHTML = '';
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

//-------------------------------ROUTING
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path: string, routes: IRoutes[]) => {
    // console.log('routes', routes);
    // console.log('path', path);
    return routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;
};

const router = (option?: number | IProductsData[]) => {
    const path = parseLocation();
    // console.log('path parse', path);
    const { component = ErrorComponent } = findComponentByPath(path, routes as IRoutes[]) || {};

    // mainSection.innerHTML = ``;
    mainSection.append(component.render(option as number));
};

//-------------------------------/ROUTING

document.addEventListener('click', (e: Event) => {
    //---------click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const element = e.target as HTMLButtonElement;
        const state: string = '#/product-details/' + element.id;
        window.history.pushState({ path: state }, '', state);
        element.url = window.location.href;
        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage as IComponent });
        router(Number(element.id));
    }
    //---------/click on DETAILS----------

    //-------------------BASKET

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__add')) {
        const element = e.target as HTMLInputElement;
        executeWhenAddProductToCart(element);
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-right')) {
        const element = e.target as HTMLInputElement;
        fillCartPageNext(element);
        showHideBtnNext(element);
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-left')) {
        const element = e.target as HTMLElement;
        fillCartPagePrev(element);
        showHideBtnPrev(element);
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.delete-item')) {
        const element = e.target as HTMLInputElement;
        executeWhenDeleteBtnQuantityOfProduct(element, mainSection as HTMLDivElement);
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.add-item')) {
        const element = e.target as HTMLInputElement;
        executeWhenAddBtnQuantityOfProduct(element);
    }
});

//-------------------------------------------------FILTERS

const filters: IFilters = {
    categories: [],
    subcategories: [],
    currArr: [],
    price: [],
    stack: [],
};

let result: IProductsData[] = [];

document.addEventListener('change', (e) => {
    const element = e.target as HTMLInputElement;
    // console.log('element', element);
    // let result: IProductsData[] = [];
    if (element instanceof Element && element.closest('.filter-input')) {
        // const result: IProductsData[] = findCurrentFilters(element);
        result = findCurrentFilters(element, filters);
        setPricesToSlider(result);
        setAmountToSlider(result);
    }
    console.log('result', result);
    if (element instanceof Element && element.closest('.slider-price')) {
        const max = document.querySelector('#max-price') as HTMLInputElement;
        const min = document.querySelector('#min-price') as HTMLInputElement;
        // console.log('max, min', max.value, min.value);
        if (filters.currArr.length === 0) {
            result = productsData.filter((item) => item.price >= +min.value && item.price <= +max.value);
        } else {
            const stack: IProductsData[] = result.filter(
                (item) => item.price >= +min.value && item.price <= +max.value
            );
            if (stack.length === 0) {
                result = result;
                showNotFound();
            } else result = stack;
        }
    }

    if (element instanceof Element && element.closest('.slider-amount')) {
        const max = document.querySelector('#max-amount') as HTMLInputElement;
        const min = document.querySelector('#min-amount') as HTMLInputElement;
        // console.log('max, min', max.value, min.value);
        if (filters.currArr.length === 0) {
            result = productsData.filter((item) => item.stock >= +min.value && item.price <= +max.value);
        } else {
            const stack: IProductsData[] = result.filter(
                (item) => item.stock >= +min.value && item.price <= +max.value
            );
            if (stack.length === 0) {
                result = result;
                showNotFound();
            } else result = stack;
        }
    }

    // console.log('result', result);

    //-----------------get unic names of categories/ subcategories
    const categories: string[] = unicCategories(result);
    const subcategories: string[] = unicSubcategories(result);
    // console.log(categories);
    // console.log(subcategories);

    //-------------------set chosen amount of goods
    const currentCatStock: IStock = {};
    const currentSubCatStock: IStock = {};
    result.forEach((item) => {
        if (Object.keys(currentCatStock).includes(item.categoryEng)) {
            currentCatStock[item.categoryEng] = currentCatStock[item.categoryEng] + item.stock;
        } else currentCatStock[item.categoryEng] = item.stock;

        if (Object.keys(currentSubCatStock).includes(item.subcategoryEng)) {
            currentSubCatStock[item.subcategoryEng] = currentSubCatStock[item.subcategoryEng] + item.stock;
        } else currentSubCatStock[item.subcategoryEng] = item.stock;
    });

    // console.log('currentCatStock', currentCatStock);

    const currentAmounts = [...document.querySelectorAll('.amount-input-current')] as HTMLInputElement[];
    currentAmounts.forEach((input: HTMLInputElement) => {
        if (Object.keys(currentCatStock).includes(input.id)) {
            input.value = `${currentCatStock[input.id]}`;
        } else if (Object.keys(currentSubCatStock).includes(input.id)) {
            input.value = `${currentSubCatStock[input.id]}`;
        } else {
            input.value = '0';
        }
    });

    // console.log('currentAmounts', currentAmounts);

    //-------------------set styles of available labels
    const currentLabels = [...document.querySelectorAll('.filter-label')] as HTMLLabelElement[];
    currentLabels.forEach((label: HTMLLabelElement) => {
        const attrFor = label.getAttribute('for') as string;
        if (Object.keys(currentCatStock).includes(attrFor) || Object.keys(currentSubCatStock).includes(attrFor)) {
            label.style.opacity = '1';
        } else {
            label.style.opacity = '0.6';
        }
    });

    //--------------------------set prices and stock  to slider
    // setPricesToSlider(result);
    element.url = stateFilters(categories, subcategories, result);
    window.history.pushState({ path: element.url }, '', element.url);
    routes.push({ path: '/', component: MainPage });
    router(result);
    // setAmountToSlider(result);
    // }
});

//-------------------------------------------------/FILTERS
