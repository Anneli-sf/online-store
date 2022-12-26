import './product-details.scss';
import { productsData } from '../../data/data';
import {
    createBlock,
    createBlockWithText,
    createImage,
    createElement,
    createButton,
} from '../../global-components/global-components';

//--------------section with all info about product
export function createDetailsBlock(productId: number): HTMLElement {
    const blockDetails: HTMLElement = createBlock(
        'details-block',
        productsData[productId].title,
        'details-header',
        'details-section'
    );
    const sectionDetails = blockDetails.querySelector('.details-section') as HTMLElement;

    sectionDetails?.append(
        createMiniPhotosSection(productId),
        createActivePhotoSection(productId),
        createProductInfoSection(productId),
        createSailDetailsSection(productId)
    );

    return blockDetails;
}

//--------------mini photos section
const createMiniPhotosSection = (productId: number): HTMLElement => {
    const miniPhotosSection: HTMLElement = createElement('div', 'mini-photos-section');
    const miniPhotoFirstItem: HTMLElement = createElement('div', 'mini-photo-item');
    const miniPhotoSecondItem: HTMLElement = createElement('div', 'mini-photo-item');

    const miniPhotoFirsImg: HTMLImageElement = createImage(
        productsData[productId].images[0],
        productsData[productId].title,
        'mini-photo-img'
    );
    const miniPhotoSecondImg: HTMLImageElement = createImage(
        productsData[productId].images[1],
        productsData[productId].title,
        'mini-photo-img'
    );

    miniPhotoFirstItem.append(miniPhotoFirsImg);
    miniPhotoSecondItem.append(miniPhotoSecondImg);
    miniPhotosSection.append(miniPhotoFirstItem, miniPhotoSecondItem);

    return miniPhotosSection;
};

//--------------active photo section
const createActivePhotoSection = (productId: number): HTMLElement => {
    const activePhotoSection: HTMLElement = createElement('div', 'active-photo-section');
    const activePhotoItem: HTMLElement = createElement('div', 'active-photo-item');
    const activePhotoImg: HTMLImageElement = createImage(
        productsData[productId].images[0],
        productsData[productId].title,
        'active-photo-img'
    );
    activePhotoItem.append(activePhotoImg);
    activePhotoSection.append(activePhotoItem);

    return activePhotoSection;
};

//--------------product info section
const createProductInfoSection = (productId: number): HTMLElement => {
    const productInfoSection: HTMLElement = createElement('div', 'product-info-section');
    const productDescripSection: HTMLElement = createBlockWithText(
        'product-descrip-block',
        'descrip-text',
        productsData[productId].description,
        'product-descrip-header',
        'Описание',
        'product-descrip-section'
    );

    const productCategoriesSection: HTMLElement = createElement('div', 'product-categories-section');
    const productCategory: HTMLElement = createBlockWithText(
        'product-category',
        'category-text',
        productsData[productId].category,
        'category-header',
        'Категория',
        'category-section'
    );
    const productSubcategory: HTMLElement = createBlockWithText(
        'product-subcategory',
        'subcategory-text',
        productsData[productId].subcategory,
        'subcategory-header',
        'Подкатегория',
        'subcategory-section'
    );
    productCategoriesSection.append(productCategory, productSubcategory);

    const productAddInfoSection: HTMLElement = createElement('div', 'product-add-info-section');
    const productStock: HTMLElement = createBlockWithText(
        'product-stock',
        'stock-text',
        productsData[productId].stock,
        'stock-header',
        'В наличии',
        'stock-section'
    );
    const productDiscount: HTMLElement = createBlockWithText(
        'product-discount',
        'discount-text',
        productsData[productId].discount,
        'discount-header',
        'Скидка',
        'discount-section'
    );
    productAddInfoSection.append(productStock, productDiscount);

    productInfoSection.append(productDescripSection, productCategoriesSection, productAddInfoSection);

    return productInfoSection;
};

//--------------section with price and buttons for purchase
const createSailDetailsSection = (productId: number): HTMLElement => {
    const sailDetailsSection: HTMLElement = createElement('div', 'sail-details-section');

    const priceBlock: HTMLElement = createElement('div', 'price-block');
    priceBlock.innerText = `${productsData[productId].price}$`;

    const buttonAddToCart: HTMLButtonElement = createButton('добавить в корзину', 'btn-add-to-cart');
    const buttonBuyNow: HTMLButtonElement = createButton('быстрая покупка', 'btn-buy-now');

    sailDetailsSection.append(priceBlock, buttonAddToCart, buttonBuyNow);
    return sailDetailsSection;
};
