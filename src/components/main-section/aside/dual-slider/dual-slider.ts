import './dual-slider.scss';
import { createElement, createSimpleInput } from '../../../global-components/global-components';
import { getMaxPrice, getMinAmount, getMinPrice, getMaxAmount } from '../../../helpers/helpers';
import { IProductsData, productsData } from '../../../data/data';

const toSlider = createSimpleInput('to-slider', 'range', '', '0', '0', '0') as HTMLInputElement;
const maxPriceProductData = `${getMaxPrice(productsData)}`;
const maxAmountProductData = `${getMaxAmount(productsData)}`;

export function createSliders(currentArray: IProductsData[]): HTMLDivElement {
    const sliders = createElement('div', 'sliders') as HTMLDivElement;

    const minPrice = `${getMinPrice(currentArray)}`;
    const maxPrice = `${getMaxPrice(currentArray)}`;

    const minAmount = `${getMinAmount(currentArray)}`;
    const maxAmount = `${getMaxAmount(currentArray)}`;

    sliders.append(
        createDualSlider('price', minPrice, maxPrice, 'Цена', maxPriceProductData),
        createDualSlider('amount', minAmount, maxAmount, 'Количество', maxAmountProductData)
    );
    return sliders;
}

function createDualSlider(
    classId: string,
    fromSliderValue: string,
    toSliderValue: string,
    titleText: string,
    maxValue: string
): HTMLDivElement {
    const fromSlider = createSimpleInput(
        `from-slider-${classId}`,
        'range',
        '',
        fromSliderValue,
        '0',
        maxValue
    ) as HTMLInputElement;

    const toSliderInput = toSlider.cloneNode(true) as HTMLInputElement;
    toSliderInput.classList.add(`to-slider-${classId}`);
    toSliderInput.value = toSliderValue;
    console.log('toSliderInput', toSliderInput);
    toSliderInput.max = toSliderValue;


    const fromInput = createSimpleInput(
        `form_control_container__time__input_min-${classId}`,
        'number',
        '',
        fromSliderValue,
        '0',
        maxValue,
        true
    ) as HTMLInputElement;

    const toInput = createSimpleInput(
        `form_control_container__time__input_max-${classId}`,
        'number',
        '',
        toSliderValue,
        '0',
        maxValue,
        true
    ) as HTMLInputElement;

    const filter = createElement('div', `filter__${classId}`) as HTMLDivElement;
    const sliderControl = createElement('div', `slider-control-${classId}`) as HTMLDivElement;
    const filterHeader = createElement('h3', `filter-${classId}-title`) as HTMLHeadingElement;
    filterHeader.textContent = titleText;
    const formControl = createElement('div', `form-control-${classId}`) as HTMLDivElement;
    const formControlMin = createElement('div', `form-control-container-${classId}`) as HTMLDivElement;
    const formControlMinTime = createElement('div', `form-control-container__time-${classId}`) as HTMLDivElement;
    const formControlMax = createElement('div', `form-control-container-${classId}`) as HTMLDivElement;
    const formControlMaxTime = createElement('div', `form-control-container__time-${classId}`) as HTMLDivElement;
    const range = createElement('div', `range-container-${classId}`) as HTMLDivElement;

    formControlMin.append(formControlMinTime, fromInput);
    formControlMax.append(formControlMaxTime, toInput);

    formControl.append(formControlMin, formControlMax);
    sliderControl.append(fromSlider, toSliderInput);
    range.append(sliderControl, formControl);
    filter.append(filterHeader, range);

    fillSlider(fromSlider, toSliderInput, '#C6C6C6', '#25daa5', toSliderInput);
    setToggleAccessible(toSliderInput);

    fromSlider.oninput = () => controlFromSlider(fromSlider, toSliderInput, fromInput);
    toSliderInput.oninput = () => controlToSlider(fromSlider, toSliderInput, toInput);
    fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSliderInput);
    toInput.oninput = () => controlToInput(toSliderInput, fromInput, toInput, toSliderInput);

    return filter;
}

//--------------------------------MOVE SLIDER-------------------------------
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

function setToggleAccessible(current: { value: string | number }) {
    if (Number(current.value) <= 0) {
        toSlider.setAttribute('zIndex', '2');
    } else {
        toSlider.setAttribute('zIndex', '0');
    }
}
