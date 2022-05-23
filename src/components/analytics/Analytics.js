/* eslint-disable camelcase */

import React, { Component } from 'react';
import { withRouter } from 'next/router';
import EventDispatcher from '@superherocheesecake/event-dispatcher';
import { cookie } from '@superherocheesecake/cookie';

export const DENIED = 'denied';
export const GRANTED = 'granted';

export function removeEmpty(obj) {
    /* eslint-disable-next-line no-unused-vars */
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

const trackingEvents = [];
class EventBus extends EventDispatcher {
    trackPage(...args) {
        this.dispatchEvent('trackPage', ...args);
    }

    trackEvent(...args) {
        this.dispatchEvent('trackEvent', ...args);
    }
}

const AnalyticsContext = React.createContext();

class Analytics extends Component {
    constructor(props) {
        super(props);

        const events = new EventBus();

        // The immediate strategy doesn't wait for the user to give consent.
        // Most of the times the cookie notification will say something like:
        // This site uses cookies to provide you with a great user experience. By using XXX, you accept our use of cookies (Link to page)
        this.state = {
            events,
            trackingConsent: props.strategy === 'immediate' ? GRANTED : DENIED,
            consent: this._handleConsent,
            trackPage: this._handleTrackPage,
            trackEvent: this._handleTrackEvent
        };
    }

    componentDidMount() {
        this._setEventListeners();

        this._trackInitialPage();

        const isTrackingGranted = cookie.get('tracking_consent') === GRANTED;
        if (isTrackingGranted) {
            this.state.consent();
        }
    }

    render() {
        const { children } = this.props;
        return <AnalyticsContext.Provider value={this.state}>{children}</AnalyticsContext.Provider>;
    }

    _setEventListeners() {
        this.props.router.events.on('routeChangeComplete', this._handleRouteChangeComplete);
    }

    _trackInitialPage() {
        this.state.trackPage({
            path: this.props.router.asPath,
            title: document.title
        });
    }

    _handleConsent = (callback) => {
        this.setState(
            {
                trackingConsent: GRANTED
            },
            () => {
                cookie.set('tracking_consent', GRANTED);
                this._handleConsentComplete(callback);
            }
        );
    };

    _handleConsentComplete = (callback) => {
        // send all events created before content
        trackingEvents.forEach((event) => {
            switch (event.type) {
                case 'page':
                    this.state.trackPage(event.data);
                    break;
                case 'event':
                    this.state.trackEvent(event.data);
                    break;
            }
        });

        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    _handleRouteChangeComplete = (path) => {
        this.state.trackPage({
            path,
            title: document.title
        });
    };

    _handleTrackPage = (data) => {
        const isTrackingGranted = this.state.trackingConsent === GRANTED;

        if (isTrackingGranted) {
            this.state.events.trackPage(data);
        } else {
            trackingEvents.push({ type: 'page', data });
        }

        this._log(data);
    };

    _handleTrackEvent = (data) => {
        const isTrackingGranted = this.state.trackingConsent === GRANTED;

        if (isTrackingGranted) {
            this.state.events.trackEvent(data);
        } else {
            trackingEvents.push({ type: 'event', data });
        }

        this._log(data);
    };

    _log(data) {
        const isTrackingGranted = this.state.trackingConsent === GRANTED;

        if (process.env.NEXT_PUBLIC_DEBUG_ANALYTICS === 'true') {
            /* eslint-disable-next-line no-console */
            console.log(removeEmpty({ isTrackingGranted, ...data }));
        }
    }
}

export default withRouter(Analytics);

export function withAnalytics(WrappedComponent) {
    class WithAnalyticsHOC extends Component {
        render() {
            const { forwardedRef, ...other } = this.props;
            return <AnalyticsContext.Consumer>{(analytics) => <WrappedComponent ref={forwardedRef} analytics={analytics} {...other} />}</AnalyticsContext.Consumer>;
        }
    }

    return React.forwardRef((props, ref) => {
        return <WithAnalyticsHOC {...props} forwardedRef={ref} />;
    });
}
