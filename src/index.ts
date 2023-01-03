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
    unicCategories,
    unicSubcategories,
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

// TODO   SAVE THE PAGE when RELOAD
document.addEventListener('click', (e: Event) => {
    //---------if click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const state: string = '#/product-details/' + e.target.id;
        window.history.pushState({ path: state }, '', state);
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
    document.querySelector('.total-quantity-header')?.textContent = localStorage.getItem('totalPrice');
    //-----------------------------------/SORT
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

//-------------------------------------------------FILTERS
const filters = {
    categories: [] as IProductsData[],
    subcategories: [] as IProductsData[],
    currArr: [] as IProductsData[],
};

const currentFilters = (el: HTMLInputElement) => {
    if (filters.currArr.length === productsData.length) filters.currArr = [];

    const chosenCategory: IProductsData[] = productsData.filter((item) => item.categoryEng === el.getAttribute('id'));
    const chosenSubCategory: IProductsData[] = productsData.filter(
        (item) => item.subcategoryEng === el.getAttribute('id')
    );
    filters.categories = deleteDoubleAddUnique(filters.categories, chosenCategory);
    // console.log(filters.categories);
    filters.subcategories = deleteDoubleAddUnique(filters.subcategories, chosenSubCategory);
    // console.log(filters.subcategories);
    filters.currArr =
        filters.subcategories.length === 0
            ? filters.categories
            : filters.categories.length === 0
            ? filters.subcategories
            : addDoubleDeleteUnique(filters.categories, filters.subcategories);
    // console.log('filters.currArr', filters.currArr);
    return filters.currArr.length === 0 ? productsData : filters.currArr;
};

document?.addEventListener('change', (e) => {
    const element = e.target as HTMLInputElement;
    if (element instanceof Element && element.closest('input')) {
        const result: IProductsData[] = currentFilters(element);
        // console.log('result', result);
        const categories: string[] = unicCategories(result);
        const subcategories: string[] = unicSubcategories(result);

        const state = () => {
            let categoryState = '';
            let subcategoryState = '';

            if (categories.length > 0) categoryState = 'category=' + categories.join('↕');
            if (subcategories.length > 0) subcategoryState = 'subcategory=' + subcategories.join('↕');
            let state = `/?${categoryState}&${subcategoryState}`;
            if (result.length === productsData.length) state = '/';
            console.log(state);
            return state;
        };

        element.url = state();
        window.history.pushState({ path: element.url }, '', element.url);
        routes.push({ path: '/', component: MainPage });
        router(result);
    }
});

//-------------------------------------------------/FILTERS

