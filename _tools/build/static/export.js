/* eslint-disable no-console */
const rimraf = require('rimraf');
const fs = require('fs-extra');
const util = require('util');
const process = require('process');
const exec = util.promisify(require('child_process').exec);

const i18n = require('./../../../i18n');

const DIR_PUBLIC = './public';
const DIR_OUT = './out';

async function exportLocale(locale, locales, basePath) {
    process.env.LOCALE = locale;
    process.env.LOCALES = locales.join(',');
    process.env.BASE_PATH = basePath;

    // prepare for next build
    rimraf.sync('.next');

    const defaultString = locale === i18n.defaultLocale ? '(default locale)' : '';

    // build
    console.log(`${locale}: build ${defaultString}`);
    await exec(`next build`);

    // export
    console.log(`${locale}: export`);
    await exec(`next export -o ${DIR_OUT}${basePath}`);
}

async function buildAndExport() {
    const locales = i18n.locales;
    const otherLocales = locales.filter((l) => {
        return l !== i18n.defaultLocale;
    });

    console.log(`Clear old export folder`);
    rimraf.sync(DIR_OUT);

    console.log(`Copy public files`);
    fs.copySync(DIR_PUBLIC, DIR_OUT);

    // export default locale to root
    let locale = i18n.defaultLocale;
    let basePath = '';
    await exportLocale(locale, locales, basePath);

    // export all locales to own export folder
    for (let j = 0, lenj = otherLocales.length; j < lenj; j++) {
        locale = otherLocales[j];
        basePath = `/${locale}`;
        await exportLocale(locale, locales, basePath);
    }
    console.log(`Finished`);
}

buildAndExport();
