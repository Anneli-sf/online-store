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
import { createCartPage, createProductsList } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { productsData, IProductsData } from './components/data/data';
import { isAlreadyHave, deleteDoubleAddUnique, addDoubleDeleteUnique } from './components/helpers/helpers';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;
// mainSection.append(createProducstPage(productsData));

//---------------------------ROUTE------------------------//

const MainPage = {
    render: () => {
        return createProducstPage(productsData);
    },
};

const MainPageWithFilters = {
    render: (currentArray) => {
        return createProducstPage(currentArray);
        // console.log(`${currentArray} works`);
    },
};

const CartPage = {
    render: () => {
        mainSection.innerHTML = ``;
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

if (!localStorage.getItem('cartList')) {
    localStorage.setItem('cartList', JSON.stringify([]));
}
if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify([]));
}

//-------------------------------ROUTING
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => {
    console.log('routes', routes);
    console.log('path', path);
    return routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;
};

const router = (option) => {
    const path = parseLocation();
    console.log('path parse', path);
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    mainSection.innerHTML = ``;
    mainSection.append(component.render(option));
};

window.addEventListener('hashchange', () => router());
window.addEventListener('load', () => router());
//-------------------------------/ROUTING

//-------variables for filters
let currDataWithCategories: IProductsData[] = [];
let currDataWithSubCategories: IProductsData[] = [];
let stackArr: IProductsData[] = [];
let currentArray: IProductsData[] = []; 

// TODO   SAVE THE PAGE when RELOAD
document.addEventListener('click', (e: Event) => {
    //---------if click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const state: string = '#/product-details/' + e.target.id;
        window.history.pushState({ path: state }, '', state);

        // const link = e.target.parentElement as HTMLLinkElement;
        // link.url = `#${window.location.href.split('#')[1]}`;
        e.target.url = window.location.href;

        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage });
        console.log('routes', routes);
        router(Number(e.target.id));
    }

    //-------------------------------------------------------

    if (e.target instanceof Element && e.target.className === 'category-label') {
        console.log('e.target', e.target);
        const categoryName: string = e.target.getAttribute('for'); //sport
        console.log('categoryName', categoryName);
        const state: string = '#/category=' + categoryName; //работает без ?
        window.history.pushState({ path: state }, '', state);
        e.target.url = window.location.href;
        console.log('e.target.url', e.target.url);

        routes.push({ path: window.location.href.split('#')[1], component: MainPageWithFilters });
        console.log('routes', routes);
        const chosenCategory = productsData.filter((el) => el.categoryEng === categoryName);
        currentArray = deleteDoubleAddUnique(currentArray, chosenCategory);
        console.log('Arr для вызова', currentArray);
        router(currentArray);
    }
    //---------if click on FILTERS CATEGORY
    // if (e.target instanceof Element && e.target.className === 'category-label') {
    //     const chosenCategoryArr: IProductsData[] = productsData.filter((item) => {
    //         const element = e.target as HTMLLabelElement;
    //         if (element.children[0] !== null) return item.categoryEng === element.children[0].id;
    //     });

    //     console.log('chosenCategory', chosenCategoryArr);
    //     // if (!isAlreadyHave(, chosenCategoryArr)) {
    //     //      = .concat(chosenCategoryArr);
    //     //     localStorage.setItem('productsList', JSON.stringify());
    //     // } else {
    //     //      = deleteChosenCategory(, chosenCategoryArr);
    //     //     if (.length === 0) {
    //     //         .concat(productsData);
    //     //     }
    //     //     localStorage.setItem('productsList', JSON.stringify());
    //     // }
    //     currDataWithCategories = deleteDoubleAddUnique(currDataWithCategories, chosenCategoryArr);
    //     // localStorage.setItem('productsList', JSON.stringify());

    //     if (currDataWithCategories.length === 0) {
    //         mainSection.innerHTML = ``;
    //         mainSection.append(createProducstPage(productsData));
    //     } else {
    //         mainSection.innerHTML = ``;
    //         mainSection.append(createProducstPage(currDataWithCategories));
    //     }
    // }

    // //---------if click on FILTERS SUBCATEGORY
    // if (e.target instanceof Element && e.target.className === 'subcategory-label') {
    //     //если категории уже выбраны
    //     if (currDataWithCategories.length > 0) {
    //         const chosenSubCategoryArr: IProductsData[] = currDataWithCategories.filter((item) => {
    //             const element = e.target as HTMLLabelElement;
    //             if (element.children[0] !== null) return item.subcategoryEng === element.children[0].id;
    //         });
    //         console.log('chosenSubCategory', chosenSubCategoryArr);

    //         if (!isAlreadyHave(stackArr, chosenSubCategoryArr)) {
    //             stackArr = stackArr.concat(chosenSubCategoryArr);
    //             currDataWithSubCategories = currDataWithSubCategories.concat(stackArr);
    //             // console.log('currDataWithSubCategories', currDataWithSubCategories);
    //         } else if (isAlreadyHave(stackArr, chosenSubCategoryArr)) {
    //             stackArr = deleteDoubleAddUnique(stackArr, chosenSubCategoryArr); //удаляем кликнутое второй раз
    //             // console.log('stackArr второй клик', stackArr);
    //             if (stackArr.length === 0) {
    //                 currDataWithSubCategories = currDataWithCategories;
    //                 // console.log('currDataWithSubCategories когда стек пустой', currDataWithSubCategories);
    //             } else {
    //                 currDataWithSubCategories = addDoubleDeleteUnique(currDataWithSubCategories, stackArr);
    //             }
    //         }

    //         mainSection.innerHTML = ``;
    //         mainSection.append(createProducstPage(currDataWithSubCategories));
    //     } else if (currDataWithCategories.length === 0) {
    //         //если категории НЕ выбраны
    //         const chosenSubCategoryArr: IProductsData[] = productsData.filter((item) => {
    //             const element = e.target as HTMLLabelElement;
    //             if (element.children[0] !== null) return item.subcategoryEng === element.children[0].id;
    //         });
    //         console.log('chosenSubCategory при пустых категориях', chosenSubCategoryArr);

    //         if (!isAlreadyHave(stackArr, chosenSubCategoryArr)) {
    //             stackArr = stackArr.concat(chosenSubCategoryArr);
    //             currDataWithSubCategories = stackArr;
    //             console.log('currDataWithSubCategories при пустом стеке', currDataWithSubCategories);
    //         } else if (isAlreadyHave(stackArr, chosenSubCategoryArr)) {
    //             stackArr = deleteDoubleAddUnique(stackArr, chosenSubCategoryArr);

    //             if (stackArr.length > 0) {
    //                 currDataWithSubCategories = addDoubleDeleteUnique(currDataWithSubCategories, stackArr);
    //             } else if (stackArr.length === 0) {
    //                 currDataWithSubCategories = productsData;
    //             }
    //         }
    //         mainSection.innerHTML = ``;
    //         mainSection.append(createProducstPage(currDataWithSubCategories));
    //     }
    // }

    //-------------------BASKET
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__add')) {
        let arrayId = JSON.parse(localStorage.getItem('cartList') as string);
        let cartProductsArray = JSON.parse(localStorage.getItem('cartItems') as string);

        if (localStorage.getItem(`btn_${e.target.id}`) === 'добавлен') {
            localStorage.setItem(`btn_${e.target.id}`, 'в корзину');
        } else {
            localStorage.setItem(`btn_${e.target.id}`, 'добавлен');
        }

        if (arrayId.includes(+e.target.id)) {
            arrayId = arrayId.filter((item) => item !== +e.target?.id);
            cartProductsArray = cartProductsArray.flat().filter((item) => item.id !== +e.target?.id);
            e.target.textContent = localStorage.getItem(`btn_${e.target.id}`);
        } else {
            arrayId.push(+e.target.id);
            cartProductsArray.push(productsData[+e.target?.id]);
            e.target.textContent = localStorage.getItem(`btn_${e.target.id}`);
        }
        localStorage.setItem('cartList', JSON.stringify(arrayId));
        localStorage.setItem('cartItems', JSON.stringify(sliceIntoChunks(cartProductsArray.flat(), 3)));
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-right')) {
        localStorage.setItem('currentPage', `${+localStorage.getItem('currentPage') + 1}`);
        ++e.target.parentElement.querySelector('input').value;
        document.querySelector('.cart-list')?.innerHTML = '';
        const arr = JSON.parse(localStorage.getItem('cartItems'))[localStorage.getItem('currentPage') - 1];
        arr.forEach((item) => {
            createProductsList(item.id);
        });
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-left')) {
        localStorage.setItem('currentPage', `${+localStorage.getItem('currentPage') - 1}`);
        --e.target.parentElement.querySelector('input').value;
        document.querySelector('.cart-list')?.innerHTML = '';
        const arr = JSON.parse(localStorage.getItem('cartItems'))[localStorage.getItem('currentPage') - 1];
        arr.forEach((item) => {
            createProductsList(item.id);
        });
        console.log('left!');
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.delete-item')) {
        --e.target.parentElement.querySelector('input').value;
        localStorage.setItem(`quantityProduct_${e.target.id}`, e.target.parentElement.querySelector('input').value);
        let stock = +localStorage.getItem(`stock_${e.target.id}`);
        stock++;
        localStorage.setItem(`stock_${e.target.id}`, `${stock}`);
        document.querySelectorAll('.stock-value').forEach((item) => {
            if (item.id === e.target.id) {
                item.value++;
            }
        });
        if (localStorage.getItem(`stock_${e.target.id}`) !== '0') {
            document.querySelectorAll('.add-item').forEach((item) => {
                if (item.id === e.target.id) {
                    item.style.transform = 'scale(1)';
                }
            });
        }
        if (+localStorage.getItem(`stock_${e.target.id}`) === productsData[e.target.id].stock) {
            document.querySelectorAll('.delete-item').forEach((item) => {
                if (item.id === e.target.id) {
                    item.style.transform = 'scale(0)';
                }
            });
        }
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.add-item')) {
        ++e.target.parentElement.querySelector('input').value;
        localStorage.setItem(`quantityProduct_${e.target.id}`, e.target.parentElement.querySelector('input').value);
        let stock = +localStorage.getItem(`stock_${e.target.id}`);
        stock--;
        localStorage.setItem(`stock_${e.target.id}`, `${stock}`);
        document.querySelectorAll('.stock-value').forEach((item) => {
            if (item.id === e.target.id) {
                item.value--;
            }
        });
        if (localStorage.getItem(`stock_${e.target.id}`) === '0') {
            document.querySelectorAll('.add-item').forEach((item) => {
                if (item.id === e.target.id) {
                    item.style.transform = 'scale(0)';
                }
            });
        }
        if (+localStorage.getItem(`stock_${e.target.id}`) !== productsData[e.target.id].stock) {
            document.querySelectorAll('.delete-item').forEach((item) => {
                if (item.id === e.target.id) {
                    item.style.transform = 'scale(1)';
                }
            });
        }
    }
});

// //--------------------------------------------------------//

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
