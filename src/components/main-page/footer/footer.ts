import './footer.scss';
import { createElement, createLink } from '../../global-components/global-components';

export function createFooter(): HTMLBodyElement {
    const footer = document.querySelector('.footer') as HTMLBodyElement;
    const footerRsSchoolLogo = createLink('https://rs.school/js/', 'rs-logo') as HTMLLinkElement;
    const yearBlock = createElement('p', 'year');
    yearBlock.textContent = '2023';
    const gitHubLogoAnneli = createLink('https://github.com/anneli-sf', 'anneli-github-logo') as HTMLLinkElement;
    const gitHubLogoAlex = createLink('https://github.com/MaestroFront', 'alex-github-logo') as HTMLLinkElement;

    footerRsSchoolLogo.setAttribute('target', '_blank');
    gitHubLogoAnneli.setAttribute('target', '_blank');
    gitHubLogoAlex.setAttribute('target', '_blank');

    footer.append(gitHubLogoAnneli, footerRsSchoolLogo, yearBlock, gitHubLogoAlex);
    return footer;
}
