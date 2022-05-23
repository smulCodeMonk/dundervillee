import { validateMethods } from 'utils/middleware/apiValidateMethods';
import { validateBody } from 'utils/middleware/apiValidateBody';

async function handler(req, res) {
    // try/catch required for correct async await jest tests
    try {
        await validateMethods(req, res, ['POST']);
        await validateBody(req, res, {
            firstname: 'required',
            lastname: 'required',
            email: 'required|email'
        });
        res.status(200).json({ success: true });
    } catch (err) {}
}

export default handler;
