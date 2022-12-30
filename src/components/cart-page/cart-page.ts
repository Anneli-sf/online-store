import './cart-page.scss';
import {
    createElement,
    createBlock,
    createButton,
    createLabel,
    createImage,
    createInput,
    createSimpleInput,
    createParagraph,
} from '../global-components/global-components';
import { productsData } from '../data/data';

const listBlock = createElement('ul', 'cart-list') as HTMLUListElement;

export const createCartPage = (): HTMLDivElement => {
    const cartPage = createElement('div', 'cart-wrapper') as HTMLDivElement;
    cartPage.append(createProductsCartBlock(+localStorage.getItem('currentPage') - 1), createSummaryCartBlock());
    return cartPage;
};

function sliceIntoChunks(arr: Array<number>, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export const createProductsCartBlock = (id) => {
    const cartBlock = createElement('div', 'cart-products');
    const cartBlockHeader = createElement('div', 'block-header');
    const cartBlockTitle = createElement('p', 'block-title');
    cartBlockTitle.textContent = 'Товары в корзине';

    const cartBlockContent = createElement('div', 'block-section');

    cartBlockHeader.append(cartBlockTitle, quantityProductsOnCart(), switchPagesBlock());

    const fillCartPages = (id) => {
        const arr = JSON.parse(localStorage.getItem('cartList') as string);
        if (arr.length === 0) {
            return sliceIntoChunks(JSON.parse(localStorage.getItem('cartList') as string), 3);
        } else {
            return sliceIntoChunks(JSON.parse(localStorage.getItem('cartList') as string), 3)[id];
        }
    };

    const idArray = fillCartPages(id);
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

    pagesSwitchesButtonsBlock.append(textPage, buttonSwitchPagesToLeft, currentPage, buttonSwitchPagesToRight);

    return pagesSwitchesButtonsBlock;
};

//----------------------------/HEADER

const cartProductBlock = (productId: number) => {
    const productCartBlock = createElement('li', 'cart-item') as HTMLLIElement;
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

const productsValuesBlock = (productId: number, itemQuantity = '1') => {
    const valuesBlock = createElement('div', 'values-cart-item') as HTMLDivElement;
    const stock = createParagraph('Доступно: ', 'stock') as HTMLParagraphElement;

    const stockValue = createSimpleInput(
        'stock-value',
        'number',
        '',
        `${productsData[productId].stock}`
    ) as HTMLInputElement;
    stockValue.setAttribute('readonly', 'true');
    const shtuk = createElement('span', 'stock-text') as HTMLDivElement;
    shtuk.textContent = `шт.`;

    const quantityOfItemsInCart = createSimpleInput(
        'quantity-items-cart',
        'number',
        '',
        itemQuantity
    ) as HTMLInputElement;
    quantityOfItemsInCart.setAttribute('readonly', 'true');

    const addAndDelItemsButtonsContainer = createElement('div', 'add-del-btns-container') as HTMLDivElement;
    const addItemButton = createButton('', 'add-item') as HTMLButtonElement;
    const deleteItemButton = createButton('', 'delete-item') as HTMLButtonElement;

    const totalPrice = createElement('p', 'total-price') as HTMLParagraphElement;
    totalPrice.textContent = `${productsData[7].price * +itemQuantity}`;

    stock.append(stockValue, shtuk);
    addAndDelItemsButtonsContainer.append(addItemButton, quantityOfItemsInCart, deleteItemButton);
    valuesBlock.append(stock, addAndDelItemsButtonsContainer, totalPrice);

    return valuesBlock;
};

//-----------------------------------------------------

//------------------STOCK and QUANTITY------------------
export const createSummaryCartBlock = () => {
    const summaryBlock = createBlock('summary', 'Итого') as HTMLElement;

    const summarySectionBlock = summaryBlock.querySelector('.block-section') as HTMLElement;

    const quantityOfPoducts = createParagraph('Товары, шт: ', 'quantity-products') as HTMLParagraphElement;
    const quantityOfPoductsValue = createSimpleInput('quantity-products-value', '', '', '1') as HTMLInputElement;
    const totalSum = createParagraph('Сумма: ', 'total-sum') as HTMLParagraphElement;
    const totalSumValue = createSimpleInput('total-sum-value', '', '', '100$') as HTMLInputElement;

    summarySectionBlock.append(
        quantityOfPoducts,
        quantityOfPoductsValue,
        totalSum,
        totalSumValue,
        formOfBuyProductsBlock()
    );
    // document.querySelector('.main')?.append(summaryBlock);

    return summaryBlock;
};

const formOfBuyProductsBlock = () => {
    const buyForm = createInput('promecode-input', 'text', 'Введите промокод') as HTMLFormElement; //'form-buy'

    const promoTest = createParagraph("Попробуйте: 'Гарри', 'Поттер'", 'promo-test') as HTMLParagraphElement;
    const buttonBuyNow = createButton('Купить сейчас', 'btn-buy-now');

    buyForm.append(promoTest, buttonBuyNow);

    return buyForm;
};
