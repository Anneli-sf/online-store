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







