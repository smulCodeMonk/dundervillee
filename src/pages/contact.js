import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { withTranslation, getTranslation } from 'utils/translations/i18n';
import styles from './contact.module.scss';
import Form from 'components/Form';

class Contact extends Component {
    render() {
        const { t } = this.props;

        return (
            <div className={styles.page}>
                <Head>
                    <title>{t('contact:meta__title')}</title>
                </Head>

                <span className={styles.heading}>{t('contact:heading')}</span>

                <Form t={t} />
            </div>
        );
    }
}

export default withTranslation(Contact);

export const getStaticProps = ({ locale = process.env.LOCALE, locales = process.env.LOCALES }) => {
    const shared = ['header', 'footer', 'cookie-notification'];
    const translation = getTranslation({
        locale,
        locales,
        files: ['contact', ...shared]
    });

    return {
        props: {
            translation
        }
    };
};
