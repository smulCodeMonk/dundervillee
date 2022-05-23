import React, { Component } from 'react';

import { withTranslation, getTranslation } from 'utils/translations/i18n';

class Error extends Component {
    render() {
        const { t, statusCode } = this.props;

        return (
            <div className="page page-error">
                <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
            </div>
        );
    }
}

export default withTranslation(Error);

// fallback to vars assigned for static export
export const getStaticProps = ({ locale = process.env.LOCALE, locales = process.env.LOCALES }) => {
    const shared = ['header', 'footer', 'cookie-notification'];
    const translation = getTranslation({
        locale,
        locales,
        files: [...shared]
    });

    return {
        props: {
            translation
        }
    };
};
