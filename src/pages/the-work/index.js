import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { withTranslation, getTranslation } from 'utils/translations/i18n';
import styles from '../index.module.scss';

class theWork extends Component {
    render() {
        const { t } = this.props;

        return (
            <div className={styles.page}>
                <Head>
                    <title>{t('the-work:meta__title')}</title>
                </Head>

                <h1>{t('the-work:heading')}</h1>
            </div>
        );
    }
}

export default withTranslation(theWork);

export const getStaticProps = ({ locale = process.env.LOCALE, locales = process.env.LOCALES }) => {
    const shared = ['header', 'footer', 'cookie-notification'];
    const translation = getTranslation({
        locale,
        locales,
        files: ['the-work', ...shared]
    });

    return {
        props: {
            translation
        }
    };
};
