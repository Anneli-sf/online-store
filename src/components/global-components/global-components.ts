import './global-components.scss';

// T extends keyof HTMLElementTagNameMap

export const createElement = (elTag: string, elClassName: string): HTMLElement => {
    const element = document.createElement(`${elTag}`);
    element.classList.add(elClassName);
    return element;
};

export const createButton = (buttonText: string, classButton?: string): HTMLButtonElement => {
    const button = createElement('button', 'button') as HTMLButtonElement;
    classButton ? button.classList.add(classButton) : undefined;
    button.innerText = buttonText;
    return button;
};

export const createInput = (
    inputClass: string,
    inputType: string,
    inputPlaceHolder?: string,
    inputId?: string,
    inputName?: string,
    inputValue?: string,
    minValue?: string,
    maxValue?: string
): HTMLFormElement => {
    const form = createElement('form', 'form') as HTMLFormElement;

    const input = createElement('input', `${inputClass}`) as HTMLInputElement;
    input.type = inputType;
    inputId ? (input.id = inputId) : undefined;
    inputName ? (input.name = inputName) : undefined;
    inputPlaceHolder ? (input.placeholder = inputPlaceHolder) : undefined;
    inputValue ? (input.value = inputValue) : undefined;
    minValue ? (input.min = minValue) : undefined;
    maxValue ? (input.max = maxValue) : undefined;

    form.append(input);
    return form;
};

export const createSimpleInput = (
    inputClass: string,
    inputType: string,
    inputPlaceHolder?: string,
    inputValue?: string,
    minValue?: string,
    maxValue?: string,
    readOnly?: boolean,
    id?: string
): HTMLInputElement => {
    const input = createElement('input', `${inputClass}`) as HTMLInputElement;
    input.type = inputType;
    inputPlaceHolder ? (input.placeholder = inputPlaceHolder) : undefined;
    inputValue ? (input.value = inputValue) : undefined;
    minValue ? (input.min = minValue) : undefined;
    maxValue ? (input.max = maxValue) : undefined;
    if (readOnly) input.readOnly = readOnly;
    if (id) input.id = id;

    return input;
};

export const createLabel = (labelText: string, labelClass: string, labelName?: string): HTMLLabelElement => {
    const label = createElement('label', `${labelClass}`) as HTMLLabelElement;
    labelName ? label.setAttribute('for', labelName) : undefined;
    label.innerText = labelText;
    return label;
};

export const createBlock = (
    blockClass: string,
    titleText?: string,
    headerClass?: string,
    sectionClass?: string
): HTMLElement => {
    const container = createElement('div', 'block') as HTMLElement;
    container.classList.add(blockClass);

    const blockHeader = createElement('div', 'block-header') as HTMLElement;
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
    // productId?: number
): HTMLElement => {
    const container: HTMLElement = createElement('div', 'block');
    container.classList.add(blockClass);

    const blockHeader: HTMLElement = createElement('div', 'block-header');
    headerClass ? blockHeader.classList.add(headerClass) : undefined;
    const title: HTMLElement = createElement('p', 'block-title');
    if (titleText) title.innerHTML = `${titleText}`;

    const blockSection: HTMLElement = createElement('div', 'block-section');
    sectionClass ? blockSection.classList.add(sectionClass) : undefined;

    const blockText: HTMLElement = createElement('p', 'block-text');
    pClass ? blockText.classList.add(pClass) : undefined;
    text ? (blockText.textContent = '' + text) : undefined; //передается число или строка

    blockSection.append(blockText);
    blockHeader.append(title);
    container.prepend(blockHeader);
    container.append(blockSection);

    return container;
};

export const createImage = (imgSrc: string, imgAlt: string, imgClass?: string, id?: string): HTMLImageElement => {
    const image = createElement('img', 'image') as HTMLImageElement;
    imgClass ? image.classList.add(imgClass) : undefined;
    image.src = imgSrc;
    image.alt = imgAlt;
    image.id = id as string;
    return image;
};

export const createLink = (linkHref: string, linkClass: string, linkText?: string): HTMLLinkElement => {
    const link = createElement('a', linkClass) as HTMLLinkElement;
    link.href = linkHref;
    linkText ? (link.textContent = linkText) : undefined;

    return link;
};

export const createParagraph = (parText: string | number, parClass: string): HTMLParagraphElement => {
    const text = createElement('p', parClass) as HTMLParagraphElement;
    text.innerHTML = `${parText}`;
    return text;
};
