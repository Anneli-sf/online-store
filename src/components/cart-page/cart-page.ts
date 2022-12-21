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

export const productsCartBlock = () => {
    const cartBlock = createBlock('cart-products', 'Товары в корзине');
    // const listBlock = createElement('ul', 'cart-list') as HTMLUListElement;

    const blockHeader = document.querySelector('.block-header') as HTMLElement;
    blockHeader?.append(quantityProductsOnCart(), switchPagesBlock());
    createProductsList(5);

    document.querySelector('.block-section')?.append(listBlock);

    document.querySelectorAll('.number-product').forEach((item, index) => {
        item.textContent = `${index + 1}`;
    });
    // document.querySelector('.main')?.append(cartBlock);
    return cartBlock;
};

const createProductsList = (productId: number): HTMLUListElement => {
    listBlock.append(cartProductBlock(productId));

    return listBlock;
};
//----------------------------HEADER
const quantityProductsOnCart = () => {
    const labelQuantityOfProducts = createLabel('Товары: ', 'quantity');
    const inputQuantityOfProducts = createSimpleInput('quantity', 'number', '', '5') as HTMLInputElement;
    labelQuantityOfProducts.append(inputQuantityOfProducts);

    return labelQuantityOfProducts;
};

const switchPagesBlock = () => {
    const pagesSwitchesButtonsBlock = createElement('div', 'btns-container-switch-pages') as HTMLDivElement;

    const currentPage = createSimpleInput('current-page', 'number', '', '1') as HTMLInputElement;

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
        numberOfProductBlock(),
        imageProductBlock(productId),
        productsDescriptionBlock(productId),
        productsValuesBlock(productId)
    );

    return productCartBlock;
};

const numberOfProductBlock = () => {
    const numberOfProduct = createElement('p', 'number-product') as HTMLParagraphElement;
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
    const descriptionTitle = createParagraph(productsData[7].title, 'block-title') as HTMLParagraphElement;

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
export const summaryCartBlock = () => {
    const summaryBlock = createBlock('summary', 'Итого') as HTMLElement;

    const summarySectionBlock = summaryBlock.querySelector('.block-section') as HTMLElement;
    console.log(summarySectionBlock);
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
    const buyForm = createInput('promecode-input', '', 'Введите промокод') as HTMLFormElement; //'form-buy'

    const promoTest = createParagraph("Попробуйте: 'Гарри', 'Поттер'", 'promo-test') as HTMLParagraphElement;
    const buttonBuyNow = createButton('Купить сейчас', 'btn-buy-now');

    buyForm.append(promoTest, buttonBuyNow);

    return buyForm;
};
