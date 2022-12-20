import './sass/style.scss';
import { createDetailsPage } from './components/details-page/details';

const BODY = document.querySelector('body') as HTMLElement;
BODY?.append(createDetailsPage(3));
