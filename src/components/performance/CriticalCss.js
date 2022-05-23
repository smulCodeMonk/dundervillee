import { readFileSync } from 'fs';
import { join } from 'path';

import React from 'react';
import { Head } from 'next/document';

const InlineStyle = ({ assetPrefix, file, nonce }) => {
    const cssPath = join(process.cwd(), '.next', file);
    const cssSource = readFileSync(cssPath, 'utf-8');
    const html = { __html: cssSource };
    const id = `${assetPrefix}/_next/${file}`;
    return <style dangerouslySetInnerHTML={html} data-href={id} nonce={nonce} />;
};

export default class CriticalCssHead extends Head {
    getCssLinks({ allFiles }) {
        const { assetPrefix } = this.context;
        const { nonce } = this.props;
        const isCss = (file) => /\.css$/.test(file);
        const renderCss = (file) => <InlineStyle key={file} file={file} nonce={nonce} assetPrefix={assetPrefix} />;
        return allFiles && allFiles.length > 0 ? allFiles.filter(isCss).map(renderCss) : null;
    }
}
