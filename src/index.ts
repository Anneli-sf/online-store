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
import { createCartPage, createProductsList } from './components/cart-page/cart-page';
import { createProductsSection } from './components/main-section/products-section/products-section';

import {
    closePopup,
    contentBlock,
    createProductsMainList,
    popup,
    sortSpan,
} from './components/main-section/products-section/products-section';
import {
    findCurrentFilters,
    stateFilters,
    setAmountToSlider,
    setPricesToSlider,
    showNotFound,
} from './components/main-section/main-section-index';
import { createProducstPage, productsWrapper } from './components/main-section/main-section';
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
import { IProductsData, IComponent, IStock, IFilters } from './components/global-components/interfaces';
import { keepViewStyle } from './components/main-section/products-section/item-card/item-card';
import { searchByWord } from './components/main-section/main-section-index';
import { getMaxAmount, getMaxPrice, getMinAmount, getMinPrice } from './components/helpers/helpers';
import { isTSEnumMember } from '@babel/types';

createHeader();
createFooter();
fillLocalStorageOnStart();

window.addEventListener('hashchange', () => {
    const arr = window.location.hash.split('/');

    router(+arr[arr.length - 1]);
});
// window.addEventListener('load', () => router());
window.addEventListener('load', () => {
    const searchParams = window.location.search;
    console.log(JSON.stringify(searchParams));
    console.log('result', result);
    // searchParams.length === 0 ? mainSection.append(createProducstPage(productsData))
    // :
    mainSection.append(createProducstPage(productsData));
});

const mainSection = document.querySelector('.main') as HTMLElement;

// mainSection.append(createProducstPage(productsData));

//---------------------------ROUTE------------------------//

const MainPage = {
    render: (array: IProductsData[] = productsData) => updateProductsSection(array),
};

function updateProductsSection(array: IProductsData[]): HTMLDivElement {
    const productsList = document.querySelector('.products__list') as HTMLUListElement;
    if (productsList) productsList.remove();
    contentBlock.append(createProductsMainList(array));

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
        console.log('id', id);
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
    { path: '/product-details', component: DetailsPage },
];

//-------------------------------ROUTING
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path: string) => {
    // console.log('routes', routes);
    // console.log('path', path);
    const namePage = path.split('/')[1];
    // console.log('path.split', path.split('/')[1]);
    // console.log(routes.map((item) => item.path.match(/`^\\${path}$`/)));
    // console.log(routes.map((item) => item.path.includes(namePage)));
    return routes.find((r) => r.path.includes(namePage)) || undefined;
    // return routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;
};

const router = (option?: number | IProductsData[]) => {
    // console.log('option', option);
    const path = parseLocation();
    // console.log('path parse', path);
    const { component = ErrorComponent } = findComponentByPath(path) || {};
    // console.log('find', findComponentByPath(path));

    // mainSection.innerHTML = ``;
    mainSection.append(component.render(option as number & IProductsData[]));
    // mainSection.append(component.render());
};

//-------------------------------/ROUTING

document.addEventListener('click', (e: Event) => {
    //---------click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const element = e.target as HTMLButtonElement;
        const state: string = '#/product-details/' + element.id;
        window.history.pushState({ path: state }, '', state);
        element.setAttribute('url', window.location.href);
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

    const maxPrice = document.querySelector('#max-price') as HTMLInputElement;
    const minPrice = document.querySelector('#min-price') as HTMLInputElement;
    const maxAmount = document.querySelector('#max-amount') as HTMLInputElement;
    const minAmount = document.querySelector('#min-amount') as HTMLInputElement;

    //---------------------SEARCH
    if (element instanceof Element && element.className === 'sort__input') {
        // console.log('result', result);
        // console.log('element.value', element.value);
        if (result.length === 0) result = productsData;
        const stack: IProductsData[] = searchByWord(element.value, result);
        if (stack.length === 0) {
            result = result;
            showNotFound();
        } else {
            result = stack;
            closePopup();
        }
        // console.log('result', result);
        setPricesToSlider(result);
        setAmountToSlider(result);
    }

    //----------------------SLIDER PRICE
    if (element instanceof Element && element.closest('.slider-price')) {
        if (filters.currArr.length === 0) {
            // console.log('filters.currArr', filters.currArr);
            result = productsData.filter((item) => item.price >= +minPrice.value && item.price <= +maxPrice.value);
            filters.currArr = result;
        } else {
            // console.log('filters.currArr', filters.currArr);
            let stack: IProductsData[] = filters.currArr.filter(
                (item) => item.price >= +minPrice.value && item.price <= +maxPrice.value
            );
            if (stack.length === 0) {
                result = filters.currArr; //result;
                showNotFound();
            } else {
                result = stack;
                closePopup();
                stack = [];
            }
            // console.log('stack', stack);
        }
        setAmountToSlider(result);
        // minAmount.value = `${getMinAmount(result)}`;
        // maxAmount.value = `${getMaxAmount(result)}`;
    }

    //----------------------SLIDER AMOUNT
    if (element instanceof Element && element.closest('.slider-amount')) {
        if (filters.currArr.length === 0) {
            result = productsData.filter((item) => item.stock >= +minAmount.value && item.price <= +maxAmount.value);
            console.log('categories', filters.categories);
            console.log('subcategories', filters.subcategories);
        } else {
            let stack: IProductsData[] = filters.currArr.filter(
                (item) => item.stock >= +minAmount.value && item.price <= +maxAmount.value
            );
            if (stack.length === 0) {
                result = filters.currArr;
                showNotFound();
            } else {
                result = stack;
                closePopup();
                stack = [];
            }
        }
        setPricesToSlider(result);
        // minPrice.value = `${getMinPrice(result)}`;
        // maxPrice.value = `${getMaxPrice(result)}`;
    }

    //----------------------CHECKBOXES
    if (element instanceof Element && element.closest('.filter-input')) {
        // const result: IProductsData[] = findCurrentFilters(element);
        result = findCurrentFilters(element, filters, minPrice.value, maxPrice.value);
        setPricesToSlider(result);
        setAmountToSlider(result);
    }
    // console.log('result', result);

    //-----------------get unic names of categories/ subcategories
    const categories: string[] = unicCategories(result);
    const subcategories: string[] = unicSubcategories(result);

    //-------------------set chosen amount of goods
    const currentCatStock: IStock = {};
    const currentSubCatStock: IStock = {};

    result.forEach((item) => {
        if (Object.keys(currentCatStock).includes(item.categoryEng)) {
            currentCatStock[item.categoryEng] = (currentCatStock[item.categoryEng] || 0) + 1;
        } else currentCatStock[item.categoryEng] = 1;

        if (Object.keys(currentSubCatStock).includes(item.subcategoryEng)) {
            currentSubCatStock[item.subcategoryEng] = (currentSubCatStock[item.subcategoryEng] || 0) + 1;
        } else currentSubCatStock[item.subcategoryEng] = 1;
    });

    // console.log('currentCatStock', 'currentSubCatStock', currentCatStock, currentSubCatStock);

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
    // element.url = stateFilters(categories, subcategories, result);
    window.history.pushState(
        {},
        '',
        `${window.location.href}${stateFilters(
            categories,
            subcategories,
            minPrice.value,
            maxPrice.value,
            minAmount.value,
            maxAmount.value,
            result,
            element
        )}
        }`
    );
    // routes.push({ path: '/', component: MainPage });
    router(result);
});

//-------------------------------------------------/FILTERS
