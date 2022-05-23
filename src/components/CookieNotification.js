/* eslint-disable camelcase */

import styles from './CookieNotification.module.scss';

import React, { Component } from 'react';
import { cookie } from '@superherocheesecake/cookie';

import { withAnalytics, GRANTED } from 'components/analytics/Analytics';

class CookieNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        const isVisible = cookie.get('tracking_consent') !== GRANTED;

        if (isVisible) {
            this.setState({
                isVisible: true
            });
        }
    }

    render() {
        const { t } = this.props;
        const { isVisible } = this.state;

        return (
            <>
                {isVisible && (
                    <div className={styles.container}>
                        {t('cookie-notification:heading')}{' '}
                        <button className={styles.button} onClick={this._handleClick}>
                            {t('cookie-notification:button__copy')}
                        </button>
                    </div>
                )}
            </>
        );
    }

    _handleClick = () => {
        const { analytics } = this.props;

        this.setState({
            isVisible: false
        });

        analytics.consent(() => {
            analytics.trackEvent({ event: 'event', category: 'cookie consent', action: 'click', label: 'granted' });
        });
    };
}

export default withAnalytics(CookieNotification);
