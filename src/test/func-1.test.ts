import { createEmptyPage, sliceIntoChunks } from '../components/cart-page/cart-page';
import { productsData } from '../components/data/data';
import { stateFilters } from '../components/main-section/main-section';

test('If block created?', () => {
    expect(createEmptyPage()).toMatchSnapshot();
});

test('Is the array divided into parts correctly?', () => {
    expect(sliceIntoChunks([1, 2, 3, 4], 2)).toEqual(
        expect.arrayContaining([
            [1, 2],
            [3, 4],
        ])
    );
});

test('Does slash mean home page?', () => {
    expect(stateFilters([], [], productsData)).toBe('/');
});
