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
import { createCartPage, createProductsList, fillCartPages, sliceIntoChunks } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { productsData, IProductsData } from './components/data/data';
import {
    isAlreadyHave,
    deleteDoubleAddUnique,
    addDoubleDeleteUnique,
    sortByASC,
    sortByDESC,
    sortByPriceInc,
    sortByPriceDecr,
} from './components/helpers/helpers';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;
// mainSection.append(createProducstPage(productsData));
const appendToMainSection = (arr: IProductsData[]): void => {
    mainSection.innerHTML = ``;
    mainSection.append(createProducstPage(arr));
};
//---------------------------ROUTE------------------------//

const MainPage = {
    render: (array = productsData) => {
        return createProducstPage(array);
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
        mainSection.innerHTML = '';
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

const router = (option?) => {
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
if (!localStorage.getItem('totalStock')) {
    localStorage.setItem('totalStock', '0');
}
if (!localStorage.getItem('totalPrice')) {
    localStorage.setItem('totalPrice', '0');
}
if (JSON.parse(localStorage.getItem('cartList')).length === 0) {
    localStorage.setItem('btnLeft', 'hide');
    localStorage.setItem('btnRight', 'hide');
}
if (!localStorage.getItem('size')) {
    localStorage.setItem('size', '3');
}

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
        // console.log('routes', routes);
        router(Number(e.target.id));
    }

    //-------------------------------------------------------

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
        localStorage.setItem(
            'cartItems',
            JSON.stringify(sliceIntoChunks(cartProductsArray.flat(), +localStorage.getItem('size')))
        );

        if (localStorage.getItem(`btn_${e.target.id}`) === 'в корзину') {
            localStorage.setItem(
                'totalPrice',
                `${+localStorage.getItem('totalPrice') - productsData[e.target.id].price}`
            );
            localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') - 2));
        } else if (localStorage.getItem(`btn_${e.target.id}`) === 'добавлен') {
            localStorage.setItem(
                'totalPrice',
                `${+localStorage.getItem('totalPrice') + productsData[e.target.id].price}`
            );
            localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock')));
        }

        if (JSON.parse(localStorage.getItem('cartList')).length > +localStorage.getItem('size')) {
            localStorage.setItem('btnRight', 'show');
        } else {
            localStorage.setItem('btnRight', 'hide');
        }
        if (
            JSON.parse(localStorage.getItem('cartList')).length < +localStorage.getItem('size') ||
            localStorage.getItem('currentPage') === '1'
        ) {
            localStorage.setItem('btnLeft', 'hide');
        } else {
            localStorage.setItem('btnLeft', 'show');
        }

        if (localStorage.getItem(`quantityProduct_${e.target.id}`) === '0') {
            localStorage.setItem(`quantityProduct_${e.target.id}`, '1');
            localStorage.setItem(`price_${e.target.id}`, `${productsData[e.target.id].price}`);
        }
        localStorage.setItem(`stock_${e.target.id}`, `${productsData[e.target.id].stock - 1}`);

        localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') + 1));
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-right')) {
        localStorage.setItem('currentPage', `${+localStorage.getItem('currentPage') + 1}`);
        ++e.target.parentElement.querySelector('input').value;
        document.querySelector('.cart-list')?.innerHTML = '';
        const arr = JSON.parse(localStorage.getItem('cartItems'))[localStorage.getItem('currentPage') - 1];
        arr.forEach((item) => {
            createProductsList(item.id);
        });
        if (+localStorage.getItem('currentPage') === JSON.parse(localStorage.getItem('cartItems')).length) {
            e.target.style.transform = 'scale(0)';
            localStorage.setItem('btnRight', 'hide');
        } else {
            localStorage.setItem('btnRight', 'show');
        }
        localStorage.setItem('btnLeft', 'show');
        document.querySelector('.btn-switch-page-left').style.transform = 'scale(1)';
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-left')) {
        localStorage.setItem('currentPage', `${+localStorage.getItem('currentPage') - 1}`);
        --e.target.parentElement.querySelector('input').value;
        const arr = JSON.parse(localStorage.getItem('cartItems'))[localStorage.getItem('currentPage') - 1];
        document.querySelector('.cart-list').innerHTML = '';
        arr.forEach((item) => {
            createProductsList(item.id);
        });
        if (+localStorage.getItem('currentPage') === 1) {
            e.target.style.transform = 'scale(0)';
            localStorage.setItem('btnLeft', 'hide');
        } else {
            localStorage.setItem('btnLeft', 'show');
        }
        localStorage.setItem('btnRight', 'show');
        document.querySelector('.btn-switch-page-right').style.transform = 'scale(1)';
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
        localStorage.setItem(
            `price_${e.target.id}`,
            String(+localStorage.getItem(`price_${e.target.id}`) - productsData[e.target.id].price)
        );
        document.querySelectorAll('.total-price').forEach((item) => {
            if (item.id === e.target.id) {
                item.value = +localStorage.getItem(`price_${e.target.id}`);
            }
        });
        localStorage.setItem(
            'totalPrice',
            String(+localStorage.getItem('totalPrice') - productsData[e.target.id].price)
        );
        document.querySelector('.total-sum-value').value = localStorage.getItem('totalPrice');

        if (!localStorage.getItem('totalStock')) {
            localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
            localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') - 1));
        } else {
            localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') - 1));
        }
        document.querySelector('.quantity-products-value').value--;

        if (localStorage.getItem(`quantityProduct_${e.target.id}`) === '0') {
            const arr1 = JSON.parse(localStorage.getItem('cartList')).filter((item) => +item !== +e.target.id);
            const arr2 = JSON.parse(localStorage.getItem('cartItems'))
                .flat()
                .filter((item) => +item.id !== +e.target.id);
            localStorage.setItem('cartList', JSON.stringify(arr1));
            localStorage.setItem(
                'cartItems',
                JSON.stringify(sliceIntoChunks(arr2.flat(), +localStorage.getItem('size')))
            );
            localStorage.setItem(`btn_${e.target.id}`, 'в корзину');
            document.querySelector('.cart-list').innerHTML = '';
            const arr3 = fillCartPages(+localStorage.getItem('size'));
            arr3.forEach((item) => {
                createProductsList(item);
            });
            document.querySelector('input.quantity').value = JSON.parse(
                localStorage.getItem('cartList') as string
            ).length;
            // localStorage.setItem(`quantityProduct_${e.target.id}`, '1');
            // localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') - 1));
        }
        if (JSON.parse(localStorage.getItem('cartList') as string).length <= +localStorage.getItem('size')) {
            localStorage.setItem('btnRight', 'hide');
            document.querySelector('.btn-switch-page-right').style.transform = 'scale(0)';
        }
        document.querySelector('.total-quantity-header')?.textContent = localStorage.getItem('totalPrice');
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
        localStorage.setItem(
            `price_${e.target.id}`,
            String(+localStorage.getItem(`price_${e.target.id}`) + productsData[e.target.id].price)
        );
        document.querySelectorAll('.total-price').forEach((item) => {
            if (item.id === e.target.id) {
                item.value = +localStorage.getItem(`price_${e.target.id}`);
            }
        });
        if (localStorage.getItem('totalPrice')) {
            localStorage.setItem(
                'totalPrice',
                String(+localStorage.getItem('totalPrice') + productsData[e.target.id].price)
            );
        } else {
            localStorage.setItem(
                'totalPrice',
                String(+localStorage.getItem('totalPrice') + productsData[e.target.id].price * 2)
            );
        }
        document.querySelector('.total-sum-value').value = localStorage.getItem('totalPrice');

        if (!localStorage.getItem('totalStock')) {
            localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
            localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') + 1));
        } else {
            localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') + 1));
        }
        document.querySelector('.quantity-products-value').value++;
    }

    //-------------/BASKET
    // console.log(e.target);
    if (e.target instanceof Element && e.target.classList.contains('sort__item')) {
        const sortList = document.querySelectorAll('.sort__item');
        let currArr = [];
        console.log(sortList[0]);
        switch (e.target) {
            case sortList[0]:
                currArr = sortByASC(productsData);
                break;
            case sortList[1]:
                currArr = sortByDESC(productsData);
            case sortList[4]:
                currArr = sortByPriceInc(productsData);
            case sortList[3]:
                currArr = sortByPriceDecr(productsData);
        }
        console.log(currArr);
        appendToMainSection(currArr);
    }
    document.querySelector('.total-quantity-header')?.textContent = localStorage.getItem('totalPrice');
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

const aside = document.querySelector('.main-aside') as HTMLDivElement;
aside?.addEventListener('change', (e) => {
    if (e.target instanceof Element && e.target.className === 'category-label') {
        // currentArray = [];
        console.log('e.target', e.target);
        const categoryName: string = e.target.getAttribute('for'); //sport
        // console.log('categoryName', categoryName);
        // console.log('window.location.href', window.location.href);

        let state;
        const chosenCategory = productsData.filter((el) => el.categoryEng === categoryName);
        currentArray = deleteDoubleAddUnique(currentArray, chosenCategory);

        console.log('Arr для вызова', currentArray);

        window.location.href.includes('category=')
            ? (state = window.location.href + '↕' + categoryName)
            : (state = window.location.href + '?category=' + categoryName);

        if (window.location.href.includes(categoryName)) {
            state = window.location.href.split(categoryName).join('');
        }

        if (currentArray.length === 0) {
            state = window.location.href.split('?')[0];
            console.log('state', state);
            // currentArray = productsData.slice();
            router(productsData);
        } else router(currentArray);

        e.target.url = state;
        window.history.pushState({ path: e.target.url }, '', e.target.url);
        console.log('e.target.url', e.target.url);
        // console.log('window.location.hash', window.location.hash);

        routes.push({ path: '/', component: MainPage });
        console.log('routes', routes);

        // router(currentArray);
    }

    if (e.target instanceof Element && e.target.className === 'subcategory-label') {
        console.log('currentArray', currentArray);
        e.target.classList.toggle('checked');
        const subcategoryName: string = e.target.getAttribute('for'); //sport
        // console.log('categoryName', categoryName);
        // console.log('window.location.href', window.location.href);

        let state;
        const chosensubCategory = currentArray.filter((el) => el.subcategoryEng === subcategoryName);

        if (currentArray.length === 0) {
            const chosensubCategory = productsData.filter((el) => el.subcategoryEng === subcategoryName);
            currentArray = deleteDoubleAddUnique(currentArray, chosensubCategory);
        } else {
            const chosensubCategory = currentArray.filter((el) => el.subcategoryEng === subcategoryName);
            currentArray = deleteDoubleAddUnique(currentArray, chosensubCategory);
        }

        console.log('Arr для вызова', currentArray);

        window.location.href.includes('subcategory=')
            ? (state = window.location.href + '↕' + subcategoryName)
            : (state = window.location.href + '?subcategory=' + subcategoryName);

        if (window.location.href.includes(subcategoryName)) {
            state = window.location.href.split(subcategoryName).join('');
        }

        if (currentArray.length === 0) {
            state = window.location.href.split('?')[0];
            console.log('state', state);
            currentArray = productsData.slice();
        }

        e.target.url = state;
        window.history.pushState({ path: e.target.url }, '', e.target.url);
        console.log('e.target.url', e.target.url);
        // console.log('window.location.hash', window.location.hash);

        routes.push({ path: '/', component: MainPage });
        console.log('routes', routes);

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
});
