import styles from './Header.module.scss';
import React, { Component } from 'react';
import { resizeManager } from '@superherocheesecake/next-resize-manager';
import Button from './Button';
import Navigation from './Navigation';
import Hamburger from './Hamburger';
import { isFunction } from 'lodash';

export default class Header extends Component {
    componentDidMount() {
        this._setupEventListeners();
        this._resize();
    }
    componentWillUnmount() {
        this._removeEventListeners();
    }
    render() {
        const { t, overlayNavigationVisible, handleNavigationHover } = this.props;
        const pathName = this.props.router.pathname;
        const homePage = pathName === '/';

        return (
            <header className={styles.header}>
                <div className={`${styles.border_left} ${styles.is_wide} `}></div>
                <div className={`${styles.border_right} ${styles.is_wide}`}></div>

                <div className={styles.logo}>
                    <img src="/assets/img/logo.svg" alt="Dunderville-logo-feather" className={`${styles.logo_img} ${styles.is_narrow}`} />
                </div>

                <div className={`${styles.logo_wide} ${styles.logo} ${styles.is_wide}`}>
                    <Button className={styles.logo__button} href="/">
                        <img src="/assets/img/logo.svg" alt="Dunderville-logo-duck" className={`${styles.is_wide} ${styles.logo_wide_img}`} />
                    </Button>
                </div>
                <div className={`${styles.title} ${styles.is_narrow}`}>{t('header:header-title')}</div>
                <div className={`${styles.title} ${styles.is_wide}`}>{t('header:header-title-big')}</div>

                {homePage && (
                    <>
                        <div className={`${styles.title} ${styles.is_wide} ${styles.at_home}`}>{t('header:header-title-home')}</div>
                    </>
                )}

                <Hamburger overlayNavigationVisible={overlayNavigationVisible} buttonHamburgerClicked={this._handleHamburgerClick} />
                {!homePage && <Navigation handleNavigationHover={handleNavigationHover} t={t} pathName={pathName} />}
            </header>
        );
    }
    _setupEventListeners() {
        resizeManager.addEventListener('resize', this._resizeHandler);
        resizeManager.addEventListener('resize:complete', this._resizeHandler);
    }
    _removeEventListeners() {
        resizeManager.removeEventListener('resize', this._resizeHandler);
        resizeManager.removeEventListener('resize:complete', this._resizeHandler);
    }
    _resize() {
        const { handleMediaQuery } = this.props;
        // console.log(handleMediaQuery);
        if (isFunction(handleMediaQuery)) {
            handleMediaQuery();
        }
    }

    _resizeHandler = () => {
        this._resize();
    };

    _handleHamburgerClick = (overlayNavigationVisible) => {
        const { handleButtonHamburgerClick } = this.props;
        if (isFunction(handleButtonHamburgerClick)) {
            handleButtonHamburgerClick(overlayNavigationVisible);
        }
    };
}
