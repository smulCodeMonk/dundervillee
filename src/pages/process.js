import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { withTranslation, getTranslation } from 'utils/translations/i18n';
import styles from './index.module.scss';

class Process extends Component {
    render() {
        const { t } = this.props;

        return (
            <div className={styles.page}>
                <Head>
                    <title>{t('process:meta__title')}</title>
                </Head>

                <h1>{t('process:heading')}</h1>
            </div>
        );
    }
}
export default withTranslation(Process);

export const getStaticProps = ({ locale = process.env.LOCALE, locales = process.env.LOCALES }) => {
    const shared = ['header', 'footer', 'cookie-notification'];
    const translation = getTranslation({
        locale,
        locales,
        files: ['process', ...shared]
    });

    return {
        props: {
            translation
        }
    };
};
