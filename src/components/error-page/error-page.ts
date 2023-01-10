import './error-page.scss';
import { createElement } from '../global-components/global-components';

export const createErrorPage = () => {
    const block = createElement('div', 'error-block') as HTMLDivElement;
    return block;
};
