/* eslint-disable camelcase */
/* eslint-disable no-console */

import React, { Component } from 'react';
import Script from 'next/script';

import { withAnalytics, removeEmpty, GRANTED } from 'components/analytics/Analytics';

class GoogleGlobalSiteTag extends Component {
    componentDidMount() {
        const { analytics } = this.props;
        const id = process.env.NEXT_PUBLIC_GLOBAL_SITE_TAG_ID || null;
        const anonymizeIp = process.env.NEXT_PUBLIC_GLOBAL_SITE_TAG_ANONYMIZE_IP || 'true';
        const sendPageView = process.env.NEXT_PUBLIC_GLOBAL_SITE_TAG_SEND_PAGE_VIEW || 'false';

        // use global analytics to register the events before content was given
        analytics.trackEvent({
            gtagEvent: 'js',
            event: new Date()
        });
        analytics.trackEvent({
            gtagEvent: 'config',
            event: id
        });
        analytics.trackEvent({
            gtagEvent: 'config',
            event: id,
            anonymize_ip: anonymizeIp === 'true' ? true : false
        });
        analytics.trackEvent({
            gtagEvent: 'config',
            event: id,
            send_page_view: sendPageView === 'true' ? true : false
        });

        this._setEventListeners();
    }

    render() {
        const { analytics } = this.props;
        const isConsentGranted = analytics.trackingConsent === GRANTED;

        const id = process.env.NEXT_PUBLIC_GLOBAL_SITE_TAG_ID || null;

        if (!isConsentGranted) return null;
        if (!id) {
            console.warn('Missing Tracking ID');
            return null;
        }

        return (
            <>
                <Script strategy="beforeInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
                <Script strategy="beforeInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}`}</Script>
            </>
        );
    }

    _setEventListeners() {
        const { analytics } = this.props;
        analytics.events.addEventListener('trackPage', this._handleTrackPage);
        analytics.events.addEventListener('trackEvent', this._handleTrackEvent);
    }

    _handleTrackPage = ({ path, title }) => {
        if (process.env.NEXT_PUBLIC_GLOBAL_SITE_TAG_ID) {
            // https://developers.google.com/gtagjs/reference/event#page_view
            window.gtag &&
                window.gtag('event', 'page_view', {
                    page_path: `/virtual${path}`
                });
        }
    };

    // It's possible to send additional event data when required, for instance when setting up ecommerce
    // https://developers.google.com/tag-manager/ecommerce-ga4
    _handleTrackEvent = ({ event, category, action, label, gtagEvent = 'event', ...other }) => {
        if (process.env.NEXT_PUBLIC_GLOBAL_SITE_TAG_ID) {
            // https://developers.google.com/analytics/devguides/collection/gtagjs/events#send_events
            window.gtag &&
                window.gtag(
                    gtagEvent,
                    event,
                    removeEmpty({
                        event_category: category,
                        event_action: action,
                        event_label: label,
                        ...other
                    })
                );
        }
    };
}

export default withAnalytics(GoogleGlobalSiteTag);
