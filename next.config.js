const path = require('path');
const process = require('process');
const i18n = require('./i18n');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const defaultSassOptions = {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
        @import "styles/core/functions.scss";
        @import "styles/core/mixins.scss";
        @import "styles/core/variables.scss";
    `
};

const defaultEslintConfig = {
    ignoreDuringBuilds: true
};

const defaultWebpackConfig = (config) => {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
};

const defaultHeaders = [
    {
        source: '/:path*',
        headers: [
            {
                key: 'cache-control',
                value: 'public, max-age=1800, s-maxage=1800'
            }
        ]
    },
    {
        source: '/assets/:path*',
        headers: [
            {
                key: 'cache-control',
                value: 'public, max-age=31536000, s-maxage=31536000'
            }
        ]
    },
    {
        source: '/_next/static/:path*',
        headers: [
            {
                key: 'cache-control',
                value: 'public, max-age=31536000, s-maxage=31536000'
            }
        ]
    },
    {
        source: '/api/:path*',
        headers: [
            {
                key: 'cache-control',
                value: 'private, must-revalidate, no-cache'
            }
        ]
    },
    {
        source: '/(.*)', //security headers
        headers: [
            {
                key: 'X-DNS-Prefetch-Control',
                value: 'on'
            },
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=31556926; includeSubDomains; preload'
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block'
            },
            {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN'
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
            },
            {
                key: 'Referrer-Policy',
                value: 'no-referrer'
            },
            {
                key: 'X-Permitted-Cross-Domain-Policies',
                value: 'none'
            },
            {
                key: 'Content-Security-Policy',
                value: 'https:'
            }
        ]
    }
];

function getConfig(options) {
    if (options.isDevelop) {
        return Object.assign(options, {
            i18n
        });
    }

    switch (options.target) {
        case 'static':
            return Object.assign(options, {
                basePath: process.env.BASE_PATH,
                trailingSlash: true
            });
        case 'serverless':
            return Object.assign(options, {
                i18n
            });
        default:
            return Object.assign(options, {
                basePath: process.env.BASE_PATH,
                trailingSlash: true
            });
    }
}

module.exports = (phase) => {
    return getConfig({
        isDevelop: phase === PHASE_DEVELOPMENT_SERVER,
        target: process.env.TARGET || 'server',
        sassOptions: defaultSassOptions,
        webpack: defaultWebpackConfig,
        eslint: defaultEslintConfig,
        async headers() {
            return defaultHeaders;
        },
        poweredByHeader: false,
        'X-Mod-Pagespeed': false
    });
};
