import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { withTranslation, getTranslation } from 'utils/translations/i18n';
import styles from './index.module.scss';
import Navigation from '../components/Navigation';
import Banner from 'components/Banner';

import Marquee from 'components/Marquee';
import Spritesheet from 'components/Spritesheet';

import CanvasHouse from 'components/CanvasHouse';

import Faq from 'components/Faq';

class Home extends Component {
    el = createRef();

    _mousePosition = {
        x: 0,
        y: 0
    };

    componentDidMount() {
        this._setUpEventListeners();
    }

    componentWillUnmount() {
        this._removeEventListener();
    }
    render() {
        const { t, handleMouseenter, handleMouseleave, handleMouseDown, handleSpritesheetMotionCompleted, isSpritesheetMotionCompleted } = this.props;
        // console.log(handleMouseenter, handleMouseleave);
        return (
            <div ref={this.el} className={styles.page}>
                <Head>
                    <title>{t('home:meta__title')}</title>
                </Head>
                <Banner></Banner>
                {/* <Marquee /> */}
                <div className={styles.homeNavigation}>
                    <Navigation t={t} handleMouseDown={handleMouseDown} handleMouseenter={handleMouseenter} handleMouseleave={handleMouseleave}></Navigation>
                </div>
                {!isSpritesheetMotionCompleted && <Spritesheet handleSpritesheetMotionCompleted={handleSpritesheetMotionCompleted} />}
                {/* <CanvasHouse /> */}
                <Faq />
            </div>
        );
    }

    _setUpEventListeners() {
        window.addEventListener('click', this._handleWindowClick);
    }

    _removeEventListener() {
        window.addEventListener('click', this._handleWindowClick);
    }

    _updateBackgroundColor() {
        this.el.current.style.backgroundColor = '#FF00FF';
    }

    _updateMousePosition(e) {
        this._mousePosition = {
            x: e.clientX,
            y: e.clientY
        };

        // console.log(this._mousePosition);
    }

    _handleCtaClick = () => {
        this._updateBackgroundColor();
    };
}

export default withTranslation(Home);

// fallback to vars assigned for static export
export const getStaticProps = ({ locale = process.env.LOCALE, locales = process.env.LOCALES }) => {
    const shared = ['header', 'footer', 'cookie-notification'];
    const translation = getTranslation({
        locale,
        locales,
        files: ['home', ...shared]
    });

    return {
        props: {
            translation
        }
    };
};
