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
import { createProductsSection } from './components/main-section/products-section/products-section';
import {
    createProducstPage,
    productsWrapper,
    filters,
    findCurrentFilters,
    stateFilters,
    setPricesToSlider,
    setAmountToSlider,
} from './components/main-section/main-section';
import { productsData, IProductsData } from './components/data/data';
import {
    deleteDoubleAddUnique,
    addDoubleDeleteUnique,
    unicCategories,
    unicSubcategories,
} from './components/helpers/helpers';
import { createContainerCard } from './components/modal-window-page/modal-window-page';

createHeader();
createFooter();

window.addEventListener('hashchange', () => router());
// window.addEventListener('load', () => router());
window.addEventListener('load', () => {
    mainSection.append(createProducstPage(productsData));
});

const mainSection = document.querySelector('.main') as HTMLElement;

// mainSection.append(createProducstPage(productsData));

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

//-------------------------------ROUTING
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => {
    // console.log('routes', routes);
    // console.log('path', path);
    return routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;
};

const router = (option?) => {
    const path = parseLocation();
    // console.log('path parse', path);
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    // mainSection.innerHTML = ``;
    mainSection.append(component.render(option));
};

//-------------------------------/ROUTING

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

document.addEventListener('click', (e: Event) => {
    //---------if click on DETAILS
    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn__details')) {
        const state: string = '#/product-details/' + e.target.id;
        window.history.pushState({ path: state }, '', state);
        e.target.url = window.location.href;

        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage });
        router(Number(e.target.id));
    }
    //---------/click on DETAILS----------

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

document.addEventListener('change', (e) => {
    const element = e.target as HTMLInputElement;
    if (element instanceof Element && element.closest('input')) {
        const result: IProductsData[] = findCurrentFilters(element);
        console.log('result', result);

        //-----------------get unic names of categories/ subcategories
        const categories: string[] = unicCategories(result);
        const subcategories: string[] = unicSubcategories(result);
        // console.log(categories);
        // console.log(subcategories);

        //-------------------set chosen amount of goods
        const currentCatStock: any = {};
        const currentSubCatStock: any = {};
        result.forEach((item) => {
            if (Object.keys(currentCatStock).includes(item.categoryEng)) {
                currentCatStock[item.categoryEng] = currentCatStock[item.categoryEng] + item.stock;
            } else currentCatStock[item.categoryEng] = item.stock;

            if (Object.keys(currentSubCatStock).includes(item.subcategoryEng)) {
                currentSubCatStock[item.subcategoryEng] = currentSubCatStock[item.subcategoryEng] + item.stock;
            } else currentSubCatStock[item.subcategoryEng] = item.stock;
        });

        const currentAmounts = [...document.querySelectorAll('.amount-input-current')] as HTMLInputElement[];
        currentAmounts.forEach((input: HTMLInputElement) => {
            if (Object.keys(currentCatStock).includes(input.id)) {
                input.value = currentCatStock[input.id];
            } else if (Object.keys(currentSubCatStock).includes(input.id)) {
                input.value = currentSubCatStock[input.id];
            } else {
                input.value = '0';
            }
        });

        // console.log('currentAmounts', currentAmounts);

        //-------------------set styles of available labels
        const currentLabels = [...document.querySelectorAll('label')] as HTMLLabelElement[];
        currentLabels.forEach((label: HTMLLabelElement) => {
            const attrFor = label.getAttribute('for') as string;
            if (Object.keys(currentCatStock).includes(attrFor) || Object.keys(currentSubCatStock).includes(attrFor)) {
                label.style.opacity = '1';
            } else {
                label.style.opacity = '0.6';
            }
        });

        //--------------------------set prices and stock  to slider
        setPricesToSlider(result);
        setAmountToSlider(result);

        element.url = stateFilters(categories, subcategories, result);
        window.history.pushState({ path: element.url }, '', element.url);
        routes.push({ path: '/', component: MainPage });
        router(result);
    }
});

//-------------------------------------------------/FILTERS
