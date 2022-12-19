import './details.scss';
import {
    createBlock,
    createButton,
    createImage,
    createBlockWithText,
    createElement,
} from '../global-components/global-components';
import { productsData } from '../data/data';

export function createDetailsPage(id: number): HTMLElement {
    const blockDetails: HTMLElement = createBlock(
        'details-block',
        productsData[id].title,
        'details-header',
        'details-section'
    );
    const sectionDetails = document.querySelector('.details-section') as HTMLElement;

    sectionDetails?.append(
        createMiniPhotosSection(),
        createActivePhotoSection(),
        createProductInfoSection(),
        createSailDetailsSection()
    );

    return blockDetails;
}

//--------------mini photos section
const createMiniPhotosSection = (id: number): HTMLElement => {
    const miniPhotosSection: HTMLElement = createElement('div', 'mini-photos-section');
    const miniPhotoFirstItem: HTMLElement = createElement('div', 'mini-photo-item');
    const miniPhotoSecondItem: HTMLElement = createElement('div', 'mini-photo-item');

    const miniPhotoFirsImg: HTMLImageElement = createImage(
        productsData[id].images[0],
        productsData[id].title,
        'mini-photo-img'
    );
    const miniPhotoSecondImg: HTMLImageElement = createImage(
        productsData[id].images[1],
        productsData[id].title,
        'mini-photo-img'
    );

    miniPhotoFirstItem.append(miniPhotoFirsImg);
    miniPhotoSecondItem.append(miniPhotoSecondImg);
    miniPhotosSection.append(miniPhotoFirstItem, miniPhotoSecondItem);

    return miniPhotosSection;
};

//--------------active photo section
const createActivePhotoSection = (id: number): HTMLElement => {
    const activePhotoSection: HTMLElement = createElement('div', 'active-photo-section');
    const activePhotoItem: HTMLElement = createElement('div', 'active-photo-item');
    const activePhotoImg: HTMLImageElement = createImage(
        productsData[id].images[0],
        productsData[id].title,
        'active-photo-img'
    );
    activePhotoItem.append(activePhotoImg);
    activePhotoSection.append(activePhotoItem);

    return activePhotoSection;
};

//--------------product all info section
const createProductInfoSection = (id: number): HTMLElement => {
    const productInfoSection: HTMLElement = createElement('div', 'product-info-section');
    const productDescripSection: HTMLElement = createBlockWithText(
        'product-descrip-block',
        'descrip-text',
        productsData[id].description,
        'product-descrip-header',
        'Описание',
        'product-descrip-section'
    );

    const productCategoriespSection: HTMLElement = createElement('div', 'product-categories-section');
    const productCategory: HTMLElement = createBlockWithText(
        'product-category',
        'category-text',
        productsData[id].category,
        'category-header',
        'Категория',
        'category-section'
    );
    const productSubcategory: HTMLElement = createBlockWithText(
        'product-subcategory',
        'subcategory-text',
        productsData[id].subcategory,
        'subcategory-header',
        'Подкатегория',
        'subcategory-section'
    );
    productCategoriespSection.append(productCategory, productSubcategory);

    const productAddInfoSection: HTMLElement = createElement('div', 'product-add-info-section');
    const productStock: HTMLElement = createBlockWithText(
        'product-stock',
        'stock-text',
        productsData[id].stock,
        'stock-header',
        'В наличии',
        'stock-section'
    );
    const productDiscount: HTMLElement = createBlockWithText(
        'product-discount',
        'discount-text',
        productsData[id].discount,
        'discount-header',
        'Скидка',
        'discount-section'
    );
    productAddInfoSection.append(productStock, productDiscount);

    productInfoSection.append(productDescripSection, productCategoriespSection, productAddInfoSection);

    return productInfoSection;
};

const createSailDetailsSection = (id: number): HTMLElement => {
    const sailDetailsSection: HTMLElement = createElement('div', 'sail-details-section');

    const priceBlock: HTMLElement = createElement('div', 'price-block');
    priceBlock.innerText = `${productsData[id].price}$`;

    const buttonAddToCart: HTMLButtonElement = createButton('добавить в корзину', 'btn-add-to-cart');
    const buttonBuyNow: HTMLButtonElement = createButton('быстрая покупка', 'btn-buy-now');

    sailDetailsSection.append(priceBlock, buttonAddToCart, buttonBuyNow);
    return sailDetailsSection;
};

export const createNavigation = (id: number): HTMLElement => {
    const list: HTMLElement = createElement('div', 'nav-list');
    const navStore: HTMLButtonElement = createButton('все товары', 'nav-list-btn');
    const navCategory: HTMLButtonElement = createButton(productsData[id].category, 'nav-list-btn');
    const navSubCategory: HTMLButtonElement = createButton(productsData[id].subcategory, 'nav-list-btn');
    const navProduct: HTMLButtonElement = createButton(productsData[id].title, 'nav-list-btn');
    navProduct.classList.add('active');

    list.append(navStore, navCategory, navSubCategory, navProduct);

    return list;
};
