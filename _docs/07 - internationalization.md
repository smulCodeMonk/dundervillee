# Internationalization

The boilerplate uses [i18next](https://www.i18next.com/) for translations.

Language files go inside the `src/translations` directory.

Use i18n.js in the root directory of this project to configure the locales.

Next.js supports the following [configs](https://nextjs.org/docs/advanced-features/i18n-routing);

## For static exports

By default Next.js doesn't support static exports, but we've build our custom exporter with limited configuration. You can use both `locales` and `defaultLocale`. Static exports will always export to locale subpaths, and will export to a folder called `out`, in the root directory. With the defaultLocale in the root of the export folder.

## Using Translations

#### Components

To get access to the translation keys and values you can wrap your page components in the `withTranslation` HOC.

```javascript
import { withTranslation, getTranslation } from 'utils/translations/i18n';

class MyComponent extends Component {
    render() {
        const { t } = this.props;
        return <>{t('your-lang-keys')}</>;
    }
}
export default withTranslation(MyComponent);

// Assign all the translation files you want to use in getStaticProps or getServerSideProps
export const getStaticProps = ({ locale, locales }) => {
    const shared = ['header', 'footer'];
    const translation = getTranslation({
        locale,
        locales,
        files: ['home', ...shared]
    });

    return {
        props: {
            translation
        }
    };
};
```

#### App

When you need the translation keys at Application level you can use the `withTranslationApp` HOC.

```javascript
import { withTranslationApp } from 'utils/translations/i18n';

class Application extends Component {
    render() {
        const { Component, t, pageProps } = this.props;
        return (
            <>
                {t('your-lang-keys')}
                <Component {...pageProps} />
            </>
        );
    }
}
export default withTranslationApp(Application);
```
