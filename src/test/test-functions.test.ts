import { createEmptyPage, sliceIntoChunks } from '../components/cart-page/cart-page';
import { productsData } from '../components/data/data';
import { stateFilters } from '../components/main-section/main-section-index';
import { isAlreadyHave, getMinPrice, getMaxPrice, getMinAmount, getMaxAmount } from '../components/helpers/helpers';
import { IProductsData } from '../components/global-components/interfaces';
import { createElement } from '../components/global-components/global-components';

const testArray: IProductsData[] = [
    {
        id: 0,
        category: 'Магические существа',
        categoryEng: 'magical-animals',
        subcategory: 'Отрицательные существа',
        subcategoryEng: 'negative-animals',
        title: 'Василиск',
        description:
            'Огромный змей, известный также как «король змей», живущий не одну сотню лет. Очень сильное магическое животное.',
        price: 305,
        discount: 10,
        stock: 5,
        raiting: 4.95,
        images: ['assets/images-storage/vasilisk/vasil1.jpg', 'assets/images-storage/vasilisk/vasil2.jpg'],
    },
    {
        id: 1,
        category: 'Магические предметы',
        categoryEng: 'magic-items',
        subcategory: 'Оружие',
        subcategoryEng: 'weapon',
        title: 'Меч Гриффиндора',
        description:
            'Магический предмет исключительной силы. Это одноручный меч (34 дюйма), созданный из чистого серебра, и достаточно лёгкий, чтобы его мог поднять даже подросток. Рукоять меча отделана рубинами, на лезвии клинка видна гравировка «Годрик Гриффиндор».',
        price: 10,
        discount: 10,
        stock: 3,
        raiting: 4.05,
        images: [
            'assets/images-storage/mech_Griffindora/grif1.png',
            'assets/images-storage/mech_Griffindora/grif2.jpg',
        ],
    },
    {
        id: 2,
        category: 'Одежда и аксессуары',
        categoryEng: 'clothes-accessories',
        subcategory: 'Одежда',
        subcategoryEng: 'clothes',
        title: 'Мантия-невидимка',
        description:
            'Волшебная мантия из очень лёгкой «серебристой» ткани, делающая невидимым того, кто её надевает. Обычные мантии-невидимки служат очень недолго и их производство очень дорогостоящее. У Гарри была особая мантия-невидимка, так как являлась одним из трех Даров Смерти.',
        price: 15,
        discount: 9,
        stock: 8,
        raiting: 3.98,
        images: [
            'assets/images-storage/mantiya_nevidimka/mant1.jpg',
            'assets/images-storage/mantiya_nevidimka/mant2.png',
        ],
    },
];

describe('createEmptyPage', () => {
    test('Block is created!', () => {
        expect(createEmptyPage()).toMatchSnapshot();
    });
});

describe('sliceIntoChunks', () => {
    test('Array divided into parts correctly!', () => {
        expect(sliceIntoChunks([1, 2, 3, 4], 2)).toEqual(
            expect.arrayContaining([
                [1, 2],
                [3, 4],
            ])
        );
    });
    test('Array divided into parts correctly!', () => {
        expect(sliceIntoChunks([1, 2, 3, 4, 5], 3)).toEqual(
            expect.arrayContaining([
                [1, 2, 3],
                [4, 5],
            ])
        );
    });
});

describe('stateFilters', () => {
    const element = createElement('input', 'sort__input') as HTMLInputElement;
    element.value = 'element';
    test('Return slash!', () => {
        expect(stateFilters([], [], '', '', '', '', productsData, element)).toEqual('');
    });
    test('Return only category!', () => {
        expect(stateFilters(['abc'], [], '', '', '', '', testArray, element)).toEqual(
            '?category=abc&&price=↕&stock=↕&search=element'
        );
    });
    test('Return search value!', () => {
        expect(stateFilters([], [], '', '', '', '', testArray, element)).toEqual('?&&price=↕&stock=↕&search=element');
    });
    test('Return category + subcategory + stock + price!', () => {
        expect(stateFilters(['abc'], ['cba'], '0', '100', '0', '100', testArray, element)).toEqual(
            '?category=abc&subcategory=cba&price=0↕100&stock=0↕100&search=element'
        );
    });
});

describe('isAlreadyHave', () => {
    test('It is true!', () => {
        expect(isAlreadyHave(productsData, testArray)).toBeTruthy();
    });
});

describe('getMinPrice', () => {
    test('It is a min price!', () => {
        expect(getMinPrice(testArray)).toEqual(10);
    });
});

describe('getMaxPrice', () => {
    test('It is a max price!', () => {
        expect(getMaxPrice(testArray)).toEqual(305);
    });
});

describe('getMinAmount', () => {
    test('It is a min stock!', () => {
        expect(getMinAmount(testArray)).toEqual(3);
    });
});

describe('getMaxAmount', () => {
    test('It is a max stock!', () => {
        expect(getMaxAmount(testArray)).toEqual(8);
    });
});
