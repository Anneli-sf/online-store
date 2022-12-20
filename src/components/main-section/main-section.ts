import './main-section.scss';

/----------------------CONTENT
const contentBlock = createElement('div', 'products') as HTMLDivElement;
contentBlock.append(sortBlock);
contentBlock.append(productsList);

//---------------CONTENT HEADER
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

//-------------------MAIN CONTENT
const productsList = createElement('ul', 'products__list') as HTMLUListElement;