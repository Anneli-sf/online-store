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
import { createProducstPage } from './components/main-section/main-section';
import { productsData, IProductsData } from './components/data/data';
import { isAlreadyHave, deleteDoubleAddUnique, addDoubleDeleteUnique } from './components/helpers/helpers';
import { createContainerCard } from './components/modal-window-page/modal-window-page';
import {
    fillCartPageNext,
    fillCartPagePrev,
    showHideBtnNext,
    showHideBtnPrev,
    executeWhenAddProductToCart,
    executeWhenDeleteBtnQuantityOfProduct,
    executeWhenAddBtnQuantityOfProduct,
} from './components/cart-page/cart-page-target/cart-page-target';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;
mainSection.append(createProducstPage(productsData));

interface IComponent {
    render: (id?: number) => HTMLElement;
}

interface IRoutes {
    path: string;
    component: IComponent;
}

//---------------------------ROUTE------------------------//

const MainPage = {
    render: () => {
        return createProducstPage(productsData);
    },
};

const CartPage = {
    render: () => {
        return createCartPage();
    },
};

const DetailsPage = {
    render: (id: number) => {
        return createDetailsPage(id);
    },
};

const ModalWindow = {
    render: () => {
        return createContainerCard();
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
    { path: '/modal', component: ModalWindow },
];

// idArray.forEach((item) => {
//     routes.push({ path: `#/product-details/${item}`, component: DetailsPage });
// });

if (!localStorage.getItem('cartList')) {
    localStorage.setItem('cartList', JSON.stringify([]));
}
if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify([]));
}
if (!localStorage.getItem('totalStock')) {
    localStorage.setItem('totalStock', '0');
}
if (!localStorage.getItem('totalPrice')) {
    localStorage.setItem('totalPrice', '0');
}
if (JSON.parse(localStorage.getItem('cartList') as string).length === 0) {
    localStorage.setItem('btnLeft', 'hide');
    localStorage.setItem('btnRight', 'hide');
}
if (!localStorage.getItem('size')) {
    localStorage.setItem('size', '3');
}

let currDataWithCategories: IProductsData[] = [];
let currDataWithSubCategories: IProductsData[] = [];
let stackArr: IProductsData[] = [];

// TODO   SAVE THE PAGE when RELOAD
document.addEventListener('click', (e: Event) => {
    // console.log(e);

    //---------if click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const state: string = '#/product-details/' + e.target.id;
        window.history.pushState({ path: state }, '', state);

        const link = e.target.parentElement as HTMLLinkElement;
        link.href = `#${window.location.href.split('#')[1]}`;
        // console.log('link.href', link.href);

        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage as IComponent });
        console.log('routes', routes);
        // router(Number(e.target.id));
    }

    //---------if click on FILTERS CATEGORY
    if (e.target instanceof Element && e.target.className === 'category-label') {
        //e.target.classList[0] === 'category-label'
        // if (e.target.tagName == 'LABEL') {
        //     e.target.classList.add('checked');
        // } else {
        //     e.target.classList.add('checked');
        // }//--------ничего не добавляет

        const chosenCategoryArr: IProductsData[] = productsData.filter((item) => {
            const element = e.target as HTMLLabelElement;
            if (element.children[0] !== null) return item.categoryEng === element.children[0].id;
        });

        console.log('chosenCategory', chosenCategoryArr);
        // if (!isAlreadyHave(, chosenCategoryArr)) {
        //      = .concat(chosenCategoryArr);
        //     localStorage.setItem('productsList', JSON.stringify());
        // } else {
        //      = deleteChosenCategory(, chosenCategoryArr);
        //     if (.length === 0) {
        //         .concat(productsData);
        //     }
        //     localStorage.setItem('productsList', JSON.stringify());
        // }

        currDataWithCategories = deleteDoubleAddUnique(currDataWithCategories, chosenCategoryArr);
        // localStorage.setItem('productsList', JSON.stringify());

        if (currDataWithCategories.length === 0) {
            mainSection.innerHTML = ``;
            mainSection.append(createProducstPage(productsData));
        } else {
            mainSection.innerHTML = ``;
            mainSection.append(createProducstPage(currDataWithCategories));
        }
    }

    //---------if click on FILTERS SUBCATEGORY
    if (e.target instanceof Element && e.target.className === 'subcategory-label') {
        //если категории уже выбраны
        if (currDataWithCategories.length > 0) {
            const chosenSubCategoryArr: IProductsData[] = currDataWithCategories.filter((item) => {
                const element = e.target as HTMLLabelElement;
                if (element.children[0] !== null) return item.subcategoryEng === element.children[0].id;
            });
            console.log('chosenSubCategory', chosenSubCategoryArr);

            if (!isAlreadyHave(stackArr, chosenSubCategoryArr)) {
                stackArr = stackArr.concat(chosenSubCategoryArr);
                currDataWithSubCategories = currDataWithSubCategories.concat(stackArr);
                // console.log('currDataWithSubCategories', currDataWithSubCategories);
            } else if (isAlreadyHave(stackArr, chosenSubCategoryArr)) {
                stackArr = deleteDoubleAddUnique(stackArr, chosenSubCategoryArr); //удаляем кликнутое второй раз
                // console.log('stackArr второй клик', stackArr);
                if (stackArr.length === 0) {
                    currDataWithSubCategories = currDataWithCategories;
                    // console.log('currDataWithSubCategories когда стек пустой', currDataWithSubCategories);
                } else {
                    currDataWithSubCategories = addDoubleDeleteUnique(currDataWithSubCategories, stackArr);
                }
            }

            mainSection.innerHTML = ``;
            mainSection.append(createProducstPage(currDataWithSubCategories));
        } else if (currDataWithCategories.length === 0) {
            //если категории НЕ выбраны
            const chosenSubCategoryArr: IProductsData[] = productsData.filter((item) => {
                const element = e.target as HTMLLabelElement;
                if (element.children[0] !== null) return item.subcategoryEng === element.children[0].id;
            });
            console.log('chosenSubCategory при пустых категориях', chosenSubCategoryArr);

            if (!isAlreadyHave(stackArr, chosenSubCategoryArr)) {
                stackArr = stackArr.concat(chosenSubCategoryArr);
                currDataWithSubCategories = stackArr;
                console.log('currDataWithSubCategories при пустом стеке', currDataWithSubCategories);
            } else if (isAlreadyHave(stackArr, chosenSubCategoryArr)) {
                stackArr = deleteDoubleAddUnique(stackArr, chosenSubCategoryArr);

                if (stackArr.length > 0) {
                    currDataWithSubCategories = addDoubleDeleteUnique(currDataWithSubCategories, stackArr);
                } else if (stackArr.length === 0) {
                    currDataWithSubCategories = productsData;
                }
            }
            mainSection.innerHTML = ``;
            mainSection.append(createProducstPage(currDataWithSubCategories));
        }
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
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.add-item')) {
        const element = e.target as HTMLInputElement;
        executeWhenAddBtnQuantityOfProduct(element);
    }
});

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path: string, routes: IRoutes[]) =>
    routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const router = (id?: number) => {
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    mainSection.innerHTML = ``;
    mainSection.append(component.render(id));
};

window.addEventListener('hashchange', () => router());
window.addEventListener('load', () => router());

// //--------------------------------------------------------//
