import './sass/style.scss';
import './components/main-section/aside/filter/filter';
import './components/main-section/products-section/products-section';
import './components/main-section/aside/dual-slider/dual-slider';
import './components/main-section/aside/aside';
import './components/main-section/main-section';
import './components/main-page/header/header';
import './components/modal-window-page/modal-window-page';

import { createHeader } from './components/main-page/header/header';
import { createFooter } from './components/main-page/footer/footer';
import { createDetailsPage } from './components/details-page/details';
// import { createProductsSection } from './components/main-section/products-section/products-section';
import { createPriceDualSlider } from './components/main-section/aside/dual-slider/dual-slider';
import { createFilterSubСategories, createFilterСategories } from './components/main-section/aside/filter/filter';
// import { createAside } from './components/main-section/aside/aside';
import { createCartPage } from './components/cart-page/cart-page';
import { createProducstPage } from './components/main-section/main-section';
import { createContainerCard } from './components/modal-window-page/modal-window-page';
import { createDetailsBlock } from './components/details-page/product-details/product-details';

createHeader();
createFooter();
// createProducstPage();

const mainSection = document.querySelector('.main') as HTMLElement;

// mainSection?.append(createDetailsPage(3));
// mainSection.append(createProductsSection());
// mainSection.append(createPriceDualSlider());
// mainSection.append(createFilterSubСategories());
// mainSection.append(createFilterСategories());
// mainSection.append(createProducstPage());
// createProductsSection();
// mainSection.append(createContainerCard());

//------------------------------------------------
class Router {
    routes = [];

    mode = null;

    root = '/';

    constructor(options) {
        this.mode = window.history.pushState ? 'history' : 'hash';
        if (options.mode) this.mode = options.mode;
        if (options.root) this.root = options.root;
        this.listen();
    }

    add = (path, cb) => {
        this.routes.push({ path, cb });
        return this;
    };

    remove = (path) => {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
                this.routes.slice(i, 1);
                return this;
            }
        }
        return this;
    };

    flush = () => {
        this.routes = [];
        return this;
    };

    clearSlashes = (path) => path.toString().replace(/\/$/, '').replace(/^\//, '');

    getFragment = () => {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    };

    navigate = (path = '') => {
        if (this.mode === 'history') {
            window.history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
        }
        return this;
    };

    listen = () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.interval, 50);
    };

    interval = () => {
        if (this.current === this.getFragment()) return;
        this.current = this.getFragment();

        this.routes.some((route) => {
            const match = this.current.match(route.path);
            if (match) {
                match.shift();
                route.cb.apply({}, match);
                return match;
            }
            return false;
        });
    };
}

const router = new Router({
    mode: 'hash',
    root: '/',
});

router
    .add(/home/, () => {
        // alert('welcome in about page');
        mainSection.innerHTML = ``;
        mainSection.append(createProducstPage());
    })
    .add(/cart/, () => {
        // alert('welcome in about page');
        mainSection.innerHTML = ``;
        mainSection.append(createCartPage());
    })
    // .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    //     alert(`products: ${id} specification: ${specification}`);
    // })
    .add(/product-details\/(.*)/, (id) => {
        mainSection.innerHTML = ``;
        mainSection.append(createDetailsPage(id));
    })
    .add('', () => {
        // general controller
        console.log('welcome in catch all controller');
    });

// window.addEventListener('click', (e) => {
//     console.log(e.target);
// });

