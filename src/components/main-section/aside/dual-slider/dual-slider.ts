import './dual-slider.scss';
import { createElement, createInput, createSimpleInput } from '../../../global-components/global-components';

// const sliderInputFrom = createInput('from-slider', 'range', '', '', '', '0', '0', '10000') as HTMLFormElement;
// const sliderInputTo = createInput('to-slider', 'range', '', '', '', '10000', '0', '10000') as HTMLFormElement;
const sliderInputFrom = createSimpleInput('from-slider', 'range', '', '0', '0', '10000') as HTMLInputElement;
const sliderInputTo = createSimpleInput('to-slider', 'range', '', '10000', '0', '10000') as HTMLInputElement;
// const formControlTimeInputMin = createInput(
//     'form_control_container__time__input_min',
//     'number',
//     '',
//     '',
//     '',
//     '0'
// ) as HTMLFormElement;
// const formControlTimeInputMax = createInput(
//     'form_control_container__time__input_max',
//     'number',
//     '',
//     '',
//     '',
//     '10000'
// ) as HTMLFormElement;
const formControlTimeInputMin = createSimpleInput(
    'form_control_container__time__input_min',
    'number',
    '',
    '0'
) as HTMLInputElement;

const formControlTimeInputMax = createSimpleInput(
    'form_control_container__time__input_max',
    'number',
    '',
    '10000'
) as HTMLInputElement;

export function createPriceDualSlider(): HTMLDivElement {
    const filterPrice = createElement('div', 'filter__price') as HTMLDivElement;
    const filterPriceHeader = createElement('h3', 'filter-price-title') as HTMLHeadingElement;
    filterPriceHeader.textContent = 'Цена';

    const rangeContainer = createElement('div', 'range-container') as HTMLDivElement;

    const sliderControl = createElement('div', 'slider-control') as HTMLDivElement;
    // const sliderInputFrom = createInput('from-slider', 'range', '', '', '', '0', '0', '10000') as HTMLFormElement; //HTMLInputElement;
    // const sliderInputTo = createInput('to-slider', 'range', '', '', '', '10000', '0', '10000') as HTMLFormElement;
    const formControl = createElement('div', 'form-control') as HTMLDivElement;
    const formControlContainerMin = createElement('div', 'form-control-container') as HTMLDivElement;
    const formControlContainerMinTime = createElement('div', 'form-control-container__time') as HTMLDivElement;
    formControlContainerMinTime.textContent = 'Min';
    // const formControlTimeInputMin = createInput(
    //     'form_control_container__time__input_min',
    //     'number',
    //     '',
    //     '',
    //     '',
    //     '0'
    // ) as HTMLFormElement;

    const formControlContainerMax = createElement('div', 'form-control-container') as HTMLDivElement;
    const formControlContainerMaxTime = createElement('div', 'form-control-container__time') as HTMLDivElement;
    formControlContainerMaxTime.textContent = 'Max';
    // const formControlTimeInputMax = createInput(
    //     'form_control_container__time__input_max',
    //     'number',
    //     '',
    //     '',
    //     '',
    //     '10000'
    // ) as HTMLFormElement;

    formControlContainerMin.append(formControlContainerMinTime, formControlTimeInputMin);
    formControlContainerMax.append(formControlContainerMaxTime, formControlTimeInputMax);

    formControl.append(formControlContainerMin, formControlContainerMax);

    sliderControl.append(sliderInputFrom, sliderInputTo);

    rangeContainer.append(sliderControl, formControl);

    filterPrice.append(filterPriceHeader, rangeContainer);
    return filterPrice;
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
    console.log(to);
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
