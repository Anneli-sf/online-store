import './modal-window-page.scss';
import { createElement, createSimpleInput, createButton } from '../global-components/global-components';
import { productsData } from '../data/data';
import { createProducstPage } from '../main-section/main-section';
import { productsWrapper } from '../main-section/main-section';

// --------------------------------------BOX-----------------------------------//
const createBoxBlock = (spanText: string, divText: string, divClassName: string, imgSrc?: string | undefined) => {
    const boxBlock = createElement('div', 'box') as HTMLDivElement;
    const span = createElement('span', 'span') as HTMLSpanElement;
    span.textContent = spanText;
    const div = createElement('div', divClassName) as HTMLDivElement;
    div.textContent = divText;

    boxBlock.append(span, div);

    if (divClassName === 'expiration') {
        const monthSpan = createElement('span', 'exp-month') as HTMLSpanElement;
        monthSpan.textContent = 'мм';
        const yearSpan = createElement('span', 'exp-year') as HTMLSpanElement;
        yearSpan.textContent = 'гг';
        div.append(monthSpan, yearSpan);
    }
    if (imgSrc) {
        const image = createElement('img', 'card') as HTMLImageElement;
        image.src = imgSrc;
        boxBlock.append(image);
    }

    return boxBlock;
};
// -------------------------------------------------------------------------//

// -------------------------------------FRONT------------------------------------//
const createFrontBlock = () => {
    const frontBlock = createElement('div', 'front');
    const imagesBlock = createElement('div', 'image');
    const chipImage = createElement('img', 'chip') as HTMLImageElement;
    chipImage.src = 'assets/icons/chip.png';
    const visaImage = createElement('img', 'card') as HTMLImageElement;
    visaImage.src = 'assets/icons/default.png';
    imagesBlock.append(chipImage, visaImage);

    const cardNumberBlock = createElement('div', 'card-number-box');
    cardNumberBlock.textContent = '################';

    const flexboxBlock = createElement('div', 'flexbox');
    flexboxBlock.append(
        createBoxBlock('владелец карты', 'полное имя', 'card-holder-name'),
        createBoxBlock('срок карты', '', 'expiration')
    );

    frontBlock.append(imagesBlock, cardNumberBlock, flexboxBlock);

    return frontBlock;
};
// -------------------------------------------------------------------------//

// ------------------------------------BACK-------------------------------------//
const createBackBlock = () => {
    const backBlock = createElement('div', 'back');
    const stripeBlock = createElement('div', 'stripe');

    backBlock.append(stripeBlock, createBoxBlock('CVV', '', 'cvv-box', 'assets/icons/default.png'));

    return backBlock;
};
// -------------------------------------------------------------------------//

// ------------------------------------CARD CONTAINER-------------------------------------//
const cardContainer = () => {
    const cardContainer = createElement('div', 'card-container');
    cardContainer.append(createFrontBlock(), createBackBlock());

    return cardContainer;
};
// -------------------------------------------------------------------------//

// -------------------------------------------------------------------------//
const setCardImage = (input: HTMLInputElement) => {
    input.value = input.value.replace(/[^\d]/g, '');
    switch (input.value[0]) {
        case '4':
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/visa.png');
            });
            break;
        case '5':
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/master-card.png');
            });
            break;
        case '6':
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/maestro.png');
            });
            break;
        case '7':
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/slytherin.png');
            });
            break;
        case '8':
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/griffindor.png');
            });
            break;
        case '9':
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/hufflepuff.png');
            });
            break;
        default:
            document.querySelectorAll('.card').forEach((item) => {
                item.setAttribute('src', 'assets/icons/default.png');
            });
            break;
    }
};
// -------------------------------------------------------------------------//

// ------------------------------------CHARACTERISTIC INPUTS-------------------------------------//
const createCharacteristicInput = (input: HTMLInputElement, spanText: string): void => {
    switch (spanText) {
        case 'Номер карты':
            input.pattern = '[0-9]{16}';
            input.addEventListener('keyup', () => setCardImage(input));
            input.placeholder = '#### #### #### ####';
            break;
        case 'Владелец карты':
            input.onkeypress = function (event: KeyboardEvent) {
                if ('1234567890+./=-_'.indexOf(event.key) != -1) event.preventDefault();
            };
            input.pattern = '[A-Za-zА-Яа-яЁё]{3,}[ ]{1}[A-Za-zА-Яа-яЁё]{3,}';
            input.placeholder = 'Имя Фамилия';
            break;
        case 'CVV':
            input.pattern = '[0-9]{,3}';
            input.addEventListener('keyup', function () {
                input.value = input.value.replace(/[^\d]/g, '');
            });
            input.placeholder = '###';
            break;
        case 'Адрес доставки':
            input.pattern =
                '[A-Za-zА-Яа-яЁё]{5,}[ ]{1}[A-Za-zА-Яа-яЁё]{5,}[ ]{1}[A-Za-zА-Яа-яЁё]{5,}[ ]{1}[A-Za-zА-Яа-яЁё]{5,}[ ]{1}[A-Za-zА-Яа-яЁё]{5,}';
            input.placeholder = 'страна область город микрорайон улица';
            break;
        case 'Номер телефона':
            input.pattern = '[+]{1}[0-9]{11,}';
            input.oninput = function () {
                input.value = input.value.replace(/[^0-9,+]/g, '');
            };
            input.placeholder = '+# ### ### ## ##';
            break;
        case 'Email':
            input.type = 'email';
            input.placeholder = 'электронная почта';
            break;
    }
};
// -------------------------------------------------------------------------//

// -----------------------------------INPUTSBOXES--------------------------------------//
const createInputBox = (spanText: string, inputClass: string, inputMaxLength?: number) => {
    const inputBoxBlock = createElement('div', 'inputBox');

    const span = createElement('span', 'span');
    span.textContent = spanText;

    const input = createSimpleInput(inputClass, 'text') as HTMLInputElement;
    if (input.classList.contains('card-number-input')) {
        input.oninput = () => {
            (document.querySelector('.card-number-box') as HTMLDivElement).innerHTML = input.value;
        };
    }
    if (input.classList.contains('card-holder-input')) {
        input.oninput = () => {
            (document.querySelector('.card-holder-name') as HTMLDivElement).innerHTML = input.value;
        };
    }
    if (input.classList.contains('cvv-input')) {
        input.oninput = () => {
            (document.querySelector('.cvv-box') as HTMLDivElement).innerHTML = input.value;
        };
        input.onmouseenter = () => {
            (document.querySelector('.front') as HTMLDivElement).style.transform =
                'perspective(1000px) rotateY(-180deg)';
            (document.querySelector('.back') as HTMLDivElement).style.transform = 'perspective(1000px) rotateY(0deg)';
        };

        input.onmouseleave = () => {
            (document.querySelector('.front') as HTMLDivElement).style.transform = 'perspective(1000px) rotateY(0deg)';
            (document.querySelector('.back') as HTMLDivElement).style.transform = 'perspective(1000px) rotateY(180deg)';
        };
    }
    if (inputMaxLength) input.maxLength = inputMaxLength;

    createCharacteristicInput(input, spanText);

    inputBoxBlock.append(span, input);
    return inputBoxBlock;
};

const createSelectBox = (text: string, selectClass: string, startCalcNumber: number, quantityOptions: number) => {
    const inputBoxBlock = createElement('div', 'inputBox');
    const span = createElement('span', 'span');
    span.textContent = text;

    const select = createElement('select', selectClass) as HTMLSelectElement;
    if (select.classList.contains('month-input')) {
        select.oninput = () => {
            (document.querySelector('.exp-month') as HTMLDivElement).innerHTML = select.value;
        };
    }
    if (select.classList.contains('year-input')) {
        select.oninput = () => {
            (document.querySelector('.exp-year') as HTMLDivElement).innerHTML = select.value;
        };
    }
    const optionFirst = createElement('option', 'option-first') as HTMLOptionElement;
    optionFirst.disabled = true;
    optionFirst.textContent = text;
    select.append(optionFirst);

    for (let i = startCalcNumber; i < quantityOptions; i++) {
        const option = createElement('option', `option_${i}`) as HTMLOptionElement;
        option.value = `${i}`;
        option.textContent = `${i}`;
        select.append(option);
    }

    select.value = ' ';

    inputBoxBlock.append(span, select);

    return inputBoxBlock;
};
// -------------------------------------------------------------------------//

// --------------------------------CONSTANTS INPUTS AND SELECTS-----------------------------------------//
const inputNumberCard = createInputBox('Номер карты', 'card-number-input', 16);
const inputHolder = createInputBox('Владелец карты', 'card-holder-input');
const inputAddress = createInputBox('Адрес доставки', 'card-address-input');
const inputTel = createInputBox('Номер телефона', 'card-tel-input');
const inputMail = createInputBox('Email', 'card-email-input');
const inputCVV = createInputBox('CVV', 'cvv-input', 3);
const selectMonth = createSelectBox('Месяц', 'month-input', 1, 13);
const selectYear = createSelectBox('Год', 'year-input', 2023, 2035);
// -------------------------------------------------------------------------//

const createBlockIfValidationPassed = () => {
    const block = createElement('div', 'passed-block') as HTMLDivElement;
    const text = createElement('p', 'passed-text') as HTMLParagraphElement;
    const time = createElement('input', 'passed-time') as HTMLInputElement;
    text.textContent = 'Введенные данные успешно приняты, окно закроется через  ';
    time.type = 'number';
    time.value = '5';
    setInterval(() => {
        time.value = String(+time.value - 1);
    }, 1000);
    text.append(time);
    block.append(text);
    return block;
};

// ------------------------------------FORM-------------------------------------//
const mainSection = document.querySelector('.main') as HTMLDivElement;
const createForm = () => {
    const form = createElement('form', 'form') as HTMLFormElement;
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validation(this) == true) {
            console.log('Форма заполнена успешно!');
            mainSection.innerHTML = '';
            mainSection.append(createBlockIfValidationPassed());
            setTimeout(() => {
                mainSection.innerHTML = '';
                return mainSection.append(productsWrapper);
            }, 5000);
        } else {
            console.log('Поля не заполнены, либо заполнены неправильно!');
        }
    });

    const flexboxBlock = createElement('div', 'flexbox');
    const buttonSubmit = createButton('отправить', 'submit-btn');
    buttonSubmit.type = 'submit';
    buttonSubmit.classList.add('button-first');

    flexboxBlock.append(selectMonth, selectYear, inputCVV);
    form.append(inputNumberCard, inputHolder, inputAddress, inputTel, inputMail, flexboxBlock, buttonSubmit);

    return form;
};
// -------------------------------------------------------------------------//

// -----------------------------------CONTAINER--------------------------------------//
export const createContainerCard = () => {
    const wrapper = createElement('div', 'form-wrapper');
    const container = createElement('div', 'container');
    wrapper.append(container);
    container.append(cardContainer(), createForm());

    return wrapper;
};
// -------------------------------------------------------------------------//

// ------------------------------------ANIMATION-------------------------------------//

// -----------------------------------FORM VALIDATE--------------------------------------//
function validation(form: HTMLFormElement) {
    function removeError(element: HTMLElement) {
        const parent = <Element>element.parentNode;

        if (parent.classList.contains('error')) {
            (parent.querySelector('.error-label') as HTMLLabelElement).remove();
            parent.classList.remove('error');
        }
    }
    function createInputError(input: HTMLInputElement, text: string) {
        const parent = <Element>input.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;

        parent.classList.add('error');

        parent.append(errorLabel);
    }
    function createSelectError(select: HTMLSelectElement, text: string) {
        const parent = <Element>select.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;

        parent.classList.add('error');

        parent.append(errorLabel);
    }

    let result = true;

    const allInputs = form.querySelectorAll('input');
    const allSelects = form.querySelectorAll('select');

    for (const input of allInputs) {
        removeError(input);
        if (input.value == '') {
            createInputError(input, 'error');
            result = false;
        }
    }
    for (const select of allSelects) {
        removeError(select);
        if (select.value == '') {
            createSelectError(select, 'error');
            result = false;
        }
    }

    return result;
}
// -------------------------------------------------------------------------//

// ---------------------------------IS FORM VALIDITY----------------------------------------//
const isFormValidity = () => {
    if (document.querySelector('.form') as HTMLFormElement) {
        (document.querySelector('.form') as HTMLFormElement).addEventListener('submit', function (e) {
            e.preventDefault();

            if (validation(this) == true) {
                alert('Форма заполнена успешно!');
                mainSection.innerHTML = '';
                mainSection.append(createBlockIfValidationPassed());
                setTimeout(() => {
                    createProducstPage(productsData);
                }, 3000);
            } else {
                alert('Поля не заполнены, либо заполнены неправильно!');
            }
        });
    }
};
isFormValidity();
// -------------------------------------------------------------------------//
