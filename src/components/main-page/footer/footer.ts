import './footer.scss';
import { createElement, createLink, createImage } from '../../global-components/global-components';

const footer = document.querySelector('.footer') as HTMLBodyElement;

export function createFooter(): HTMLBodyElement {
    const footerRsSchoolLogo = createLink('https://rs.school/js/', 'rs-logo') as HTMLLinkElement;
    const gitHubLogoAnneli = createLink('https://github.com/anneli-sf', 'anneli-github-logo') as HTMLLinkElement;
    const gitHubLogoAlex = createLink('https://github.com/MaestroFront', 'alex-github-logo') as HTMLLinkElement;
    const logo = createImage('../../../public/img/logo.gif', 'logo', 'logo') as HTMLImageElement;

    footerRsSchoolLogo.setAttribute('target', '_blank');
    gitHubLogoAnneli.setAttribute('target', '_blank');
    gitHubLogoAlex.setAttribute('target', '_blank');

    footer.append(footerRsSchoolLogo, logo, gitHubLogoAnneli, gitHubLogoAlex);
    return footer;
}
