/* eslint-disable no-console */

// https://web.dev/defining-core-web-vitals-thresholds/
// https://web.dev/time-to-first-byte/
const targets = {
    TTFB: {
        value: 600,
        copy: '≤ 600ms'
    },
    FCP: {
        value: 1800,
        copy: '≤ 1800ms'
    },
    LCP: {
        value: 2500,
        copy: '≤ 2500ms'
    },
    FID: {
        value: 100,
        copy: '≤ 100ms'
    },
    CLS: {
        value: 0.1,
        copy: '≤ 0.1ms'
    }
};

export function report({ name, label, value }) {
    if (process.env.NEXT_PUBLIC_DEBUG_WEB_VITALS === 'true') {
        if (label === 'web-vital') {
            let output = `%cCore Web Vital -> ${name}: ${value.toFixed(3)}ms`;
            if (targets[name]) {
                output += ` - target: ${targets[name].copy}`;
            }
            console.log(output, `color: ${value <= targets[name].value ? 'green' : 'red'}`);
        } else {
            console.log(`${name}: ${value.toFixed(3)}ms (duration)`);
        }
    }
}
