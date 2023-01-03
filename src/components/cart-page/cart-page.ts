import './cart-page.scss';
import {
    createElement,
    createBlock,
    createButton,
    createLabel,
    createImage,
    createSimpleInput,
    createParagraph,
} from '../global-components/global-components';
import { IProductsData, productsData } from '../data/data';

const listBlock = createElement('ul', 'cart-list') as HTMLUListElement;

export const createCartPage = (): HTMLDivElement => {
    const cartPage = createElement('div', 'cart-wrapper') as HTMLDivElement;
    if (JSON.parse(localStorage.getItem('cartList') as string).length === 0) {
        console.log('zero');
        cartPage.append(createEmptyPage());
    } else {
        cartPage.append(createProductsCartBlock(), createSummaryCartBlock());
    }
    return cartPage;
};

export function sliceIntoChunks(arr: Array<number>, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export const fillCartPages = (size: number) => {
    const arr = JSON.parse(localStorage.getItem('cartList') as string);
    if (arr.length === 0) {
        return sliceIntoChunks(JSON.parse(localStorage.getItem('cartList') as string), size);
    } else {
        return sliceIntoChunks(JSON.parse(localStorage.getItem('cartList') as string), size)[
            +(localStorage.getItem('currentPage') as string) - 1
        ];
    }
};

const createEmptyPage = () => {
    const empty = createElement('div', 'empty');
    const emptyText = createElement('p', 'empty-text');
    emptyText.textContent = 'Корзина пуста...';

    empty.append(emptyText);

    return empty;
};

export const createProductsCartBlock = () => {
    const cartBlock = createElement('div', 'cart-products');
    const cartBlockHeader = createElement('div', 'block-header');
    const cartBlockTitle = createElement('p', 'block-title');
    cartBlockTitle.textContent = 'Товары в корзине';

    const cartBlockContent = createElement('div', 'block-section');

    const paginationInput = createElement('input', 'pagination') as HTMLInputElement;
    paginationInput.type = 'text';
    paginationInput.placeholder = 'кол-во товаров';
    paginationInput.maxLength = 1;
    paginationInput.value = localStorage.getItem('size') as string;
    paginationInput.oninput = () => {
        console.log(paginationInput.value);
        if (paginationInput.value && paginationInput.value !== '0') {
            paginationInput.value = paginationInput.value.replace(/[^1-9.]/g, '').replace(/(\..*)\./g, '$1');
            localStorage.setItem('currentPage', '1');
            localStorage.setItem('btnLeft', 'hide');
            (document.querySelector('.btn-switch-page-left') as HTMLButtonElement).style.transform = 'scale(0)';
            (document.querySelector('.current-page') as HTMLInputElement).value = '1';
            (document.querySelector('.cart-list') as HTMLUListElement).innerHTML = '';
            const arr2 = JSON.parse(localStorage.getItem('cartItems') as string).flat();
            localStorage.setItem('cartItems', JSON.stringify(sliceIntoChunks(arr2.flat(), +paginationInput.value)));
            localStorage.setItem('size', paginationInput.value);
            const arr3 = fillCartPages(+(localStorage.getItem('size') as string)) as number[];
            arr3.forEach((item) => {
                createProductsList(item);
            });
            if (JSON.parse(localStorage.getItem('cartItems') as string).length === 1) {
                localStorage.setItem('btnRight', 'hide');
                (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(0)';
            }
            if (JSON.parse(localStorage.getItem('cartItems') as string).length > 1) {
                localStorage.setItem('btnRight', 'show');
                (document.querySelector('.btn-switch-page-right') as HTMLButtonElement).style.transform = 'scale(1)';
            }
        }
    };

    cartBlockHeader.append(cartBlockTitle, quantityProductsOnCart(), paginationInput, switchPagesBlock());

    const idArray = fillCartPages(+(localStorage.getItem('size') as string)) as number[];
    listBlock.innerHTML = '';
    idArray.forEach((item) => {
        createProductsList(item);
    });

    cartBlockContent.append(listBlock);

    cartBlock.querySelectorAll('.number-product').forEach((item, index) => {
        item.textContent = `${index + 1}`;
    });

    cartBlock.append(cartBlockHeader, cartBlockContent);
    // document.querySelector('.main')?.append(cartBlock);
    return cartBlock;
};

export const createProductsList = (productId: number): HTMLUListElement => {
    listBlock.append(cartProductBlock(productId));

    return listBlock;
};
//----------------------------HEADER
const quantityProductsOnCart = () => {
    const labelQuantityOfProducts = createLabel('Товары: ', 'quantity');
    const inputQuantityOfProducts = createSimpleInput(
        'quantity',
        'number',
        '',
        `${JSON.parse(localStorage.getItem('cartList') as string).length}`
    ) as HTMLInputElement;
    labelQuantityOfProducts.append(inputQuantityOfProducts);

    return labelQuantityOfProducts;
};

if (!localStorage.getItem('currentPage')) {
    localStorage.setItem('currentPage', '1');
}

const switchPagesBlock = () => {
    const pagesSwitchesButtonsBlock = createElement('div', 'btns-container-switch-pages') as HTMLDivElement;

    const currentPage = createSimpleInput(
        'current-page',
        'number',
        '',
        `${localStorage.getItem('currentPage')}`
    ) as HTMLInputElement;

    const textPage = createParagraph('Страница: ', 'title-of-container-switch-btns') as HTMLParagraphElement;

    const buttonSwitchPagesToLeft = createButton('', 'btn-switch-page-left');
    const buttonSwitchPagesToRight = createButton('', 'btn-switch-page-right');

    if (localStorage.getItem('btnLeft') === 'show') {
        buttonSwitchPagesToLeft.style.transform = 'scale(1)';
    } else if (localStorage.getItem('btnLeft') === 'hide') {
        buttonSwitchPagesToLeft.style.transform = 'scale(0)';
    }

    if (localStorage.getItem('btnRight') === 'show') {
        buttonSwitchPagesToRight.style.transform = 'scale(1)';
    } else if (localStorage.getItem('btnRight') === 'hide') {
        buttonSwitchPagesToRight.style.transform = 'scale(0)';
    }

    pagesSwitchesButtonsBlock.append(textPage, buttonSwitchPagesToLeft, currentPage, buttonSwitchPagesToRight);

    return pagesSwitchesButtonsBlock;
};

//----------------------------/HEADER

const cartProductBlock = (productId: number) => {
    const productCartBlock = createElement('li', 'cart-item') as HTMLLIElement;
    productCartBlock.id = `${productId}`;
    productCartBlock.append(
        numberOfProductBlock(productId),
        imageProductBlock(productId),
        productsDescriptionBlock(productId),
        productsValuesBlock(productId)
    );

    return productCartBlock;
};

const numberOfProductBlock = (productId: number) => {
    const numberOfProduct = createElement('p', 'number-product') as HTMLParagraphElement;
    numberOfProduct.textContent = `${JSON.parse(localStorage.getItem('cartList') as string).indexOf(productId) + 1}`;
    return numberOfProduct;
};

const imageProductBlock = (productId: number): HTMLImageElement => {
    const image = createImage(
        productsData[productId].images[0],
        productsData[productId].title,
        'cart-item-image'
    ) as HTMLImageElement;
    return image;
};

const productsDescriptionBlock = (productId: number) => {
    const descriptionBlock = createElement('div', 'description-cart-item') as HTMLDivElement;
    const descriptionHeader = createElement('div', 'description-header') as HTMLDivElement;
    const descriptionTitle = createParagraph(productsData[productId].title, 'block-title') as HTMLParagraphElement;

    const descriptionContent = createElement('div', 'description-content') as HTMLDivElement;

    const miniDescription = createParagraph(
        productsData[productId].description,
        'mini-description-item'
    ) as HTMLParagraphElement;

    const raitingDiscountContainer = createElement('div', 'raiting-discount-container') as HTMLDivElement;

    const raiting = createParagraph('Рейтинг: ', 'raiting') as HTMLParagraphElement;
    const discount = createParagraph('Скидка: ', 'discount') as HTMLParagraphElement;

    const raitingValue = createSimpleInput('raiting-value', '', '', `${productsData[7].raiting}`) as HTMLInputElement;
    raitingValue.setAttribute('readonly', 'true');

    const discountValue = createSimpleInput(
        'discount-value',
        '',
        '',
        `${productsData[7].discount}%`
    ) as HTMLInputElement;
    discountValue.setAttribute('readonly', 'true');

    raiting.append(raitingValue);
    discount.append(discountValue);
    raitingDiscountContainer.append(raiting, discount);

    descriptionHeader.append(descriptionTitle);
    descriptionContent.append(miniDescription, raitingDiscountContainer);
    descriptionBlock.append(descriptionHeader, descriptionContent);

    return descriptionBlock;
};

const productsValuesBlock = (productId: number) => {
    const valuesBlock = createElement('div', 'values-cart-item') as HTMLDivElement;
    const stock = createParagraph('Доступно: ', 'stock') as HTMLParagraphElement;

    if (!localStorage.getItem(`stock_${productId}`)) {
        localStorage.setItem(`stock_${productId}`, String(productsData[productId].stock - 1));
    }

    const stockValue = createSimpleInput(
        'stock-value',
        'number',
        '',
        localStorage.getItem(`stock_${productId}`) as string,
        '',
        '',
        false,
        `${productId}`
    ) as HTMLInputElement;
    stockValue.setAttribute('readonly', 'true');
    const shtuk = createElement('span', 'stock-text') as HTMLDivElement;
    shtuk.textContent = `шт.`;

    if (!localStorage.getItem(`quantityProduct_${productId}`)) {
        localStorage.setItem(`quantityProduct_${productId}`, '1');
    }

    const quantityOfItemsInCart = createSimpleInput(
        'quantity-items-cart',
        'number',
        '',
        String(+(localStorage.getItem(`quantityProduct_${productId}`) as string))
    ) as HTMLInputElement;
    quantityOfItemsInCart.setAttribute('readonly', 'true');

    const addAndDelItemsButtonsContainer = createElement('div', 'add-del-btns-container') as HTMLDivElement;
    const addItemButton = createButton('', 'add-item') as HTMLButtonElement;
    addItemButton.id = `${productId}`;

    if (localStorage.getItem(`stock_${productId}`) === '0') {
        addItemButton.style.transform = 'scale(0)';
    }

    const deleteItemButton = createButton('', 'delete-item') as HTMLButtonElement;
    deleteItemButton.id = `${productId}`;

    const container = createElement('div', 'container') as HTMLDivElement;
    const totalPrice = createElement('input', 'total-price') as HTMLInputElement;
    totalPrice.readOnly = true;
    totalPrice.id = `${productId}`;
    if (!localStorage.getItem(`price_${productId}`)) {
        localStorage.setItem(`price_${productId}`, `${productsData[productId].price}`);
        totalPrice.value = `${productsData[productId].price}`;
    } else {
        (totalPrice.value as string | null) = localStorage.getItem(`price_${productId}`);
    }
    const span = createElement('span', 'span');
    span.textContent = '$';
    container.append(totalPrice, span);

    stock.append(stockValue, shtuk);
    addAndDelItemsButtonsContainer.append(deleteItemButton, quantityOfItemsInCart, addItemButton);
    valuesBlock.append(stock, addAndDelItemsButtonsContainer, container);

    return valuesBlock;
};

//-----------------------------------------------------

//------------------STOCK and QUANTITY------------------
export const createSummaryCartBlock = () => {
    const summaryBlock = createBlock('summary', 'Итого') as HTMLElement;

    const summarySectionBlock = summaryBlock.querySelector('.block-section') as HTMLElement;

    const quantityOfPoducts = createParagraph('Товары, шт: ', 'quantity-products') as HTMLParagraphElement;

    let totalStock = JSON.parse(localStorage.getItem('cartList') as string).length;

    if (localStorage.getItem('totalStock')) {
        totalStock = +(localStorage.getItem('totalStock') as string);
    }

    const quantityOfPoductsValue = createSimpleInput(
        'quantity-products-value',
        '',
        '',
        `${totalStock}`,
        '',
        '',
        true
    ) as HTMLInputElement;
    const totalSum = createParagraph('Сумма: ', 'total-sum') as HTMLParagraphElement;

    let totalPrice = (JSON.parse(localStorage.getItem('cartItems') as string) as IProductsData[])
        .flat()
        .reduce((acc, curr) => acc + curr.price, 0);

    if (localStorage.getItem('totalPrice')) {
        totalPrice = +(localStorage.getItem('totalPrice') as string);
    }
    const totalSumValue = createSimpleInput(
        'total-sum-value',
        '',
        '',
        `${totalPrice}`,
        '',
        '',
        true
    ) as HTMLInputElement;
    const span = createElement('span', 'span-price-promocode');

    const buyForm = createElement('form', 'promocode-form') as HTMLFormElement;
    buyForm.action = '#/modal';
    const buyInput = createElement('input', 'promecode-input') as HTMLInputElement;
    buyInput.oninput = () => {
        if (buyInput.value === 'Гарри') {
            localStorage.setItem(
                'totalPriceProm',
                String(Math.round(+(localStorage.getItem('totalPrice') as string) * 0.8))
            );
            (document.querySelector('.span-price-promocode') as HTMLSpanElement).textContent = localStorage.getItem(
                'totalPriceProm'
            );
            (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
                'totalPriceProm'
            ) as string;
            (document.querySelector('.total-sum-value') as HTMLInputElement).style.textDecoration = 'line-through';
        } else if (buyInput.value === 'Поттер') {
            localStorage.setItem(
                'totalPriceProm',
                String(Math.round(+(localStorage.getItem('totalPrice') as string) * 0.9))
            );
            (document.querySelector('.span-price-promocode') as HTMLSpanElement).textContent = localStorage.getItem(
                'totalPriceProm'
            );
            (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
                'totalPriceProm'
            ) as string;
            (document.querySelector('.total-sum-value') as HTMLInputElement).style.textDecoration = 'line-through';
        } else {
            localStorage.setItem('totalPriceProm', localStorage.getItem('totalPrice') as string);
            (document.querySelector('.span-price-promocode') as HTMLSpanElement).textContent = '';
            (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
                'totalPrice'
            );
            (document.querySelector('.total-sum-value') as HTMLInputElement).style.textDecoration = 'none';
        }
    };

    const promoTest = createParagraph("Попробуйте: 'Гарри', 'Поттер'", 'promo-test') as HTMLParagraphElement;
    const buttonBuyNow = createButton('Купить сейчас', 'btn-buy-now');
    buttonBuyNow.type = 'submit';

    buyForm.append(buyInput, promoTest, buttonBuyNow);

    summarySectionBlock.append(quantityOfPoducts, quantityOfPoductsValue, totalSum, totalSumValue, span, buyForm);
    // document.querySelector('.main')?.append(summaryBlock);

    return summaryBlock;
};
