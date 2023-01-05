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
import { createCartPage, createProductsList, fillCartPages, sliceIntoChunks } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { productsData, IProductsData } from './components/data/data';
import { isAlreadyHave, deleteDoubleAddUnique, addDoubleDeleteUnique } from './components/helpers/helpers';
import { createContainerCard } from './components/modal-window-page/modal-window-page';
import {
    addBtnStyleToLocalStorage,
    createArrayOfCurrentItemsIds,
    changeTotalPriceDependOnBtns,
    changeDisplayDependOnBtns,
    setQuantityAndPriceOnLocalStorage,
    setTotalAndProductStockOnLocalStorage
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
        const element = e.target;

        addBtnStyleToLocalStorage(+element.id);
        createArrayOfCurrentItemsIds(element);
        changeTotalPriceDependOnBtns(element);
        changeDisplayDependOnBtns();
        setQuantityAndPriceOnLocalStorage(element);
        setTotalAndProductStockOnLocalStorage(element);
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.btn-switch-page-right')) {
        localStorage.setItem('currentPage', `${+(localStorage.getItem('currentPage') as string) + 1}`);
        (e.target.parentElement.querySelector('input') as HTMLInputElement).value = String(
            +(e.target.parentElement.querySelector('input') as HTMLInputElement).value + 1
        );
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
        localStorage.setItem('currentPage', `${+(localStorage.getItem('currentPage') as string) - 1}`);
        (element.parentElement?.querySelector('input') as HTMLInputElement).value = String(
            +(element.parentElement?.querySelector('input') as HTMLInputElement).value - 1
        );
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
        (element.parentElement?.querySelector('input') as HTMLInputElement).value = String(
            +(element.parentElement?.querySelector('input') as HTMLInputElement).value - 1
        );
        localStorage.setItem(
            `quantityProduct_${element.id}`,
            (element.parentElement?.querySelector('input') as HTMLInputElement).value
        );
        let stock = +(localStorage.getItem(`stock_${element.id}`) as string);
        stock++;
        localStorage.setItem(`stock_${element.id}`, `${stock}`);
        (document.querySelectorAll('.stock-value') as NodeListOf<HTMLInputElement>).forEach((item) => {
            if (item.id === element.id) {
                item.value = String(+item.value + 1);
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
        (document.querySelector('.total-sum-value') as HTMLInputElement).value = localStorage.getItem(
            'totalPrice'
        ) as string;

        if (!localStorage.getItem('totalStock')) {
            localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 1));
        } else {
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 1));
        }
        (document.querySelector('.quantity-products-value') as HTMLInputElement).value = `${
            +(document.querySelector('.quantity-products-value') as HTMLInputElement).value - 1
        }`;

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
                    createProductsList(+item);
                });
            } else {
                localStorage.setItem('currentPage', String(+(localStorage.getItem('currentPage') as string) - 1));
                (document.querySelector('.current-page') as HTMLInputElement).value = `${
                    +(document.querySelector('.current-page') as HTMLInputElement).value - 1
                }`;
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
        (document.querySelector('.total-sum-value') as HTMLInputElement).style.textDecoration = 'none';
        if (JSON.parse(localStorage.getItem('cartList') as string).length === 0) {
            mainSection.innerHTML = '';
            mainSection.append(createCartPage());
        }
        if (document.querySelector('.end-sum')) {
            document.querySelector('.end-sum')?.remove();
        }
        (document.querySelector('.found-products') as HTMLSpanElement).textContent = localStorage.getItem('totalStock');
    }

    if (e.target instanceof Element && e.target.parentElement && e.target.closest('.add-item')) {
        const element = e.target as HTMLElement;
        (element.parentElement?.querySelector('input') as HTMLInputElement).value = `${
            +(element.parentElement?.querySelector('input') as HTMLInputElement).value + 1
        }`;
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
                String(+(localStorage.getItem('totalPrice') as string) + productsData[+element.id].price)
            );
        } else {
            localStorage.setItem(
                'totalPrice',
                String(+(localStorage.getItem('totalPrice') as string) + productsData[+element.id].price * 2)
            );
        }
        (document.querySelector('.total-sum-value') as HTMLInputElement).value = localStorage.getItem(
            'totalPrice'
        ) as string;

        if (!localStorage.getItem('totalStock')) {
            localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
        } else {
            localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
        }
        (document.querySelector('.quantity-products-value') as HTMLInputElement).value = `${
            +(document.querySelector('.quantity-products-value') as HTMLInputElement).value + 1
        }`;
    }
    (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
        'totalPrice'
    );
    if (document.querySelector('.end-sum')) {
        document.querySelector('.end-sum')?.remove();
    }
    (document.querySelector('.found-products') as HTMLSpanElement).textContent = localStorage.getItem('totalStock');
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
