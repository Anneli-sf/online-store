import './item-card.scss';
import {
    createButton,
    createElement,
    createImage,
    createParagraph,
} from '../../../global-components/global-components';
import { productsData } from '../../../data/data';

// const detailsLink = createElement('a', 'btn__details-link') as HTMLLinkElement;
// const buttonDetails = createButton('детали', 'btn__details') as HTMLButtonElement;

//----------------CARD
export function createProductCard(productId: number): HTMLElement {
    const productsItem = createElement('li', 'products__item') as HTMLLIElement;
    const imageContainer = createElement('div', 'image-container') as HTMLDivElement;
    const productImage = createImage(
        productsData[productId].images[0],
        productsData[productId].title,
        'products-image'
    ) as HTMLImageElement;
    productImage.id = String(productsData[productId].id);

    const productTitle = createParagraph(productsData[productId].title, 'products-title') as HTMLParagraphElement; //as HTMLLIElement;
    const productAvailable = createElement('div', 'products-available') as HTMLDivElement;
    const productPrice = createParagraph(productsData[productId].price, 'products-price') as HTMLParagraphElement; //HTMLDivElement;

    const productDiscount = createParagraph(
        `-${productsData[productId].discount}%`,
        'products__discount'
    ) as HTMLParagraphElement;
    if (!productsData[productId].discount) productDiscount.style.display = 'none';

    const buttonAdd = createBtnText(productId);
    buttonAdd.id = `${productImage.id}`;
    const buttonDetails = createButton('детали', 'btn__details') as HTMLButtonElement;
    buttonDetails.id = `${productImage.id}`;

    const buttonsItemContainer = createElement('div', 'product-buttons-container') as HTMLDivElement;
    const cardLink = createElement('a', 'card-link') as HTMLLinkElement;
    // cardLink.href = `#/details${productImage.id}`;
    cardLink.append(buttonDetails);

    imageContainer.append(productImage);
    productAvailable.append(productPrice);
    buttonsItemContainer.append(buttonAdd, cardLink);

    productsItem.append(productDiscount, imageContainer, productTitle, productAvailable, buttonsItemContainer);

    return productsItem;
}

const createBtnText = (productId: number) => {
    if (localStorage.getItem(`btn_${productId}`)) {
        return createButton(`${localStorage.getItem(`btn_${productId}`)}`, 'btn__add') as HTMLButtonElement;
    } else {
        return createButton('в корзину', 'btn__add') as HTMLButtonElement;
    }
};
