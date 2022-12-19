import './global-components.scss';

export const createElement = (elTag: string, elClassName: string): HTMLElement => {
    const element = document.createElement(elTag);
    element.classList.add(elClassName);
    return element;
};

export const createButton = (buttonText: string, classButton?: string): HTMLButtonElement => {
    const button: HTMLButtonElement = createElement('button', 'button');
    classButton ? button.classList.add(classButton) : undefined;
    button.innerText = buttonText;
    return button;
};

export const createInput = (inputType: string, inputId: string, inputName?: string): HTMLFormElement => {
    const form: HTMLFormElement = createElement('form', 'form');

    const input: HTMLInputElement = createElement('input', 'input');
    input.type = inputType;
    input.id = inputId;
    inputName ? (input.name = inputName) : undefined;

    form.append(input);
    return form;
};

export const createLabel = (inputName: string, inputText: string): HTMLLabelElement => {
    const label: HTMLLabelElement = createElement('label', 'label');
    label.setAttribute('for', inputName);
    label.innerText = inputText;
    return label;
};

export const createBlock = (
    blockClass: string,
    titleText?: string,
    headerClass?: string,
    sectionClass?: string
): HTMLElement => {
    const container: HTMLElement = createElement('div', 'block');
    container.classList.add(blockClass);

    const blockHeader: HTMLElement = createElement('div', 'block-header');
    headerClass ? blockHeader.classList.add(headerClass) : undefined;
    const title = createElement('p', 'block-title');
    if (titleText) title.innerHTML = `${titleText}`;

    const blockSection: HTMLElement = createElement('div', 'block-section');
    sectionClass ? blockSection.classList.add(sectionClass) : undefined;

    blockHeader.append(title);
    container.prepend(blockHeader);
    container.append(blockSection);

    return container;
};

export const createBlockWithText = (
    blockClass: string,
    pClass: string,
    text: string | number,
    headerClass?: string,
    titleText?: string,
    sectionClass?: string
): HTMLElement => {
    const container: HTMLElement = createElement('div', 'block');
    container.classList.add(blockClass);

    const blockHeader: HTMLElement = createElement('div', 'block-header');
    headerClass ? blockHeader.classList.add(headerClass) : undefined;
    const title = createElement('p', 'block-title');
    if (titleText) title.innerHTML = `${titleText}`;

    const blockSection: HTMLElement = createElement('div', 'block-section');
    sectionClass ? blockSection.classList.add(sectionClass) : undefined;

    const blockText: HTMLElement = createElement('p', 'block-text');
    pClass ? blockText.classList.add(pClass) : undefined;
    blockText.textContent = text;

    blockSection.append(blockText);
    blockHeader.append(title);
    container.prepend(blockHeader);
    container.append(blockSection);

    return container;
};

export const createImage = (imgSrc: string, imgAlt: string, imgClass?: string): HTMLImageElement => {
    const image: HTMLImageElement = createElement('img', 'image');
    imgClass ? image.classList.add(imgClass) : undefined;
    image.src = imgSrc;
    image.alt = imgAlt;
    return image;
};

export const createLink = (linkText: string, linkClass: string, linkHref: string): HTMLLinkElement => {
    const link: HTMLLinkElement = createElement('a', linkClass);
    link.href = linkHref;
    link.textContent = linkText;

    return link;
};
