import './item-card.scss';
import { createButton, createElement, createImage, createParagraph } from '../../global-components/global-components';
import { productsData } from '../../data/data';

//----------------CARD
export function createProductCard(productId: number): HTMLElement {
    const productsItem = createElement('li', 'products__item') as HTMLLIElement;
    const imageContainer = createElement('div', 'image-container') as HTMLDivElement;
    const productImage = createImage(
        productsData[productId].images[0],
        productsData[productId].title,
        'products-image'
    ) as HTMLImageElement;
    const productTitle = createParagraph(productsData[productId].title, 'products-title') as HTMLParagraphElement; //as HTMLLIElement;
    const productAvailable = createElement('div', 'products-available') as HTMLDivElement;
    const productPrice = createParagraph(productsData[productId].price, 'products-price') as HTMLParagraphElement; //HTMLDivElement;
    const productDiscount = createParagraph(
        productsData[productId].discount,
        'products__discount'
    ) as HTMLParagraphElement;
    const buttonAdd = createButton('в корзину', 'btn__add') as HTMLButtonElement;
    const buttonDetails = createButton('детали', 'btn__details') as HTMLButtonElement;
    const buttonsItemContainer = createElement('div', 'product-buttons-container') as HTMLDivElement;
    productImage.style.width = '100%';
    productImage.style.height = '100%';

    // productAvailable.append(productPrice.cloneNode(true));
    productAvailable.append(productPrice);
    buttonsItemContainer.append(buttonAdd, buttonDetails);

    productsItem.append(productDiscount, imageContainer, productTitle, productAvailable, buttonsItemContainer);

    //----ДОПИСАТЬ

    return productsItem;
}

// document.querySelectorAll('.products__item').forEach((item: Element) => {
//     item.append(productDiscount.cloneNode(true));
//     item.append(imageContainer.cloneNode(true));
//     item.append(productTitle.cloneNode(true));
//     item.append(productAvailable.cloneNode(true));
//     item.append(buttonsItemContainer.cloneNode(true));
// });
