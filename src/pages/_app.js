import 'styles/main.scss';

import { withTranslationApp } from 'utils/translations/i18n';
import Analytics from 'components/analytics/Analytics';

import Transition from '@superherocheesecake/next-transition';

import React from 'react';
import Head from 'next/head';

import SafariCacheFix from 'components/performance/SafariCacheFix';
import { report } from 'components/performance/WebVitals';

import CookieNotification from 'components/CookieNotification';
import GoogleGlobalSiteTag from 'components/analytics/GoogleGlobalSiteTag';

import Header from 'components/Header';
import Footer from 'components/Footer';

import WatchForHover from 'utils/WatchForHover';
import Navigation from 'components/Navigation';

import OverlayMenu from 'components/OverlayMenu';

import PageReveal from 'components/PageReveal';

import Preloader from 'components/Preloader';

import Spritesheet from 'components/Spritesheet';

import CustomCursor from 'components/CustomCursor';

import { isFunction } from 'lodash';
import { resizeManager } from '@superherocheesecake/next-resize-manager';
import { isMediaQueryNarrow, isMediaQueryRegular } from 'utils/DeviceUtil';

export function reportWebVitals(props) {
    report(props);
}

class Application extends React.Component {
    state = {
        overlayNavigationVisible: false,
        isNarrow: null,
        isPreloaderCompleted: false,
        onHover: false,
        isSpritesheetMotionCompleted: false
    };

    componentDidMount() {
        new WatchForHover();
    }

    render() {
        const { Component, t, pageProps, router } = this.props;
        const { onHover, isNarrow, isPreloaderCompleted, overlayNavigationVisible, isSpritesheetMotionCompleted } = this.state;

        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    <link rel="icon" type="image/png" href="/assets/img/favicon.png"></link>
                </Head>

                <SafariCacheFix />

                <Transition fragment={router.pathname}>
                    {isPreloaderCompleted && (
                        <>
                            <Header
                                t={t}
                                router={router}
                                overlayNavigationVisible={this.state.overlayNavigationVisible}
                                handleButtonHamburgerClick={this._handleButtonHamburgerClick}
                                onHover={onHover}
                                isNarrow={isNarrow}
                                handleNavigationHover={this._handleNavigationHover}
                                handleMediaQuery={this._handleMediaQuery}
                            ></Header>

                            <Component
                                isSpritesheetMotionCompleted={isSpritesheetMotionCompleted}
                                handleSpritesheetMotionCompleted={this._handleSpritesheetMotionCompleted}
                                handleNavigationHover={this._handleNavigationHover}
                                {...pageProps}
                            />

                            <Footer handleMouseenter={this._handleMouseenter} handleMouseleave={this._handleMouseleave} t={t}></Footer>
                        </>
                    )}
                </Transition>

                {/* <PageReveal></PageReveal> */}

                {/* {isPreloaderCompleted && isNarrow && <OverlayMenu overlayNavigationVisible={overlayNavigationVisible} t={t} />} */}

                {!isPreloaderCompleted && <Preloader onPreloaderCompleted={this._handlePreloaderCompleted} />}

                {!isNarrow && <CustomCursor onHover={onHover} />}
            </>
        );
    }

    _handleButtonHamburgerClick = (overlayNavigationVisible = true) => {
        this.setState({ overlayNavigationVisible: overlayNavigationVisible }, () => {
            if (this.state.overlayNavigationVisible) {
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.overflowY = 'scroll';
            }
        });
    };

    _handlePreloaderCompleted = () => {
        this.setState({ isPreloaderCompleted: true });
    };

    _handleNavigationHover = (e) => {
        if (e.type === 'mouseenter') {
            this.setState({ onHover: true });
        }
        if (e.type === 'mouseleave') {
            this.setState({ onHover: false });
        }
        if (e.type === 'mousedown') {
            this.setState({ onHover: false });
        }
    };

    _handleSpritesheetMotionCompleted = () => {
        this.setState({ isSpritesheetMotionCompleted: true });
    };

    _handleMediaQuery = () => {
        console.log(this.state.isNarrow);
        if (isMediaQueryNarrow() || isMediaQueryRegular()) {
            this.setState({ isNarrow: true });
        } else {
            this.setState({ isNarrow: false });
        }
    };
}
export default withTranslationApp(Application);
