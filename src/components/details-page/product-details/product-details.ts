import './product-details.scss';
import { productsData } from '../../data/data';
import {
    createBlock,
    createBlockWithText,
    createImage,
    createElement,
    createButton,
} from '../../global-components/global-components';
import { createCartPage } from '../../cart-page/cart-page';
import { createContainerCard } from '../../modal-window-page/modal-window-page';

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
        'mini-photo-img',
        'first-mini-img'
    );
    const miniPhotoSecondImg: HTMLImageElement = createImage(
        productsData[productId].images[1],
        productsData[productId].title,
        'mini-photo-img',
        'second-mini-img'
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
        'active-photo-img',
        `${productId}`
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
//--------------------------------------------------------
const mainSection = document.querySelector('.main') as HTMLDivElement;

const quickAddProductToCart = (productId: number) => {
    const arr = JSON.parse(localStorage.getItem('cartList') as string);
    const arr2 = JSON.parse(localStorage.getItem('cartItems') as string);
    if (!arr.includes(productId)) {
        arr.push(productId);
    }
    if (!arr2.includes(productsData[productId])) {
        arr2.push(productsData[productId]);
    }
    localStorage.setItem('cartList', JSON.stringify(arr));
    localStorage.setItem('cartItems', JSON.stringify(arr2));
    localStorage.setItem('totalStock', String(+(localStorage.getItem('totalStock') as string) + 1));
    (document.querySelector('.found-products') as HTMLSpanElement).textContent = localStorage.getItem('totalStock');
    localStorage.setItem(
        'totalPrice',
        String(+(localStorage.getItem('totalPrice') as string) + productsData[productId].price)
    );
    (document.querySelector('.total-quantity-header') as HTMLSpanElement).textContent = localStorage.getItem(
        'totalPrice'
    ) as string;
    localStorage.setItem(`btn_${productId}`, 'добавлен');
    document.querySelectorAll('.btn__add').forEach((item) => {
        if (+item.id === productId) {
            item.textContent = 'добавлен';
        }
    });
    localStorage.setItem(`stock_${productId}`, `${productsData[productId].stock - 1}`);
};

//--------------section with price and buttons for purchase
const createSailDetailsSection = (productId: number): HTMLElement => {
    const sailDetailsSection: HTMLElement = createElement('div', 'sail-details-section');

    const priceBlock: HTMLElement = createElement('div', 'price-block');
    priceBlock.innerText = `${productsData[productId].price}$`;
    let text = '';

    if (localStorage.getItem(`btn_${productId}`)) {
        text = `${localStorage.getItem(`btn_${productId}`)}`;
    } else {
        text = 'в корзину';
    }

    const buttonAddToCart: HTMLButtonElement = createButton(text, 'btn__add');
    buttonAddToCart.id = `${productId}`;
    buttonAddToCart.classList.add('button-second');
    const buttonBuyNow: HTMLButtonElement = createButton('быстрая покупка', 'btn-buy-now');
    buttonBuyNow.id = `${productId}`;
    buttonBuyNow.classList.add('button-second');

    buttonBuyNow.addEventListener('click', () => {
        if (localStorage.getItem(`btn_${productId}`) === 'добавлен') {
            mainSection.innerHTML = '';
            mainSection.append(createCartPage(), createContainerCard());
        } else {
            quickAddProductToCart(productId);
            mainSection.innerHTML = '';
            mainSection.append(createCartPage(), createContainerCard());
        }
    });

    sailDetailsSection.append(priceBlock, buttonAddToCart, buttonBuyNow);
    return sailDetailsSection;
};

document.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.closest('.mini-photo-img')) {
        const element = e.target as HTMLImageElement;
        const activeImg = document.querySelector('.active-photo-img') as HTMLImageElement;

        if (element.id === 'first-mini-img') {
            activeImg.src = productsData[+activeImg.id].images[0];
        } else if (element.id === 'second-mini-img') {
            activeImg.src = productsData[+activeImg.id].images[1];
        }
    }
});
