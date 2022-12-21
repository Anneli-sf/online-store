// import { createElement } from '../global-components/global-components'
// import { createBlock } from '../global-components/global-components';
// import { createButton } from '../global-components/global-components';
// import { createLabel } from '../global-components/global-components';
// import { productsData } from '../products-data/products-data';
// import imageDefault from '../products-data/images_storage/kubok_ognya/kubok1.jpg';

const numberOfProductBlock = () => {
    const numberOfProduct = createElement('p', 'number-product') as HTMLParagraphElement;
    return numberOfProduct;
};

const imageProductBlock = () => {
    const image = createElement('img', 'cart-item-image') as HTMLImageElement;
    image.setAttribute('width', '100');
    image.setAttribute('src', imageDefault);

    return image;
};

const productsDescriptionBlock = () => {
    const descriptionBlock = createElement('div', 'description-cart-item') as HTMLDivElement;
    const descriptionHeader = createElement('div', 'description-header') as HTMLDivElement;
    const descriptionTitle = createElement('p', 'block-title') as HTMLParagraphElement;
    descriptionTitle.textContent = productsData[7].title;

    const descriptionContent = createElement('div', 'description-content') as HTMLDivElement;

    const miniDescription = createElement('p', 'mini-description-item') as HTMLParagraphElement;
    miniDescription.textContent = productsData[7].description;

    const raitingDiscountContainer = createElement('div', 'raiting-discount-container') as HTMLDivElement;

    const raiting = createElement('p', 'raiting') as HTMLParagraphElement;
    raiting.textContent = 'Рейтинг: ';

    const discount = createElement('p', 'discount') as HTMLParagraphElement;
    discount.textContent = 'Скидка: ';

    const raitingValue = createElement('span', 'raiting-value') as HTMLSpanElement;
    raitingValue.textContent = productsData[7].raiting;

    const discountValue = createElement('span', 'discount-value') as HTMLSpanElement;
    discountValue.textContent = productsData[7].discount;

    raiting.append(raitingValue);
    discount.append(discountValue);
    raitingDiscountContainer.append(raiting, discount);

    descriptionHeader.append(descriptionTitle);
    descriptionContent.append(miniDescription, raitingDiscountContainer);
    descriptionBlock.append(descriptionHeader, descriptionContent);

    return descriptionBlock;
};

const productsValuesBlock = () => {
    const valuesBlock = createElement('div', 'values-cart-item') as HTMLDivElement;
    const stock = createElement('p', 'stock') as HTMLParagraphElement;
    stock.textContent = 'Доступно: ';

    const stockValue = createElement('span', 'stock-value') as HTMLSpanElement;
    stockValue.textContent = '100';

    const quantityOfItemsInCart = createElement('span', 'quantity-items-cart') as HTMLSpanElement;
    quantityOfItemsInCart.textContent = '1';

    const addAndDelItemsButtonsContainer = createElement('div', 'add-del-btns-container') as HTMLDivElement;
    const addItemButton = createButton('', 'add-item') as HTMLButtonElement;
    const deleteItemButton = createButton('', 'delete-item') as HTMLButtonElement;

    const totalPrice = createElement('p', 'total-price') as HTMLParagraphElement;
    totalPrice.textContent = productsData[7].price;

    stock.append(stockValue);
    addAndDelItemsButtonsContainer.append(addItemButton, quantityOfItemsInCart, deleteItemButton);
    valuesBlock.append(stock, addAndDelItemsButtonsContainer, totalPrice);

    return valuesBlock;
};

const cartProductBlock = () => {
    const productCartBlock = createElement('li', 'cart-item') as HTMLLIElement;
    productCartBlock.append(
        numberOfProductBlock(),
        imageProductBlock(),
        productsDescriptionBlock(),
        productsValuesBlock()
    );

    return productCartBlock;
};

const quantityProductsOnCart = () => {
    const labelQuantityOfProducts = createLabel('quantity', 'Товары: ');
    const inputQuantityOfProducts = createElement('input', 'quantity') as HTMLInputElement;
    inputQuantityOfProducts.type = 'number';
    inputQuantityOfProducts.value = '1';
    labelQuantityOfProducts.append(inputQuantityOfProducts);

    return labelQuantityOfProducts;
};

const switchPagesBlock = () => {
    const pagesSwitchesButtonsBlock = createElement('div', 'btns-container-switch-pages') as HTMLDivElement;

    const currentPage = createElement('input', 'current-page') as HTMLInputElement;
    currentPage.type = 'number';
    currentPage.value = '1';

    const textPage = createElement('p', 'title-of-container-switch-btns') as HTMLParagraphElement;
    textPage.textContent = 'Страница: ';

    const buttonSwitchPagesToLeft = createButton('', 'btn-switch-page-left');
    const buttonSwitchPagesToRight = createButton('', 'btn-switch-page-right');

    pagesSwitchesButtonsBlock.append(textPage, buttonSwitchPagesToLeft, currentPage, buttonSwitchPagesToRight);

    return pagesSwitchesButtonsBlock;
};

const summaryHeaderBlock = () => {
    const summaryTitle = createElement('div', 'block-header') as HTMLDivElement;
    summaryTitle.textContent = 'Итого';

    return summaryTitle;
};

const summaryQuantityOfProductsOnCartBlock = () => {
    const quantityOfPoducts = createElement('p', 'quantity-products') as HTMLParagraphElement;
    quantityOfPoducts.textContent = 'Товары: ';

    const quantityOfPoductsValue = createElement('span', 'quantity-products-value') as HTMLSpanElement;
    quantityOfPoductsValue.textContent = '1';

    quantityOfPoducts.append(quantityOfPoductsValue);

    return quantityOfPoducts;
};

const totalSumOfAllProductsOnCart = () => {
    const totalSum = createElement('p', 'total-sum') as HTMLParagraphElement;
    totalSum.textContent = 'Сумма: ';

    const totalSumValue = createElement('span', 'total-sum-value') as HTMLSpanElement;
    totalSumValue.textContent = '100';

    totalSum.append(totalSumValue);

    return totalSum;
};

const formOfBuyProductsBlock = () => {
    const buyForm = createElement('form', 'form-buy') as HTMLFormElement;
    const promeCodeInput = createElement('input', 'promecode-input') as HTMLInputElement;
    promeCodeInput.placeholder = 'Введите промокод';

    const promoTest = createElement('p', 'promo-test') as HTMLParagraphElement;
    promoTest.textContent = "Попробуйте: 'Гарри', 'Поттер'";

    const buttonBuyNow = createButton('Купить сейчас', 'btn-buy-now');

    buyForm.append(promeCodeInput, promoTest, buttonBuyNow);

    return buyForm;
};

export const productsCartBlock = () => {
    const cartBlock = createBlock('cart-products', 'Товары в корзине');
    const listBlock = createElement('ul', 'cart-list') as HTMLUListElement;

    listBlock.append(cartProductBlock());

    document.querySelector('.main')?.append(cartBlock);
    document.querySelector('.block-header')?.append(quantityProductsOnCart(), switchPagesBlock());
    document.querySelector('.block-section')?.append(listBlock);

    document.querySelectorAll('.number-product').forEach((item, index) => {
        item.textContent = `${index + 1}`;
    });

    return cartBlock;
};

export const summaryCartBlock = () => {
    const summaryBlock = createElement('div', 'summary') as HTMLDivElement;
    const summarySectionBlock = createElement('div', 'block-section') as HTMLDivElement;

    summarySectionBlock.append(
        summaryQuantityOfProductsOnCartBlock(),
        totalSumOfAllProductsOnCart(),
        formOfBuyProductsBlock()
    );
    summaryBlock.append(summaryHeaderBlock(), summarySectionBlock);
    document.querySelector('.main')?.append(summaryBlock);

    return summaryBlock;
};
