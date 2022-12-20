import './aside.scss';

//------------------ASIDE
const asideBlock = createElement('aside', 'main__aside') as HTMLElement;
const buttonContainer = createElement('div', 'btn__container') as HTMLDivElement;
const buttonReset = createElement('button', 'btn__reset') as HTMLButtonElement;
const buttonCopy = createElement('button', 'btn__copy') as HTMLButtonElement;

buttonReset.textContent = 'сбросить';
buttonCopy.textContent = 'скопировать';

asideBlock.append(buttonContainer);
buttonContainer.append(buttonReset);
buttonContainer.append(buttonCopy);
asideBlock.append(filterCategory);
asideBlock.append(filterSubcategory);
asideBlock.append(filterPrice);
