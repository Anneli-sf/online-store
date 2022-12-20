// import logoImage from '../../assets/images/gif/logo.gif';
// import basketLogo from '../../assets/images/png/basket.png';
// import background from '../../assets/images/jpg/background.jpg';
// import backgroundHeader from '../../assets/images/gif/background.gif';
import './main-page.scss';
import { createElement } from '../global-components/global-components';
import { productsData } from '../data/data';
import { createFooter } from './footer/footer';
import { createHeader } from './header/header';

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

// const body = document.querySelector('.body') as HTMLBodyElement;

const main = document.querySelector('.main') as HTMLBodyElement;
main.append(asideBlock);
main.append(contentBlock);

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
