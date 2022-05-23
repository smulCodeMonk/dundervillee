import React from 'react';
import Script from 'next/script';

export default function SafariCacheFix() {
    return <Script strategy="beforeInteractive">{`window.onpageshow = function(event) { if (event.persisted) { window.location.reload() } };`}</Script>;
}
