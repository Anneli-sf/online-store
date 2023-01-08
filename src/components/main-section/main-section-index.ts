import { IProductsData } from '../global-components/interfaces';

export const searchByWord = (word: string, arr: IProductsData[]) => {
    word = word.toLowerCase();
    return arr.filter((item) => {
        if (
            item.category.toLowerCase().includes(word) ||
            item.subcategory.toLowerCase().includes(word) ||
            item.title.toLowerCase().includes(word) ||
            item.description.toLowerCase().includes(word) ||
            item.price.toString().includes(word) ||
            item.discount.toString().includes(word) ||
            item.stock.toString().includes(word) ||
            item.raiting.toString().includes(word)
        )
            return item;
    });
};
