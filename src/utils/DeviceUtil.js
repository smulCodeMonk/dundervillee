// export const isMediaQueryNarrow = () => {
//     const { adaptive } = require('@superherocheesecake/adaptive');
//     return adaptive.isMediaQueryActive('extra-narrow') || adaptive.isMediaQueryActive('narrow');
// };

// export const isMediaQueryRegular = () => {
//     const { adaptive } = require('@superherocheesecake/adaptive');
//     return adaptive.isMediaQueryActive('regular');
// };
// export const isMediaQueryWide = () => {
//     const { adaptive } = require('@superherocheesecake/adaptive');
//     return adaptive.isMediaQueryActive('wide');
// };

export const isServer = () => {
    return typeof window === `undefined`;
};

export const isMediaQueryNarrow = () => {
    if (isServer()) return undefined;

    const { adaptive } = require('@superherocheesecake/adaptive');
    return adaptive.isMediaQueryActive('extra-narrow') || adaptive.isMediaQueryActive('narrow');
};

// export const isMediaQueryNarrow = () => {
//     const { adaptive } = require('@superherocheesecake/adaptive');
//     return adaptive.isMediaQueryActive("extra-narrow") || adaptive.isMediaQueryActive("narrow");
// };

export const isMediaQueryRegular = () => {
    if (isServer()) return undefined;

    const { adaptive } = require('@superherocheesecake/adaptive');
    return adaptive.isMediaQueryActive('regular');
};

// export const isMediaQueryRegular = () => {
//     const { adaptive } = require('@superherocheesecake/adaptive');
//     return adaptive.isMediaQueryActive("regular");
// };

export const isMediaQueryWide = () => {
    if (isServer()) return undefined;

    const { adaptive } = require('@superherocheesecake/adaptive');
    return adaptive.isMediaQueryActive('wide');
};

// export const isMediaQueryWide = () => {
//     const { adaptive } = require('@superherocheesecake/adaptive');
//     return adaptive.isMediaQueryActive("wide");
// };
