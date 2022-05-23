import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { withTranslation, getTranslation } from 'utils/translations/i18n';
import styles from './index.module.scss';

class Studio extends Component {
    render() {
        const { t } = this.props;

        return (
            <div className={styles.page}>
                <Head>
                    <title>{t('studio:meta__title')}</title>
                </Head>

                <h1>{t('studio:heading')}</h1>
            </div>
        );
    }
}

export default withTranslation(Studio);

export const getStaticProps = ({ locale = process.env.LOCALE, locales = process.env.LOCALES }) => {
    const shared = ['header', 'footer', 'cookie-notification'];
    const translation = getTranslation({
        locale,
        locales,
        files: ['studio', ...shared]
    });

    return {
        props: {
            translation
        }
    };
};
