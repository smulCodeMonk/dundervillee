import React, { Component } from 'react';
import Button from './Button';
import styles from './Footer.module.scss';

export default class Footer extends Component {
    render() {
        const { t } = this.props;

        return (
            <footer className={styles.footer}>
                <div className={styles.footer__wrapper}>
                    <div className={styles.footer__container}>
                        <div className={styles.footer__logo_container}>
                            <Button className={styles.logo_link} href="/">
                                <img src="/assets/img/logo.svg" className={styles.logo} alt="Logo" />
                            </Button>
                        </div>
                    </div>

                    <div className={styles.footer__container}>
                        <div className={styles.footer__container_content}>
                            <span className={styles.footer__title}>{t('footer:general-title')}</span>
                            <address className={styles.footer__contact}>
                                <Button className={styles.footer__email} href="mailto:hi@dunderville.se">
                                    hi@dunderville.se
                                </Button>
                                <span className={styles.footer__phone_number}>M: 072 398 27 33</span>
                            </address>
                        </div>
                        <div className={styles.footer__container_content}>
                            <span className={styles.footer__title}>Address</span>
                            <address className={styles.footer__location}>
                                <span className={styles.footer__location_address}>Dunderville AB</span>
                                <span className={styles.footer__location_address}>Stora Varvsgatan 6A</span>
                                <span className={styles.footer__location_address}>211 19 Malmo</span>
                            </address>
                        </div>
                    </div>

                    <div className={styles.footer__container}>
                        <div className={styles.footer__container_content}>
                            <span className={styles.footer__title}>Erik Arheden - {t('footer:producer')}</span>
                            <address className={styles.footer__contact}>
                                <Button className={styles.footer__email} href="mailto:erik@dunderville.se">
                                    erik@dunderville.se
                                </Button>
                                <span className={styles.footer__phone_number}>M: 072 398 27 33</span>
                            </address>
                        </div>

                        <div className={styles.footer__container_content}>
                            <span className={styles.footer__title}>Jonas Kornhall - {t('footer:producer')}</span>
                            <address className={styles.footer__contact}>
                                <Button className={styles.footer__email} href="mailto:erik@dunderville.se">
                                    jonas@dunderville.se
                                </Button>
                                <span className={styles.footer__phone_number}>M: 072 673 86 45</span>
                            </address>
                        </div>
                    </div>

                    <div className={styles.footer__container}>
                        <div className={styles.footer__container_content}>
                            <span className={styles.footer__title}>{t('footer:on-the-web')}</span>
                            <address className={styles.footer__contact}>
                                <Button className={styles.footer__social_link} href="https://www.instagram.com/dunderville_ab/" target="_blank">
                                    {t('footer:instagram')}
                                    <svg className={styles.footer__icon_arrow} viewBox="0 0 17 18">
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(48, 48, 48)"
                                            d="M13.652,7.895 L13.498,16.313 L13.652,16.313 L13.652,17.844 L0.700,17.844 L0.700,16.313 L12.207,16.313 L12.128,7.895 C10.890,7.895 10.176,7.901 9.76,7.945 C10.477,5.280 11.683,2.951 12.889,0.254 C14.182,2.893 15.360,5.204 16.704,7.945 C15.508,7.810 14.968,7.895 13.652,7.895 Z"
                                        />
                                    </svg>
                                </Button>

                                <Button className={styles.footer__social_link} href="www.vimeo.com" target="_blank">
                                    {t('footer:vimeo')}
                                    <svg className={styles.footer__icon_arrow} viewBox="0 0 17 18">
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(48, 48, 48)"
                                            d="M13.652,7.895 L13.498,16.313 L13.652,16.313 L13.652,17.844 L0.700,17.844 L0.700,16.313 L12.207,16.313 L12.128,7.895 C10.890,7.895 10.176,7.901 9.76,7.945 C10.477,5.280 11.683,2.951 12.889,0.254 C14.182,2.893 15.360,5.204 16.704,7.945 C15.508,7.810 14.968,7.895 13.652,7.895 Z"
                                        />
                                    </svg>
                                </Button>
                            </address>
                        </div>
                    </div>
                </div>

                <div className={styles.footer__copyright_block}>{t('footer:copy')}</div>
            </footer>
        );
    }
}
