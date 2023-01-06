import { productsData } from '../../data/data';
import { sliceIntoChunks, createProductsList, fillCartPages, createCartPage } from '../cart-page';
import { IProductsData } from '../../global-components/interfaces';

const addBtnStyleToLocalStorage = (id: number) => {
    if (localStorage.getItem(`btn_${id}`) === 'добавлен') {
        localStorage.setItem(`btn_${id}`, 'в корзину');
    } else {
        localStorage.setItem(`btn_${id}`, 'добавлен');
    }
};

const createArrayOfCurrentItemsIds = (element: HTMLElement) => {
    let arrayId = JSON.parse(localStorage.getItem('cartList') as string) as Array<number>;
    let cartProductsArray = JSON.parse(localStorage.getItem('cartItems') as string);
    if (arrayId.includes(+element.id)) {
        arrayId = arrayId.filter((item) => item !== +element.id);
        cartProductsArray = (cartProductsArray as IProductsData[]).flat().filter((item) => item.id !== +element.id);
        element.textContent = localStorage.getItem(`btn_${element.id}`);
    } else {
        arrayId.push(+element.id);
        cartProductsArray.push(productsData[+element.id]);
        element.textContent = localStorage.getItem(`btn_${element.id}`);
    }
    localStorage.setItem('cartList', JSON.stringify(arrayId));
    localStorage.setItem(
        'cartItems',
        JSON.stringify(sliceIntoChunks(cartProductsArray.flat(), +(localStorage.getItem('size') as string)))
    );
};

const changeTotalPriceDependOnBtns = (element: HTMLElement) => {
    if (localStorage.getItem(`btn_${element.id}`) === 'в корзину') {
        localStorage.setItem(
            'totalPrice',
            `${+(localStorage.getItem('totalPrice') as string) - productsData[+element.id].price}`
        );
        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 2));
    } else if (localStorage.getItem(`btn_${+element.id}`) === 'добавлен') {
        localStorage.setItem(
            'totalPrice',
            `${+(localStorage.getItem('totalPrice') as string) + productsData[+element.id].price}`
        );
        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string)));
    }
};

const changeDisplayDependOnBtns = () => {
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
};

const setQuantityAndPriceOnLocalStorage = (element: HTMLElement) => {
    if (localStorage.getItem(`quantityProduct_${element.id}`) === '0') {
        localStorage.setItem(`quantityProduct_${element.id}`, '1');
        localStorage.setItem(`price_${element.id}`, `${productsData[+element.id].price}`);
    }
    (document.querySelector('.found-products') as HTMLSpanElement).textContent = localStorage.getItem('totalStock');
};

const setTotalAndProductStockOnLocalStorage = (element: HTMLElement) => {
    localStorage.setItem(`stock_${element.id}`, `${productsData[+element.id].stock - 1}`);
    localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
};

const increaseCurrentPage = (element: HTMLElement) => {
    (element.parentElement?.querySelector('input') as HTMLInputElement).value = String(
        +(element.parentElement?.querySelector('input') as HTMLInputElement).value + 1
    );
};

const reduceCurrentPage = (element: HTMLElement) => {
    (element.parentElement?.querySelector('input') as HTMLInputElement).value = String(
        +(element.parentElement?.querySelector('input') as HTMLInputElement).value - 1
    );
};

export const fillCartPageNext = (element: HTMLElement) => {
    localStorage.setItem('currentPage', `${+(localStorage.getItem('currentPage') as string) + 1}`);
    increaseCurrentPage(element);
    (document.querySelector('.cart-list') as HTMLUListElement).innerHTML = '';
    const arr = JSON.parse(localStorage.getItem('cartItems') as string)[
        +(localStorage.getItem('currentPage') as string) - 1
    ] as IProductsData[];
    arr.forEach((item) => {
        createProductsList(item.id);
    });
};

export const fillCartPagePrev = (element: HTMLElement) => {
    localStorage.setItem('currentPage', `${+(localStorage.getItem('currentPage') as string) - 1}`);
    reduceCurrentPage(element);
    const arr = JSON.parse(localStorage.getItem('cartItems') as string)[
        +(localStorage.getItem('currentPage') as string) - 1
    ] as IProductsData[];
    (document.querySelector('.cart-list') as HTMLUListElement).innerHTML = '';
    arr.forEach((item) => {
        createProductsList(item.id);
    });
};

export const showHideBtnNext = (element: HTMLElement) => {
    if (
        +(localStorage.getItem('currentPage') as string) ===
        JSON.parse(localStorage.getItem('cartItems') as string).length
    ) {
        (element as HTMLElement).style.transform = 'scale(0)';
        localStorage.setItem('btnRight', 'hide');
    } else {
        localStorage.setItem('btnRight', 'show');
    }
    localStorage.setItem('btnLeft', 'show');
    (document.querySelector('.btn-switch-page-left') as HTMLButtonElement).style.transform = 'scale(1)';
};

export const showHideBtnPrev = (element: HTMLElement) => {
    if (+(localStorage.getItem('currentPage') as string) === 1) {
        element.style.transform = 'scale(0)';
        localStorage.setItem('btnLeft', 'hide');
    } else {
        localStorage.setItem('btnLeft', 'show');
    }
    localStorage.setItem('btnRight', 'show');
    (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(1)';
};

const showHideBtnStockNext = (element: HTMLElement) => {
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
};

const showHideBtnStockPrev = (element: HTMLElement) => {
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
};

const setStockToLocalStoragePrev = () => {
    if (!localStorage.getItem('totalStock')) {
        localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 1));
    } else {
        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) - 1));
    }
};

const setStockToLocalStorageNext = () => {
    if (!localStorage.getItem('totalStock')) {
        localStorage.setItem('totalStock', `${JSON.parse(localStorage.getItem('cartList') as string).length}`);
        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
    } else {
        localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
    }
};

const setProductPricendTotalPriceToLocalStoragePrev = (element: HTMLElement) => {
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
};

const setProductPricendTotalPriceToLocalStorageNext = (element: HTMLElement) => {
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
};

const reduceTotalQuantityOfProductsOnCart = () => {
    (document.querySelector('.quantity-products-value') as HTMLInputElement).value = `${
        +(document.querySelector('.quantity-products-value') as HTMLInputElement).value - 1
    }`;
};

const increaseTotalQuantityOfProductsOnCart = () => {
    (document.querySelector('.quantity-products-value') as HTMLInputElement).value = `${
        +(document.querySelector('.quantity-products-value') as HTMLInputElement).value + 1
    }`;
};

const setTotalQuantityToLocalStorage = (element: HTMLElement) => {
    localStorage.setItem(
        `quantityProduct_${element.id}`,
        (element.parentElement?.querySelector('input') as HTMLInputElement).value
    );
};

const updateDataIfStockProductIsZero = (element: HTMLElement) => {
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
};

const hideBtnRight = () => {
    if (JSON.parse(localStorage.getItem('cartList') as string).length <= +(localStorage.getItem('size') as string)) {
        localStorage.setItem('btnRight', 'hide');
        (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(0)';
    }
    if (
        +(localStorage.getItem('currentPage') as string) ===
        JSON.parse(localStorage.getItem('cartItems') as string).length
    ) {
        localStorage.setItem('btnRight', 'hide');
        (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(0)';
    }
};

const setTotalPriceInHeader = () => {
    (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
        'totalPrice'
    );
};

const updateCartPage = (mainSection: HTMLDivElement) => {
    if (JSON.parse(localStorage.getItem('cartList') as string).length === 0) {
        mainSection.innerHTML = '';
        mainSection.append(createCartPage());
    }
};

const updateFoundProductsSpan = () => {
    (document.querySelector('.found-products') as HTMLSpanElement).textContent = localStorage.getItem('totalStock');
};

export const executeWhenAddBtnQuantityOfProduct = (element: HTMLElement) => {
    increaseCurrentPage(element);
    setTotalQuantityToLocalStorage(element);
    showHideBtnStockPrev(element);
    setProductPricendTotalPriceToLocalStorageNext(element);
    setStockToLocalStorageNext();
    increaseTotalQuantityOfProductsOnCart();
    setTotalPriceInHeader();
    updateFoundProductsSpan();
};

export const executeWhenDeleteBtnQuantityOfProduct = (element: HTMLElement, mainSection: HTMLDivElement) => {
    reduceCurrentPage(element);
    setTotalQuantityToLocalStorage(element);
    showHideBtnStockNext(element);
    setProductPricendTotalPriceToLocalStoragePrev(element);
    setStockToLocalStoragePrev();
    reduceTotalQuantityOfProductsOnCart();
    updateDataIfStockProductIsZero(element);
    hideBtnRight();
    setTotalPriceInHeader();
    updateCartPage(mainSection);
    updateFoundProductsSpan();
};

export const executeWhenAddProductToCart = (element: HTMLElement) => {
    addBtnStyleToLocalStorage(+element.id);
    createArrayOfCurrentItemsIds(element);
    changeTotalPriceDependOnBtns(element);
    changeDisplayDependOnBtns();
    setQuantityAndPriceOnLocalStorage(element);
    setTotalAndProductStockOnLocalStorage(element);
    updateFoundProductsSpan();
    setTotalPriceInHeader();
};
