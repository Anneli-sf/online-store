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
import { createCartPage, createProductsList, fillCartPages } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { productsData, IProductsData } from './components/data/data';
import { isAlreadyHave, deleteDoubleAddUnique, addDoubleDeleteUnique } from './components/helpers/helpers';

createHeader();
createFooter();

const mainSection = document.querySelector('.main') as HTMLElement;
mainSection.append(createProducstPage(productsData));

//---------------------------ROUTE------------------------//

const MainPage = {
    render: () => {
        // mainSection.innerHTML = '';
        return createProducstPage(productsData);
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
if (!localStorage.getItem('btnLeft') && !localStorage.getItem('btnRight')) {
    localStorage.setItem('btnLeft', 'hide');
    localStorage.setItem('btnRight', 'hide');
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

        routes.push({ path: window.location.href.split('#')[1], component: DetailsPage });
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

        if (JSON.parse(localStorage.getItem('cartList')).length > 3) {
            localStorage.setItem('btnRight', 'show');
        } else {
            localStorage.setItem('btnRight', 'hide');
        }
        if (JSON.parse(localStorage.getItem('cartList')).length < 3 || localStorage.getItem('currentPage') === '1') {
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
        // localStorage.setItem('btnRight', 'show');
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
            console.log(localStorage.getItem(`stock_${e.target.id}`));
            console.log(productsData[e.target.id].stock);
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
            localStorage.setItem('cartItems', JSON.stringify(sliceIntoChunks(arr2.flat(), 3)));
            localStorage.setItem(`btn_${e.target.id}`, 'в корзину');
            document.querySelector('.cart-list').innerHTML = '';
            const arr3 = fillCartPages();
            arr3.forEach((item) => {
                createProductsList(item);
            });
            document.querySelector('input.quantity').value = JSON.parse(localStorage.getItem('cartList') as string).length;
            // localStorage.setItem(`quantityProduct_${e.target.id}`, '1');
            // localStorage.setItem('totalStock', String(+localStorage.getItem('totalStock') - 1));
        }
        if (JSON.parse(localStorage.getItem('cartList') as string).length <= 3) {
            localStorage.setItem('btnRight', 'hide');
            document.querySelector('.btn-switch-page-right').style.transform = 'scale(0)';
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
});

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) =>
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

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
