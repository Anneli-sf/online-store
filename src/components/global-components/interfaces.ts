export interface IComponent {
    render: (id?: number | IProductsData[]) => HTMLDivElement;
}

export interface IRoutes {
    path: string;
    component: IComponent;
}

export interface IProductsData {
    id: number;
    category: string;
    categoryEng: string;
    subcategory: string;
    subcategoryEng: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    raiting: number;
    images: string[];
}

export interface IStock {
    [key: string]: number;
}

export interface IFilters {
    [key: string]: IProductsData[];
}

export interface IString {
    [key: string]: string[];
}
