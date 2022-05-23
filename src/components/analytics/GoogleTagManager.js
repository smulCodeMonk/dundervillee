/* eslint-disable camelcase */
/* eslint-disable no-console */

import React, { Component } from 'react';
import Script from 'next/script';

import { withAnalytics, removeEmpty, GRANTED } from 'components/analytics/Analytics';

class GoogleTagManager extends Component {
    componentDidMount() {
        this._setEventListeners();
    }

    render() {
        const { analytics } = this.props;
        const isConsentGranted = analytics.trackingConsent === GRANTED;

        const id = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || null;

        if (!isConsentGranted) return null;
        if (!id) {
            console.warn('Missing Tracking ID');
            return null;
        }

        return (
            <>
                <Script strategy="beforeInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
                </Script>
                <noscript>
                    <iframe src={`https://www.googletagmanager.com/ns.html?id=${id}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                </noscript>
            </>
        );
    }

    _setEventListeners() {
        const { analytics } = this.props;
        analytics.events.addEventListener('trackPage', this._handleTrackPage);
        analytics.events.addEventListener('trackEvent', this._handleTrackEvent);
    }

    _handleTrackPage = ({ path, title }) => {
        if (process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'VirtualPageView',
                    virtualPageURL: `/virtual${path}`
                });
        }
    };

    // It's possible to send additional event data when required, for instance when setting up ecommerce
    // https://developers.google.com/tag-manager/ecommerce-ga4
    _handleTrackEvent = ({ event, category, action, label, ...other }) => {
        if (process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) {
            window.dataLayer &&
                window.dataLayer.push(
                    removeEmpty({
                        event,
                        category,
                        action,
                        label,
                        ...other
                    })
                );
        }
    };
}

export default withAnalytics(GoogleTagManager);
