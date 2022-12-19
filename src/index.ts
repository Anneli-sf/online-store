import './sass/style.scss';
import { createDetailsPage } from './components/details-page/details';

const body: HTMLElement | null = document.querySelector('body');
body?.append(createDetailsPage(0));
