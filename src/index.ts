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
import {
    createCartPage,
    createProductsCartBlock,
    createProductsList,
    fillCartPages,
    sliceIntoChunks,
} from './components/cart-page/cart-page';
import { createProductsSection, contentBlock } from './components/main-section/products-section/products-section';
import { createProducstPage, productsWrapper } from './components/main-section/main-section';
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
// const contentBlock = document.querySelector('.products') as HTMLDivElement;
// mainSection.append(createProducstPage(productsData));
// const appendToMainSection = (arr: IProductsData[]): void => {
//     mainSection.innerHTML = ``;
//     mainSection.append(createProducstPage(arr));
// };
//---------------------------ROUTE------------------------//

const MainPage = {
    render: (array = productsData) => {
        const contentBlock = document.querySelector('.products') as HTMLDivElement;
        contentBlock.remove();
        // contentBlock.innerHTML = '';
        productsWrapper.append(createProductsSection(array));
        return productsWrapper;
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

const ModalWindow = {
    render: () => {
        mainSection.innerHTML = ``;
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
    // console.log('path parse', path);
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    // mainSection.innerHTML = ``;
    mainSection.append(component.render(option));
};

window.addEventListener('hashchange', () => router());
// window.addEventListener('load', () => router());
window.addEventListener('load', () => {
    mainSection.append(createProducstPage(productsData));
});

//-------------------------------/ROUTING

//-------variables for filters
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

// TODO   SAVE THE PAGE when RELOAD
document.addEventListener('click', (e: Event) => {
    //---------if click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const state: string = '#/product-details/' + e.target.id;
        window.history.pushState({ path: state }, '', state);
        e.target.url = window.location.href;

        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage });
        router(Number(e.target.id));
    }

    //-------------------------------------------------------

    //-------------------BASKET

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__add')) {
        let arrayId = JSON.parse(localStorage.getItem('cartList') as string) as Array<number>;
        let cartProductsArray = JSON.parse(localStorage.getItem('cartItems') as string) as IProductsData[];
        const id: number = +e.target.id;

        if (localStorage.getItem(`btn_${id}`) === 'добавлен') {
            localStorage.setItem(`btn_${id}`, 'в корзину');
        } else {
            localStorage.setItem(`btn_${id}`, 'добавлен');
        }

        if (arrayId.includes(+id)) {
            arrayId = arrayId.filter((item) => item !== id);
            cartProductsArray = cartProductsArray.flat().filter((item) => item.id !== id);
            e.target.textContent = localStorage.getItem(`btn_${id}`);
        } else {
            arrayId.push(+id);
            cartProductsArray.push(productsData[id]);
            e.target.textContent = localStorage.getItem(`btn_${id}`);
        }
        localStorage.setItem('cartList', JSON.stringify(arrayId));
        localStorage.setItem(
            'cartItems',
            JSON.stringify(sliceIntoChunks(cartProductsArray.flat(), +localStorage.getItem('size')))
        );

        if (localStorage.getItem(`btn_${id}`) === 'в корзину') {
            localStorage.setItem(
                'totalPrice',
                `${+(localStorage.getItem('totalPrice') as string) - productsData[id].price}`
            );
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 2));
        } else if (localStorage.getItem(`btn_${id}`) === 'добавлен') {
            localStorage.setItem(
                'totalPrice',
                `${+(localStorage.getItem('totalPrice') as string) + productsData[id].price}`
            );
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string)));
        }

        if (JSON.parse(localStorage.getItem('cartList') as string).length > +(localStorage.getItem('size') as string)) {
            localStorage.setItem('btnRight', 'show');
        } else {
            localStorage.setItem('btnRight', 'hide');
        }
        if (
            JSON.parse(localStorage.getItem('cartList') as string).length < +(localStorage.getItem('size') as string) ||
            localStorage.getItem('currentPage') === '1'
        ) {
            localStorage.setItem('btnLeft', 'hide');
        } else {
            localStorage.setItem('btnLeft', 'show');
        }

        if (localStorage.getItem(`quantityProduct_${id}`) === '0') {
            localStorage.setItem(`quantityProduct_${id}`, '1');
            localStorage.setItem(`price_${id}`, `${productsData[id].price}`);
        }
        localStorage.setItem(`stock_${id}`, `${productsData[id].stock - 1}`);

        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-right')) {
        localStorage.setItem('currentPage', `${+(localStorage.getItem('currentPage') as string) + 1}`);
        ++e.target.parentElement.querySelector('input').value;
        (document.querySelector('.cart-list') as HTMLUListElement).innerHTML = '';
        const arr = JSON.parse(localStorage.getItem('cartItems') as string)[
            +(localStorage.getItem('currentPage') as string) - 1
        ] as IProductsData[];
        arr.forEach((item) => {
            createProductsList(item.id);
        });
        if (
            +(localStorage.getItem('currentPage') as string) ===
            JSON.parse(localStorage.getItem('cartItems') as string).length
        ) {
            (e.target as HTMLElement).style.transform = 'scale(0)';
            localStorage.setItem('btnRight', 'hide');
        } else {
            localStorage.setItem('btnRight', 'show');
        }
        localStorage.setItem('btnLeft', 'show');
        (document.querySelector('.btn-switch-page-left') as HTMLButtonElement).style.transform = 'scale(1)';
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-left')) {
        const element = e.target as HTMLElement;
        localStorage.setItem('currentPage', `${+localStorage.getItem('currentPage') - 1}`);
        --element.parentElement.querySelector('input').value;
        const arr = JSON.parse(localStorage.getItem('cartItems') as string)[
            +(localStorage.getItem('currentPage') as string) - 1
        ] as IProductsData[];
        (document.querySelector('.cart-list') as HTMLUListElement).innerHTML = '';
        arr.forEach((item) => {
            createProductsList(item.id);
        });
        if (+(localStorage.getItem('currentPage') as string) === 1) {
            element.style.transform = 'scale(0)';
            localStorage.setItem('btnLeft', 'hide');
        } else {
            localStorage.setItem('btnLeft', 'show');
        }
        localStorage.setItem('btnRight', 'show');
        (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(1)';
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.delete-item')) {
        const element = e.target as HTMLElement;
        --element.parentElement.querySelector('input').value;
        localStorage.setItem(`quantityProduct_${element.id}`, element.parentElement.querySelector('input').value);
        let stock = +(localStorage.getItem(`stock_${element.id}`) as string);
        stock++;
        localStorage.setItem(`stock_${element.id}`, `${stock}`);
        (document.querySelectorAll('.stock-value') as NodeListOf<HTMLInputElement>).forEach((item) => {
            if (item.id === element.id) {
                item.value++;
            }
        });
        if (localStorage.getItem(`stock_${element.id}`) !== '0') {
            (document.querySelectorAll('.add-item') as NodeListOf<HTMLButtonElement>).forEach((item) => {
                if (item.id === element.id) {
                    item.style.transform = 'scale(1)';
                }
            });
        }
        if (+(localStorage.getItem(`stock_${element.id}`) as string) === productsData[+element.id].stock) {
            (document.querySelectorAll('.delete-item') as NodeListOf<HTMLButtonElement>).forEach((item) => {
                if (item.id === element.id) {
                    item.style.transform = 'scale(0)';
                }
            });
        }
        localStorage.setItem(
            `price_${element.id}`,
            String(+(localStorage.getItem(`price_${element.id}`) as string) - productsData[+element.id].price)
        );
        (document.querySelectorAll('.total-price') as NodeListOf<HTMLInputElement>).forEach((item) => {
            if (item.id === element.id) {
                item.value = String(+(localStorage.getItem(`price_${element.id}`) as string));
            }
        });
        localStorage.setItem(
            'totalPrice',
            String(+(localStorage.getItem('totalPrice') as string) - productsData[+element.id].price)
        );
        (document.querySelector('.total-sum-value') as HTMLInputElement).value = localStorage.getItem('totalPrice');

        if (!localStorage.getItem('totalStock')) {
            localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 1));
        } else {
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 1));
        }
        (document.querySelector('.quantity-products-value') as HTMLInputElement).value--;

        if (localStorage.getItem(`quantityProduct_${element.id}`) === '0') {
            const arr1: Array<number> = JSON.parse(localStorage.getItem('cartList') as string).filter(
                (item: number) => item !== +element.id
            );
            const arr2 = JSON.parse(localStorage.getItem('cartItems') as string)
                .flat()
                .filter((item: HTMLElement) => +item.id !== +element.id);
            localStorage.setItem('cartList', JSON.stringify(arr1));
            localStorage.setItem(
                'cartItems',
                JSON.stringify(sliceIntoChunks(arr2.flat(), +(localStorage.getItem('size') as string)))
            );
            localStorage.setItem(`btn_${element.id}`, 'в корзину');
            (document.querySelector('.cart-list') as HTMLUListElement).innerHTML = '';
            const arr3 = fillCartPages(+(localStorage.getItem('size') as string));
            if (arr3) {
                arr3.forEach((item) => {
                    createProductsList(item);
                });
            } else {
                localStorage.setItem('currentPage', String(+(localStorage.getItem('currentPage') as string) - 1));
                (document.querySelector('.current-page') as HTMLInputElement).value--;
                const arr3 = fillCartPages(+(localStorage.getItem('size') as string)) as Array<number>;
                arr3.forEach((item) => {
                    createProductsList(item);
                });
            }
            if (localStorage.getItem('currentPage') === '1') {
                localStorage.setItem('btnLeft', 'hide');
                (document.querySelector('.btn-switch-page-left') as HTMLButtonElement).style.transform = 'scale(0)';
            }
            (document.querySelector('input.quantity') as HTMLInputElement).value = JSON.parse(
                localStorage.getItem('cartList') as string
            ).length;
        }
        if (
            JSON.parse(localStorage.getItem('cartList') as string).length <= +(localStorage.getItem('size') as string)
        ) {
            localStorage.setItem('btnRight', 'hide');
            (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(0)';
        }
        (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
            'totalPrice'
        );
        if (
            +(localStorage.getItem('currentPage') as string) ===
            JSON.parse(localStorage.getItem('cartItems') as string).length
        ) {
            localStorage.setItem('btnRight', 'hide');
            (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(0)';
        }
        if (document.querySelector('.promecode-input')) {
            (document.querySelector('.promecode-input') as HTMLInputElement).value = '';
        }
        (document.querySelector('.total-sum-value') as HTMLInputElement).style.textDecoration = 'none';
        (document.querySelector('.span-price-promocode') as HTMLSpanElement).textContent = '';
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.add-item')) {
        const element = e.target as HTMLElement;
        ++element.parentElement.querySelector('input').value;
        localStorage.setItem(
            `quantityProduct_${element.id}`,
            (element.parentElement?.querySelector('input') as HTMLInputElement).value
        );
        let stock = +(localStorage.getItem(`stock_${element.id}`) as string);
        stock--;
        localStorage.setItem(`stock_${element.id}`, `${stock}`);
        (document.querySelectorAll('.stock-value') as NodeListOf<HTMLInputElement>).forEach((item) => {
            if (item.id === element.id) {
                item.value = String(+item.value - 1);
            }
        });
        if (localStorage.getItem(`stock_${element.id}`) === '0') {
            (document.querySelectorAll('.add-item') as NodeListOf<HTMLButtonElement>).forEach((item) => {
                if (item.id === element.id) {
                    item.style.transform = 'scale(0)';
                }
            });
        }
        if (+(localStorage.getItem(`stock_${element.id}`) as string) !== productsData[+element.id].stock) {
            (document.querySelectorAll('.delete-item') as NodeListOf<HTMLElement>).forEach((item) => {
                if (item.id === element.id) {
                    item.style.transform = 'scale(1)';
                }
            });
        }
        localStorage.setItem(
            `price_${element.id}`,
            String(+(localStorage.getItem(`price_${element.id}`) as string) + productsData[+element.id].price)
        );
        (document.querySelectorAll('.total-price') as NodeListOf<HTMLInputElement>).forEach((item) => {
            if (item.id === element.id) {
                item.value = localStorage.getItem(`price_${element.id}`) as string;
            }
        });
        if (localStorage.getItem('totalPrice')) {
            localStorage.setItem(
                'totalPrice',
                String(+(localStorage.getItem('totalPrice') as string) + productsData[element.id].price)
            );
        } else {
            localStorage.setItem(
                'totalPrice',
                String(+(localStorage.getItem('totalPrice') as string) + productsData[element.id].price * 2)
            );
        }
        (document.querySelector('.total-sum-value') as HTMLInputElement).value = localStorage.getItem('totalPrice');

        if (!localStorage.getItem('totalStock')) {
            localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
        } else {
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
        }
        document.querySelector('.quantity-products-value').value++;
    }
    (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
        'totalPrice'
    );
    if (document.querySelector('.promecode-input')) {
        (document.querySelector('.promecode-input') as HTMLInputElement).value = '';
    }
    if (document.querySelector('.total-sum-value') as HTMLInputElement) {
        (document.querySelector('.total-sum-value') as HTMLInputElement).style.textDecoration = 'none';
    }
    (document.querySelector('.span-price-promocode') as HTMLSpanElement).textContent = '';
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
        const result: IProductsData[] = currentFilters(element);//---------------массив, из которого все собираем
        console.log('result', result);
        const categories: string[] = unicCategories(result);
        const subcategories: string[] = unicSubcategories(result);
        console.log(categories);
        console.log(subcategories);

        const state = () => {
            let categoryState = '';
            let subcategoryState = '';

            if (categories.length > 0) categoryState = 'category=' + categories.join('↕');
            if (subcategories.length > 0) subcategoryState = 'subcategory=' + subcategories.join('↕');
            let state = `/?${categoryState}&${subcategoryState}`;
            if (result.length === productsData.length) state = '/';
            // console.log(state);
            return state;
        };

       //TODO вставить текущее количество
        const currentAmounts = document.querySelectorAll('.amount-input-current');
        console.log('currentAmounts', currentAmounts);
        currentAmounts.forEach((input) => {
            result.forEach((el) => {
                // console.log('input.value', input.value);
                // el.categoryEng === input.id ? (input.value += el.stock) : (input.value = 0);
                // el.subcategoryEng === input.id ? (input.value += el.stock) : (input.value = 0);
            });
        });
        //--------------------//конец TODO-----------------------

        element.url = state();
        window.history.pushState({ path: element.url }, '', element.url);
        routes.push({ path: '/', component: MainPage });
        router(result);
    }
});

//-------------------------------------------------/FILTERS
