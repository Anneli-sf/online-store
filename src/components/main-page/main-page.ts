// import { productsData } from '../products-data/products-data';
// import logoImage from '../../assets/images/gif/logo.gif';
// import basketLogo from '../../assets/images/png/basket.png';
// import background from '../../assets/images/jpg/background.jpg';
// import backgroundHeader from '../../assets/images/gif/background.gif';

// import arrow from '../../assets/images/svg/arrow-down.svg';
// import foto1 from '../../components/products-data/images_storage/mech_Griffindora/grif1.png';
// import foto2 from '../../components/products-data/images_storage/mantiya_nevidimka/mant1.jpg';
// import foto3 from '../../components/products-data/images_storage/kulon_Dari_smerti/kulon1.jpg';
// import foto4 from '../../components/products-data/images_storage/mahovic_vremeni/mah1.jpg';
// import foto5 from '../../components/products-data/images_storage/snitch/snitch1.jpg';
// import foto6 from '../../components/products-data/images_storage/filosofskii_kamen/stone1.png';
// import foto7 from '../../components/products-data/images_storage/raspredelyaushaya_shlyapa/shlyapa1.jpg';
// import foto8 from '../../components/products-data/images_storage/kubok_ognya/kubok1.jpg';
// import foto9 from '../../components/products-data/images_storage/medalion_Slizerina/sliz1.jpg';
// import foto10 from '../../components/products-data/images_storage/palochka_Volan-de-Morta/palochka1.jpg';
// import foto11 from '../../components/products-data/images_storage/syvorotka_pravdi/syvorotka1.jpg';
// import foto12 from '../../components/products-data/images_storage/zerkalo/zerkalo1.jpg';
// import foto13 from '../../components/products-data/images_storage/buzinnaya_palochka/buz1.png';
// import foto14 from '../../components/products-data/images_storage/volshebnuie_shahmati/shah1.jpg';
// import foto15 from '../../components/products-data/images_storage/voskreshaiushii_kamen/voskr1.png';
// import foto16 from '../../components/products-data/images_storage/dnevnik_Redla/dnevnik1.jpg';
// import foto17 from '../../components/products-data/images_storage/chasi_Uizly/clock1.jpg';
// import foto18 from '../../components/products-data/images_storage/deluminator/delum1.png';
// import foto19 from '../../components/products-data/images_storage/nimbus2000/nimb1.png';
// import foto20 from '../../components/products-data/images_storage/automobile/auto1.png';
// import foto21 from '../../components/products-data/images_storage/carta_maradera/carta1.jpg';
// import foto22 from '../../components/products-data/images_storage/amortecia/amor1.jpg';
// import foto23 from '../../components/products-data/images_storage/chupakabra/chup1.png';
// import foto24 from '../../components/products-data/images_storage/dementor/demen1.jpg';
// import foto25 from '../../components/products-data/images_storage/dobbi/dob1.jpg';
// import foto26 from '../../components/products-data/images_storage/eliksir_is_mandragori/mandr1.jpg';
// import foto27 from '../../components/products-data/images_storage/eliksir_sgizni/sgizn1.jpg';
// import foto28 from '../../components/products-data/images_storage/express/exp1.jpg';
// import foto29 from '../../components/products-data/images_storage/fenix/fenix1.jpg';
// import foto30 from '../../components/products-data/images_storage/gerbicid/gerb1.jpg';
// import foto31 from '../../components/products-data/images_storage/kosterost/kost1.jpg';
// import foto32 from '../../components/products-data/images_storage/manticora/mantic1.jpg';
// import foto33 from '../../components/products-data/images_storage/palochka_Wuizli/wuizli2.jpg';
// import foto34 from '../../components/products-data/images_storage/palocka_Draco-Malfoya/malfoi1.jpg';
// import foto35 from '../../components/products-data/images_storage/pushistik/push1.jpg';
// import foto36 from '../../components/products-data/images_storage/salamandra/sal1.png';
// import foto37 from '../../components/products-data/images_storage/shkaf/shkaf1.jpg';
// import foto38 from '../../components/products-data/images_storage/uidosoros/uido1.jpg';
// import foto39 from '../../components/products-data/images_storage/umenishaiushee_zelie/umen1.jpg';
// import foto40 from '../../components/products-data/images_storage/vasilisk/vasil1.jpg';

// const array = [
//     foto1,
//     foto2,
//     foto3,
//     foto4,
//     foto5,
//     foto6,
//     foto7,
//     foto8,
//     foto9,
//     foto10,
//     foto11,
//     foto12,
//     foto13,
//     foto14,
//     foto15,
//     foto16,
//     foto17,
//     foto18,
//     foto19,
//     foto20,
//     foto21,
//     foto22,
//     foto23,
//     foto24,
//     foto25,
//     foto26,
//     foto27,
//     foto28,
//     foto29,
//     foto30,
//     foto31,
//     foto32,
//     foto33,
//     foto34,
//     foto35,
//     foto36,
//     foto37,
//     foto38,
//     foto39,
//     foto40,
// ] as Array<string>;

const createElement = (tag: string, className: string): HTMLElement | null => {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
};

const body = document.querySelector('.body') as HTMLBodyElement;
const header = document.querySelector('.header') as HTMLBodyElement;
const main = document.querySelector('.main') as HTMLBodyElement;
const footer = document.querySelector('.footer') as HTMLBodyElement;

const logo = createElement('img', 'logo') as HTMLImageElement;
const quantity = createElement('p', 'quantity') as HTMLParagraphElement;
const basket = createElement('img', 'basket') as HTMLImageElement;

const asideBlock = createElement('aside', 'main__aside') as HTMLElement;
const contentBlock = createElement('div', 'products') as HTMLDivElement;
const sortBlock = createElement('div', 'products__header') as HTMLDivElement;

const sortList = createElement('ul', 'sort__list') as HTMLUListElement;
const sortArrow = createElement('img', 'sort-arrow') as HTMLImageElement;
const sortItemAlphabetAZ = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemAlphabetZA = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemCategory = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemSubCategory = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemPrice = createElement('li', 'sort__item') as HTMLLIElement;
const sortItemDiscount = createElement('li', 'sort__item') as HTMLLIElement;

const sortText = createElement('p', 'sort__text') as HTMLParagraphElement;
const sortInput = createElement('input', 'sort__input') as HTMLInputElement;

const productsList = createElement('ul', 'products__list') as HTMLUListElement;
const productsItem = createElement('li', 'products__item') as HTMLLIElement;
const imageContainer = createElement('div', 'image-container') as HTMLDivElement;
const productImage = createElement('img', 'products-image') as HTMLImageElement;
const productTitle = createElement('p', 'products-title') as HTMLLIElement;
const productAvailable = createElement('div', 'products-available') as HTMLDivElement;
const productPrice = createElement('p', 'products-price') as HTMLDivElement;

const productDiscount = createElement('p', 'products__discount') as HTMLParagraphElement;

const buttonContainer = createElement('div', 'btn__container') as HTMLDivElement;
const buttonReset = createElement('button', 'btn__reset') as HTMLButtonElement;
const buttonCopy = createElement('button', 'btn__copy') as HTMLButtonElement;
const buttonsItemContainer = createElement('div', 'product-buttons-container') as HTMLDivElement;
const buttonAdd = createElement('button', 'btn__add') as HTMLButtonElement;
const buttonDetails = createElement('button', 'btn__details') as HTMLButtonElement;

const filterCategory = createElement('div', 'filter__category') as HTMLDivElement;
const filterSubcategory = createElement('div', 'filter__subcategory') as HTMLDivElement;
const filterPrice = createElement('div', 'filter__price') as HTMLDivElement;
const filterCategoryHeader = createElement('h3', 'filter-category-title') as HTMLHeadingElement;
const filterSubcategoryHeader = createElement('h3', 'filter-subcategory-title') as HTMLHeadingElement;
const filterPriceHeader = createElement('h3', 'filter-price-title') as HTMLHeadingElement;
const categoryForm = createElement('form', 'form__category') as HTMLFormElement;
const subcategoryForm = createElement('form', 'form__category') as HTMLFormElement;

const categoryFormLabelSport = createElement('label', 'category-label') as HTMLInputElement;
const categoryFormLabelClothes = createElement('label', 'category-label') as HTMLInputElement;
const categoryFormLabelMagicItems = createElement('label', 'category-label') as HTMLInputElement;
const categoryFormLabelPotions = createElement('label', 'category-label') as HTMLInputElement;
const categoryFormLabelAuto = createElement('label', 'category-label') as HTMLInputElement;
const categoryFormLabelMagicalCreatures = createElement('label', 'category-label') as HTMLInputElement;
const subcategoryFormLabelSticks = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelStones = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelInteriorItems = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelBooks = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelWeapon = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelCLothes = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelAccessories = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelFlyingObjects = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelGoodPotions = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelPositiveBeings = createElement('label', 'subcategory-label') as HTMLInputElement;
const subcategoryFormLabelNegativeBeings = createElement('label', 'subcategory-label') as HTMLInputElement;
const checkbox = createElement('div', 'checkbox') as HTMLDivElement;

const categoryFormInputSport = createElement('input', 'category-input') as HTMLInputElement;
const categoryFormInputClothes = createElement('input', 'category-input') as HTMLInputElement;
const categoryFormInputMagicItems = createElement('input', 'category-input') as HTMLInputElement;
const categoryFormInputPotions = createElement('input', 'category-input') as HTMLInputElement;
const categoryFormInputAuto = createElement('input', 'category-input') as HTMLInputElement;
const categoryFormInputMagicalCreatures = createElement('input', 'category-input') as HTMLInputElement;
const subcategoryFormInputSticks = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputStones = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputInteriorItems = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputBooks = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputWeapon = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputCLothes = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputAccessories = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputFlyingObjects = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputGoodPotions = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputPositiveBeings = createElement('input', 'subcategory-input') as HTMLInputElement;
const subcategoryFormInputNegativeBeings = createElement('input', 'subcategory-input') as HTMLInputElement;

const rangeContainer = createElement('div', 'range-container') as HTMLDivElement;
const sliderControl = createElement('div', 'slider-control') as HTMLDivElement;
const formControl = createElement('div', 'form-control') as HTMLDivElement;
const formControlContainerMin = createElement('div', 'form-control-container') as HTMLDivElement;
const formControlContainerMax = createElement('div', 'form-control-container') as HTMLDivElement;
const formControlContainerMinTime = createElement('div', 'form-control-container__time') as HTMLDivElement;
const formControlContainerMaxTime = createElement('div', 'form-control-container__time') as HTMLDivElement;
const sliderInputFrom = createElement('input', 'from-slider') as HTMLInputElement;
const sliderInputTo = createElement('input', 'to-slider') as HTMLInputElement;
const formControlTimeInputMin = createElement('input', 'form_control_container__time__input_min') as HTMLInputElement;
const formControlTimeInputMax = createElement('input', 'form_control_container__time__input_max') as HTMLInputElement;

const footerRsSchoolLogo = createElement('a', 'rs-logo') as HTMLLinkElement;
const gitHubLogoAnneli = createElement('a', 'anneli-github-logo') as HTMLLinkElement;
const gitHubLogoAlex = createElement('a', 'alex-github-logo') as HTMLLinkElement;

// body.style.backgroundImage = `url(${background})`;
// header.style.backgroundImage = `url(${backgroundHeader})`;
// footer.style.backgroundImage = `url(${backgroundHeader})`;

// logo.src = logoImage;
// basket.src = basketLogo;
logo.style.width = '200px';
basket.style.width = '30px';
quantity.textContent = 'Общая сумма: 0';
sortText.textContent = 'Найдено товаров: 0';
sortList.textContent = 'Сортировка по:';
sortInput.placeholder = 'Найти товар';
sortItemAlphabetAZ.textContent = 'Сортировка по алфавиту A-Я';
sortItemAlphabetZA.textContent = 'Сортировка по алфавиту Я-А';
sortItemCategory.textContent = 'Сортировка по категории';
sortItemSubCategory.textContent = 'Сортировка по подкатегории';
sortItemPrice.textContent = 'Сортировка по цене';
sortItemDiscount.textContent = 'Сортировка по скидке';
// sortArrow.src = arrow;
buttonReset.textContent = 'сбросить';
buttonCopy.textContent = 'скопировать';
buttonAdd.textContent = 'в корзину';
buttonDetails.textContent = 'детали';
filterCategoryHeader.textContent = 'Категории';
filterSubcategoryHeader.textContent = 'Подкатегории';
filterPriceHeader.textContent = 'Цена';
categoryFormLabelAuto.textContent = 'Транспорт';
categoryFormLabelClothes.textContent = 'Одежда и аксессуары';
categoryFormLabelMagicItems.textContent = 'Магические предметы';
categoryFormLabelPotions.textContent = 'Зелья';
categoryFormLabelSport.textContent = 'Спорт';
categoryFormLabelMagicalCreatures.textContent = 'Магические существа';
subcategoryFormLabelAccessories.textContent = 'Аксессуары';
subcategoryFormLabelBooks.textContent = 'Книжные товары';
subcategoryFormLabelCLothes.textContent = 'Одежда';
subcategoryFormLabelFlyingObjects.textContent = 'Летающие объекты';
subcategoryFormLabelGoodPotions.textContent = 'Добрые зелья';
subcategoryFormLabelInteriorItems.textContent = 'Предметы интерьера';
subcategoryFormLabelSticks.textContent = 'Волшебные палочки';
subcategoryFormLabelStones.textContent = 'Камни';
subcategoryFormLabelWeapon.textContent = 'Оружие';
subcategoryFormLabelPositiveBeings.textContent = 'Положительные существа';
subcategoryFormLabelNegativeBeings.textContent = 'Отрицательные существа';
footerRsSchoolLogo.href = 'https://rs.school/js/';
gitHubLogoAnneli.href = 'https://github.com/anneli-sf';
gitHubLogoAlex.href = 'https://github.com/MaestroFront';
footerRsSchoolLogo.target = '_blank';
gitHubLogoAnneli.target = '_blank';
gitHubLogoAlex.target = '_blank';

sliderInputFrom.type = 'range';
sliderInputTo.type = 'range';
sliderInputFrom.value = '0';
sliderInputFrom.min = '0';
sliderInputFrom.max = '100';
sliderInputTo.value = '100';
sliderInputTo.min = '0';
sliderInputTo.max = '100';

formControlTimeInputMin.type = 'number';
formControlTimeInputMax.type = 'number';
formControlTimeInputMin.value = '0';
formControlTimeInputMax.value = '100';
formControlContainerMinTime.textContent = 'Min';
formControlContainerMaxTime.textContent = 'Max';

productImage.style.width = '100%';
productImage.style.height = '100%';

formControlContainerMin.append(formControlContainerMinTime);
formControlContainerMin.append(formControlTimeInputMin);
formControlContainerMax.append(formControlContainerMaxTime);
formControlContainerMax.append(formControlTimeInputMax);
formControl.append(formControlContainerMin);
formControl.append(formControlContainerMax);
sliderControl.append(sliderInputFrom);
sliderControl.append(sliderInputTo);
rangeContainer.append(sliderControl);
rangeContainer.append(formControl);

header.append(logo);
header.append(quantity);
header.append(basket);

main.append(asideBlock);
main.append(contentBlock);
contentBlock.append(sortBlock);
contentBlock.append(productsList);

sortList.append(sortItemAlphabetAZ);
sortList.append(sortItemAlphabetZA);
sortList.append(sortItemCategory);
sortList.append(sortItemSubCategory);
sortList.append(sortItemPrice);
sortList.append(sortItemDiscount);
sortList.append(sortArrow);

sortBlock.append(sortList);
sortBlock.append(sortText);
sortBlock.append(sortInput);

categoryFormLabelAuto.append(categoryFormInputAuto);
categoryFormLabelClothes.append(categoryFormInputClothes);
categoryFormLabelMagicItems.append(categoryFormInputMagicItems);
categoryFormLabelPotions.append(categoryFormInputPotions);
categoryFormLabelSport.append(categoryFormInputSport);
categoryFormLabelMagicalCreatures.append(categoryFormInputMagicalCreatures);
subcategoryFormLabelAccessories.append(subcategoryFormInputAccessories);
subcategoryFormLabelBooks.append(subcategoryFormInputBooks);
subcategoryFormLabelCLothes.append(subcategoryFormInputCLothes);
subcategoryFormLabelFlyingObjects.append(subcategoryFormInputFlyingObjects);
subcategoryFormLabelGoodPotions.append(subcategoryFormInputGoodPotions);
subcategoryFormLabelInteriorItems.append(subcategoryFormInputInteriorItems);
subcategoryFormLabelSticks.append(subcategoryFormInputSticks);
subcategoryFormLabelStones.append(subcategoryFormInputStones);
subcategoryFormLabelWeapon.append(subcategoryFormInputWeapon);
subcategoryFormLabelPositiveBeings.append(subcategoryFormInputPositiveBeings);
subcategoryFormLabelNegativeBeings.append(subcategoryFormInputNegativeBeings);

asideBlock.append(buttonContainer);
buttonContainer.append(buttonReset);
buttonContainer.append(buttonCopy);
asideBlock.append(filterCategory);
asideBlock.append(filterSubcategory);
asideBlock.append(filterPrice);
filterCategory.append(filterCategoryHeader);
filterSubcategory.append(filterSubcategoryHeader);
filterPrice.append(filterPriceHeader);
filterPrice.append(rangeContainer);
filterCategory.append(categoryForm);
filterSubcategory.append(subcategoryForm);
categoryForm.append(categoryFormLabelAuto);
categoryForm.append(categoryFormLabelClothes);
categoryForm.append(categoryFormLabelMagicItems);
categoryForm.append(categoryFormLabelPotions);
categoryForm.append(categoryFormLabelSport);
categoryForm.append(categoryFormLabelMagicalCreatures);
subcategoryForm.append(subcategoryFormLabelAccessories);
subcategoryForm.append(subcategoryFormLabelBooks);
subcategoryForm.append(subcategoryFormLabelCLothes);
subcategoryForm.append(subcategoryFormLabelFlyingObjects);
subcategoryForm.append(subcategoryFormLabelGoodPotions);
subcategoryForm.append(subcategoryFormLabelInteriorItems);
subcategoryForm.append(subcategoryFormLabelSticks);
subcategoryForm.append(subcategoryFormLabelStones);
subcategoryForm.append(subcategoryFormLabelWeapon);
subcategoryForm.append(subcategoryFormLabelPositiveBeings);
subcategoryForm.append(subcategoryFormLabelNegativeBeings);

footer.append(footerRsSchoolLogo);
footer.append(logo.cloneNode(true));
footer.append(gitHubLogoAnneli);
footer.append(gitHubLogoAlex);

productAvailable.append(productPrice.cloneNode(true));

buttonsItemContainer.append(buttonAdd);
buttonsItemContainer.append(buttonDetails);

document.querySelectorAll('.category-label').forEach((item) => {
    item.append(checkbox.cloneNode(true));
});

document.querySelectorAll('.subcategory-label').forEach((item) => {
    item.append(checkbox.cloneNode(true));
});

document.querySelectorAll('.category-input').forEach((item) => {
    item.setAttribute('type', 'checkbox');
});

document.querySelectorAll('.subcategory-input').forEach((item) => {
    item.setAttribute('type', 'checkbox');
});

const fillProductsList = () => {
    let i = 0;
    while (i < 40) {
        productsList.append(productsItem.cloneNode(true));
        i++;
    }
    return productsList;
};
fillProductsList();

document.querySelectorAll('.products__item').forEach((item: Element) => {
    item.append(productDiscount.cloneNode(true));
    item.append(imageContainer.cloneNode(true));
    item.append(productTitle.cloneNode(true));
    item.append(productAvailable.cloneNode(true));
    item.append(buttonsItemContainer.cloneNode(true));
});

// document.querySelectorAll('.products__discount').forEach((item, index) => {
//     item.textContent = productsData[index].discount;
// });

document.querySelectorAll('.image-container').forEach((item) => {
    item.append(productImage.cloneNode(true));
});

// document.querySelectorAll('.products-image').forEach((item, index: number) => {
//     item.setAttribute('src', array[index]);
// });

// document.querySelectorAll('.products-title').forEach((item, index) => {
//     item.textContent = productsData[index].title;
// });

// document.querySelectorAll('.products-category').forEach((item, index) => {
//     item.textContent = productsData[index].category;
// });

// document.querySelectorAll('.products-price').forEach((item, index) => {
//     item.textContent = productsData[index].price;
// });

document.querySelectorAll('.products-quantity').forEach((item) => {
    item.textContent = '100 шт';
});

sortArrow.addEventListener('click', () => {
    if (sortList.classList.contains('open')) {
        sortList.classList.remove('open');
        sortList.style.backgroundColor = 'transparent';
        sortList.style.color = 'white';
        sortItemAlphabetAZ.style.transform = 'scale(0)';
        sortItemAlphabetZA.style.transform = 'scale(0)';
        sortItemCategory.style.transform = 'scale(0)';
        sortItemSubCategory.style.transform = 'scale(0)';
        sortItemPrice.style.transform = 'scale(0)';
        sortItemDiscount.style.transform = 'scale(0)';
        sortArrow.style.transform = 'scale(1, 1)';
    } else {
        sortList.classList.add('open');
        sortList.style.backgroundColor = 'white';
        sortList.style.color = 'black';
        sortItemAlphabetAZ.style.transform = 'scale(1)';
        sortItemAlphabetZA.style.transform = 'scale(1)';
        sortItemCategory.style.transform = 'scale(1)';
        sortItemSubCategory.style.transform = 'scale(1)';
        sortItemPrice.style.transform = 'scale(1)';
        sortItemDiscount.style.transform = 'scale(1)';
        sortArrow.style.transform = 'scale(1, -1)';
    }
});

Array.from(categoryForm).forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.checkbox')[index].classList.toggle('checked');
    });
});

Array.from(subcategoryForm).forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.checkbox')[index + 6].classList.toggle('checked');
    });
});

function controlFromInput(
    fromSlider: { value: string | number },
    fromInput: { value: number | string },
    toInput: { value: string; min: string | number; max: string | number },
    controlSlider: { value: string | number; style: { background: string } }
) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}

function controlToInput(
    toSlider: { value: string | number },
    fromInput: { value: string },
    toInput: { value: number | string; min: string | number; max: string | number },
    controlSlider: HTMLInputElement
) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(
    fromSlider: { value: number | string },
    toSlider: { value: string | number; style: { background: string }; min: string | number; max: string | number },
    fromInput: { value: number | string }
) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromInput.value = from;
    }
}

function controlToSlider(
    fromSlider: { value: number | string },
    toSlider: { value: string | number; style: { background: string }; min: string | number; max: string | number },
    toInput: { value: number | string }
) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
        toSlider.value = from;
    }
}

function getParsed(currentFrom: { value: number | string }, currentTo: { value: number | string }) {
    const from = parseInt(`${currentFrom.value}`, 10);
    const to = parseInt(`${currentTo.value}`, 10);
    return [from, to];
}

function fillSlider(
    from: { value: string | number },
    to: { value: string | number; min: string | number; max: string | number },
    sliderColor: string,
    rangeColor: string,
    controlSlider: { value: string | number; style: { background: string } }
) {
    const rangeDistance = +to.max - +to.min;
    const fromPosition = +from.value - +to.min;
    const toPosition = +to.value - +to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget: { value: string | number }) {
    const toSlider = document.querySelector('.to-slider') as HTMLInputElement;
    if (Number(currentTarget.value) <= 0) {
        toSlider.setAttribute('zIndex', '2');
    } else {
        toSlider.setAttribute('zIndex', '0');
    }
}

const fromSlider = document.querySelector('.from-slider') as HTMLInputElement;
const toSlider = document.querySelector('.to-slider') as HTMLInputElement;
const fromInput = document.querySelector('.form_control_container__time__input_min') as HTMLInputElement;
const toInput = document.querySelector('.form_control_container__time__input_max') as HTMLInputElement;
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
