import React, { Component } from 'react';
import i18next from 'i18next';

export function getTranslation(options = {}) {
    const { locale, files } = options;

    const path = '{locale}/{file}.json';
    const data = {};
    files.forEach((file) => {
        const requirePath = path.replace('{locale}', locale).replace('{file}', file);
        data[file] = require(`translations/${requirePath}`);
    });

    return data;
}

export function withTranslation(WrappedComponent) {
    class WithTranslationHOC extends Component {
        render() {
            const { forwardedRef, translation, ...other } = this.props;

            // TODO: figure out how this should work with the languages
            // and also switching between languages

            const resources = {
                en: {
                    ...translation
                }
            };

            i18next.init({
                lng: 'en',
                debug: false,
                resources
            });

            const t = i18next.t.bind(i18next);

            return <WrappedComponent ref={forwardedRef} t={t} {...other} />;
        }
    }

    return React.forwardRef((props, ref) => {
        return <WithTranslationHOC {...props} forwardedRef={ref} />;
    });
}

export function withTranslationApp(WrappedComponent) {
    class WithTranslationAppHOC extends Component {
        render() {
            const { forwardedRef, ...other } = this.props;
            const { translation } = this.props.pageProps;

            // TODO: figure out how this should work with the languages
            // and also switching between languages

            const resources = {
                en: {
                    ...translation
                }
            };

            i18next.init({
                lng: 'en',
                debug: false,
                resources
            });

            const t = i18next.t.bind(i18next);

            return <WrappedComponent ref={forwardedRef} t={t} {...other} />;
        }
    }

    return React.forwardRef((props, ref) => {
        return <WithTranslationAppHOC {...props} forwardedRef={ref} />;
    });
}
