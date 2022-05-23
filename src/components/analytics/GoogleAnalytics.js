/* eslint-disable camelcase */
/* eslint-disable no-console */

import React, { Component } from 'react';
import Script from 'next/script';

import { removeEmpty, withAnalytics, GRANTED } from 'components/analytics/Analytics';

class GoogleAnalytics extends Component {
    componentDidMount() {
        this._setEventListeners();
    }

    render() {
        const { analytics } = this.props;
        const isConsentGranted = analytics.trackingConsent === GRANTED;

        const id = process.env.NEXT_PUBLIC_GLOBAL_ANALYTICS_ID || null;

        if (!isConsentGranted) return null;
        if (!id) {
            console.warn('Missing Tracking ID');
            return null;
        }

        return (
            <>
                <Script strategy="beforeInteractive" src="https://www.google-analytics.com/analytics.js" />
                <Script strategy="beforeInteractive">{`window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date; ga('create', '${id}', 'auto');`}</Script>
            </>
        );
    }

    _setEventListeners() {
        const { analytics } = this.props;
        analytics.events.addEventListener('trackPage', this._handleTrackPage);
        analytics.events.addEventListener('trackEvent', this._handleTrackEvent);
    }

    _handleTrackPage = ({ path, title }) => {
        if (process.env.NEXT_PUBLIC_GLOBAL_ANALYTICS_ID) {
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
            // The type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
            window.ga &&
                window.ga('send', {
                    hitType: 'pageview',
                    page: `/virtual${path}`
                });
        }
    };

    // It's possible to send additional event data when required, for instance when setting up ecommerce
    // https://developers.google.com/tag-manager/ecommerce-ga4
    _handleTrackEvent = ({ event, category, action, label, ...other }) => {
        if (process.env.NEXT_PUBLIC_GLOBAL_ANALYTICS_ID) {
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
            // The type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
            window.ga &&
                window.ga(
                    'send',
                    removeEmpty({
                        hitType: 'event',
                        eventCategory: category,
                        eventAction: action,
                        eventLabel: label,
                        ...other
                    })
                );
        }
    };
}

export default withAnalytics(GoogleAnalytics);
