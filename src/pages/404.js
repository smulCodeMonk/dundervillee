import React, { Component } from 'react';

import { withTranslation, getTranslation } from 'utils/translations/i18n';

class Custom404 extends Component {
    render() {
        return (
            <div className="page page-error">
                <h1>Custom 404</h1>
            </div>
        );
    }
}

export default withTranslation(Custom404);

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
