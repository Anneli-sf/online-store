import './dual-slider.scss';
import { createElement, createInput, createSimpleInput } from '../../../global-components/global-components';

const sliders = createElement('div', 'sliders') as HTMLDivElement;
export function createSliders(): HTMLDivElement {
    sliders.append(createPriceDualSlider(), createAmountDualSlider());
    return sliders;
}

const fromSliderPrice = createSimpleInput('from-slider-price', 'range', '', '10', '0', '100') as HTMLInputElement; //sliderInputFrom
const toSliderPrice = createSimpleInput('to-slider-price', 'range', '', '30', '0', '100') as HTMLInputElement; //sliderInputTo
const fromInputPrice = createSimpleInput(
    'form_control_container__time__input_min-price',
    'number',
    '',
    '10',
    '0',
    '100'
) as HTMLInputElement; //formControlTimeInputMin

const toInputPrice = createSimpleInput(
    'form_control_container__time__input_max-price',
    'number',
    '',
    '30',
    '0',
    '100'
) as HTMLInputElement; //formControlTimeInputMax

function createPriceDualSlider(): HTMLDivElement {
    const filterPrice = createElement('div', 'filter__price') as HTMLDivElement;
    const sliderControlPrice = createElement('div', 'slider-control-price') as HTMLDivElement;
    const filterPriceHeader = createElement('h3', 'filter-price-title') as HTMLHeadingElement;
    filterPriceHeader.textContent = 'Цена';
    const formControlPrice = createElement('div', 'form-control-price') as HTMLDivElement;
    const formControlPriceContainerMin = createElement('div', 'form-control-container-price') as HTMLDivElement;
    const formControlPriceContainerMinTime = createElement(
        'div',
        'form-control-container__time-price'
    ) as HTMLDivElement;
    const formControlPriceContainerMax = createElement('div', 'form-control-container-price') as HTMLDivElement;
    const formControlPriceContainerMaxTime = createElement(
        'div',
        'form-control-container__time-price'
    ) as HTMLDivElement;
    const rangeContainerPrice = createElement('div', 'range-container-price') as HTMLDivElement;

    formControlPriceContainerMinTime.textContent = 'Min';
    formControlPriceContainerMaxTime.textContent = 'Max';

    formControlPriceContainerMin.append(formControlPriceContainerMinTime, fromInputPrice); //formControlTimeInputMin
    formControlPriceContainerMax.append(formControlPriceContainerMaxTime, toInputPrice); //formControlTimeInputMax

    formControlPrice.append(formControlPriceContainerMin, formControlPriceContainerMax);

    sliderControlPrice.append(fromSliderPrice, toSliderPrice); //sliderInputFrom    sliderInputTo

    rangeContainerPrice.append(sliderControlPrice, formControlPrice);

    filterPrice.append(filterPriceHeader, rangeContainerPrice);
    return filterPrice;
}

fillSlider(fromSliderPrice, toSliderPrice, '#C6C6C6', '#25daa5', toSliderPrice);
setToggleAccessible(toSliderPrice);

fromSliderPrice.oninput = () => controlFromSlider(fromSliderPrice, toSliderPrice, fromInputPrice);
toSliderPrice.oninput = () => controlToSlider(fromSliderPrice, toSliderPrice, toInputPrice);
fromInputPrice.oninput = () => controlFromInput(fromSliderPrice, fromInputPrice, toInputPrice, toSliderPrice);
toInputPrice.oninput = () => controlToInput(toSliderPrice, fromInputPrice, toInputPrice, toSliderPrice);

const fromSliderAmount = createSimpleInput('from-slider-amount', 'range', '', '10', '0', '100') as HTMLInputElement; //sliderInputFrom
const toSliderAmount = createSimpleInput('to-slider-amount', 'range', '', '30', '0', '100') as HTMLInputElement; //sliderInputTo
const fromInputAmount = createSimpleInput(
    'form_control_container__time__input_min-amount',
    'number',
    '',
    '10',
    '0',
    '100'
) as HTMLInputElement; //formControlTimeInputMin

const toInputAmount = createSimpleInput(
    'form_control_container__time__input_max-amount',
    'number',
    '',
    '30',
    '0',
    '100'
) as HTMLInputElement; //formControlTimeInputMax

function createAmountDualSlider(): HTMLDivElement {
    const filterAmount = createElement('div', 'filter__amount') as HTMLDivElement;
    const sliderControlAmount = createElement('div', 'slider-control-amount') as HTMLDivElement;
    const filterAmountHeader = createElement('h3', 'filter-amount-title') as HTMLHeadingElement;
    filterAmountHeader.textContent = 'Количество';
    const formControlAmount = createElement('div', 'form-control-amount') as HTMLDivElement;
    const formControlAmountContainerMin = createElement('div', 'form-control-container-amount') as HTMLDivElement;
    const formControlAmountContainerMinTime = createElement(
        'div',
        'form-control-container__time-amount'
    ) as HTMLDivElement;
    const formControlAmountContainerMax = createElement('div', 'form-control-container-amount') as HTMLDivElement;
    const formControlAmountContainerMaxTime = createElement(
        'div',
        'form-control-container__time-amount'
    ) as HTMLDivElement;
    const rangeContainerAmount = createElement('div', 'range-container-amount') as HTMLDivElement;

    formControlAmountContainerMinTime.textContent = 'Min';
    formControlAmountContainerMaxTime.textContent = 'Max';

    formControlAmountContainerMin.append(formControlAmountContainerMinTime, fromInputAmount); //formControlTimeInputMin
    formControlAmountContainerMax.append(formControlAmountContainerMaxTime, toInputAmount); //formControlTimeInputMax

    formControlAmount.append(formControlAmountContainerMin, formControlAmountContainerMax);

    sliderControlAmount.append(fromSliderAmount, toSliderAmount); //sliderInputFrom    sliderInputTo

    rangeContainerAmount.append(sliderControlAmount, formControlAmount);

    filterAmount.append(filterAmountHeader, rangeContainerAmount);
    return filterAmount;
}

fillSlider(fromSliderAmount, toSliderAmount, '#C6C6C6', '#25daa5', toSliderAmount);
// setToggleAccessible(toSliderAmount);

fromSliderAmount.oninput = () => controlFromSlider(fromSliderAmount, toSliderAmount, fromInputAmount);
toSliderAmount.oninput = () => controlToSlider(fromSliderAmount, toSliderAmount, toInputAmount);
fromInputAmount.oninput = () => controlFromInput(fromSliderAmount, fromInputAmount, toInputAmount, toSliderAmount);
toInputAmount.oninput = () => controlToInput(toSliderAmount, fromInputAmount, toInputAmount, toSliderAmount);

//----------------------------------------------------------------------------------------------------------------------------
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

// function setToggleAccessible(currentTarget: { value: string | number }) {
function setToggleAccessible(current: { value: string | number }) {
    console.log(current);
    if (Number(current.value) <= 0) {
        toSliderPrice.setAttribute('zIndex', '2');
    } else {
        toSliderPrice.setAttribute('zIndex', '0');
    }
}
