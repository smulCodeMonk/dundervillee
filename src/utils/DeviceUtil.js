export const isMediaQueryNarrow = () => {
    const { adaptive } = require('@superherocheesecake/adaptive');
    return adaptive.isMediaQueryActive('extra-narrow') || adaptive.isMediaQueryActive('narrow');
};

export const isMediaQueryRegular = () => {
    const { adaptive } = require('@superherocheesecake/adaptive');
    return adaptive.isMediaQueryActive('regular');
};
export const isMediaQueryWide = () => {
    const { adaptive } = require('@superherocheesecake/adaptive');
    return adaptive.isMediaQueryActive('wide');
};
