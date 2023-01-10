import './sass/style.scss';
import './components/main-section/aside/filter/filter';
import './components/main-section/products-section/products-section';
import './components/main-section/aside/dual-slider/dual-slider';
import './components/main-section/aside/aside';
import './components/main-section/main-section';
import './components/main-page/header/header';
import './components/error-page/error-page';

import './components/modal-window-page/modal-window-page';
import './components/cart-page/cart-page-target/cart-page-target';

import { createHeader } from './components/main-page/header/header';
import { createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
import { createCartPage } from './components/cart-page/cart-page';

import {
    closePopup,
    contentBlock,
    createProductsMainList,
} from './components/main-section/products-section/products-section';
import {
    findCurrentFilters,
    stateFilters,
    setAmountToSlider,
    setPricesToSlider,
    showNotFound,
    setStylesToAvaliableCategories,
    getDataFromUrl,
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
import { changeTotalPriceWithPromoWhenAddDelItems } from './components/cart-page/cart-page';
import { createErrorPage } from './components/error-page/error-page';
import { savePageUrl } from './components/helpers/helpers';

const mainSection = document.querySelector('.main') as HTMLElement;

createHeader();
createFooter();
fillLocalStorageOnStart();

window.addEventListener('hashchange', () => {
    const arr = window.location.hash.split('/');

    router(+arr[arr.length - 1]);
});

window.addEventListener('load', () => {
    const searchParams = window.location.search;

    if (searchParams.length === 0) {
        mainSection.append(createProducstPage(productsData));
    } else {
        const currArray = getDataFromUrl(searchParams);

        if (currArray.length) {
            mainSection.append(createProducstPage(currArray));
        } else {
            mainSection.innerHTML = '';
            return mainSection.append(createErrorPage());
        }
    }
});

//---------------------------ROUTE------------------------//

const MainPage = {
    render: (array: IProductsData[] = productsData) => updateProductsSection(array), //window.history.state
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
        return createErrorPage();
    },
};

const routes = [
    // { path: '/', component: MainPage },
    { path: '#/', component: MainPage },
    { path: '/cart', component: CartPage },
    { path: '/product-details', component: DetailsPage },
];

//-------------------------------ROUTING
// const parseLocation = () => location.hash.toLowerCase() || '/';
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path: string) => {
    const namePage = path.split('/')[1];
    return routes.find((r) => r.path.includes(namePage)) || undefined;
};

const router = (option?: number | IProductsData[]) => {
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path) || {};
    mainSection.append(component.render(option as number & IProductsData[]));
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
        changeTotalPriceWithPromoWhenAddDelItems();
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.add-item')) {
        const element = e.target as HTMLInputElement;
        executeWhenAddBtnQuantityOfProduct(element);
        changeTotalPriceWithPromoWhenAddDelItems();
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-copy')) {
        const element = e.target as HTMLButtonElement;
        savePageUrl(element);
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

let result: IProductsData[];

if (localStorage.getItem('currentProducts')) {
    result = JSON.parse(localStorage.getItem('currentProducts') as string) as IProductsData[];
} else {
    result = [];
}

document.addEventListener('change', (e) => {
    const element = e.target as HTMLInputElement;

    const maxPrice = document.querySelector('#max-price') as HTMLInputElement;
    const minPrice = document.querySelector('#min-price') as HTMLInputElement;
    const maxAmount = document.querySelector('#max-amount') as HTMLInputElement;
    const minAmount = document.querySelector('#min-amount') as HTMLInputElement;

    //---------------------SEARCH
    if (element instanceof Element && element.className === 'sort__input') {
        if (result.length === 0) result = productsData;
        const stack: IProductsData[] = searchByWord(element.value, result);
        if (stack.length === 0) {
            result = result;
            showNotFound();
        } else {
            result = stack;
            closePopup();
        }
        localStorage.setItem('currentProducts', JSON.stringify(result));
        setPricesToSlider(result);
        setAmountToSlider(result);
    }

    //----------------------SLIDER PRICE
    if (element instanceof Element && element.closest('.slider-price')) {
        if (filters.currArr.length === 0) {
            result = productsData.filter((item) => item.price >= +minPrice.value && item.price <= +maxPrice.value);
            filters.currArr = result;
        } else {
            let stack: IProductsData[] = filters.currArr.filter(
                (item) => item.price >= +minPrice.value && item.price <= +maxPrice.value
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
        localStorage.setItem('currentProducts', JSON.stringify(result));
        setAmountToSlider(result);
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
        localStorage.setItem('currentProducts', JSON.stringify(result));
        setPricesToSlider(result);
    }

    //----------------------CHECKBOXES
    if (element instanceof Element && element.closest('.filter-input')) {
        result = findCurrentFilters(element, filters, minPrice.value, maxPrice.value);
        setPricesToSlider(result);
        setAmountToSlider(result);
        localStorage.setItem('currentProducts', JSON.stringify(result));
    }

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
    localStorage.setItem('currentProducts', JSON.stringify(result));

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

    //-------------------set styles of available labels
    setStylesToAvaliableCategories(currentCatStock, currentSubCatStock);

    window.addEventListener('popstate', () => {
        // console.log('W-H', window.history);
    });

    const x = window.location.href.indexOf('?')
        ? window.location.href.slice(0, window.location.href.indexOf('?'))
        : window.location.href;

    console.log('SLICE', window.location.href.slice(0, window.location.href.indexOf('?')));

    window.history.pushState(
        {},
        '',
        `${x}${stateFilters(
            categories,
            subcategories,
            minPrice.value,
            maxPrice.value,
            minAmount.value,
            maxAmount.value,
            result,
            element
        )}`
    );

    router(result);
});

//-------------------------------------------------/FILTERS
