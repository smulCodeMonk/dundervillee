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

import CanvasCustomCursor from 'components/CanvasCustomCursor';

import { isFunction } from 'lodash';

export function reportWebVitals(props) {
    report(props);
}

class Application extends React.Component {
    state = {
        overlayNavigationVisible: false,
        isNarrow: null,
        isPreloaderCompleted: false,
        onHover: false
    };

    componentDidMount() {
        new WatchForHover();
    }

    render() {
        const { Component, t, pageProps, router } = this.props;
        const { isPreloaderCompleted } = this.state;
        const { onHover } = this.state;

        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    <link rel="icon" type="image/png" href="/assets/img/favicon.png"></link>
                </Head>

                <SafariCacheFix />
                {/* 
                {isPreloaderCompleted && (
                    <>
                    <Header t={t} router={router} overlayNavigationVisible={this.state.overlayNavigationVisible} handleButtonHamburgerClick={this._handleButtonHamburgerClick}></Header>
                    <Footer t={t}></Footer>
                    </>
                )} */}

                <Transition fragment={router.pathname}>
                    {isPreloaderCompleted && (
                        <>
                            <Header
                                t={t}
                                router={router}
                                overlayNavigationVisible={this.state.overlayNavigationVisible}
                                handleButtonHamburgerClick={this._handleButtonHamburgerClick}
                                onHover={onHover}
                                // handleOnHover={this._handleOnHover}
                                handleMouseenter={this._handleMouseenter}
                                handleMouseleave={this._handleMouseleave}
                                handleMouseDown={this._handleMouseDown}
                            ></Header>

                            <Component handleMouseenter={this._handleMouseenter} handleMouseleave={this._handleMouseleave} handleMouseDown={this._handleMouseDown} {...pageProps} />

                            <Footer handleMouseenter={this._handleMouseenter} handleMouseleave={this._handleMouseleave} t={t}></Footer>
                        </>
                    )}
                </Transition>

                {/* <PageReveal></PageReveal> */}
                {/* {this.state.overlayNavigationVisible && */}
                {/* <OverlayMenu overlayNavigationVisible={this.state.overlayNavigationVisible} t={t} /> */}
                {/*   } */}

                {!isPreloaderCompleted && <Preloader onPreloaderCompleted={this._handlePreloaderCompleted} />}

                <CustomCursor onHover={onHover} />
                {/* <CanvasCustomCursor /> */}
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
    _handleMouseenter = (e) => {
        if (e.type === 'mouseenter') {
            this.setState({ onHover: true });
        }
    };
    _handleMouseleave = (e) => {
        if (e.type === 'mouseleave') {
            this.setState({ onHover: false });
        }
    };
    // _handleOnHover = (onHover) => {
    //     console.log(onHover);
    //     this.setState({ onHover: onHover });
    // };

    _handleMouseDown = (e) => {
        if (e.type === 'mousedown') {
            this.setState({ onHover: false });
        }
    };
}

export default withTranslationApp(Application);
