export function validateMethods(req, res, methods) {
    return new Promise((resolve, reject) => {
        const isValid = methods.indexOf(req.method) > -1;
        if (isValid) {
            return resolve(true);
        }
        res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
        return reject();
    });
}
