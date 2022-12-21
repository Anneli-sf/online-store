import './footer.scss';
import { createLink, createImage } from '../../global-components/global-components';

export const footer = document.querySelector('.footer') as HTMLBodyElement;

export function createFooter(footer: HTMLBodyElement): HTMLBodyElement {
    const footerRsSchoolLogo = createLink('https://rs.school/js/', 'rs-logo') as HTMLLinkElement;
    const gitHubLogoAnneli = createLink('https://github.com/anneli-sf', 'anneli-github-logo') as HTMLLinkElement;
    const gitHubLogoAlex = createLink('https://github.com/MaestroFront', 'alex-github-logo') as HTMLLinkElement;
    const logo = createImage('../../../assets/img/logo.gif', 'logo', 'logo') as HTMLImageElement;

    footerRsSchoolLogo.setAttribute('target', '_blank');
    gitHubLogoAnneli.setAttribute('target', '_blank');
    gitHubLogoAlex.setAttribute('target', '_blank');

    footer.append(footerRsSchoolLogo, logo, gitHubLogoAnneli, gitHubLogoAlex);
    return footer;
}
