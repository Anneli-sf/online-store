import { productsData, IProductsData } from '../../data/data';
import { sliceIntoChunks } from '../cart-page';

export const addBtnStyleToLocalStorage = (id: number) => {
    if (localStorage.getItem(`btn_${id}`) === 'добавлен') {
        localStorage.setItem(`btn_${id}`, 'в корзину');
    } else {
        localStorage.setItem(`btn_${id}`, 'добавлен');
    }
};

export const createArrayOfCurrentItemsIds = (element) => {
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

export const changeTotalPriceDependOnBtns = (element) => {
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

export const changeDisplayDependOnBtns = () => {
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

export const setQuantityAndPriceOnLocalStorage = (element) => {
    if (localStorage.getItem(`quantityProduct_${element.id}`) === '0') {
        localStorage.setItem(`quantityProduct_${element.id}`, '1');
        localStorage.setItem(`price_${element.id}`, `${productsData[+element.id].price}`);
    }
    (document.querySelector('.found-products') as HTMLSpanElement).textContent = localStorage.getItem('totalStock');
};

export const setTotalAndProductStockOnLocalStorage = (element) => {
    localStorage.setItem(`stock_${element.id}`, `${productsData[+element.id].stock - 1}`);
    localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
};
