import React from 'react';
import Document, { Html, Main, NextScript } from 'next/document';
import CriticalCss from 'components/performance/CriticalCss';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        const lang = this.props.locale || process.env.LOCALE;

        return (
            <Html lang={lang}>
                <CriticalCss />

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
