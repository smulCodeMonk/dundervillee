import { createMocks } from 'node-mocks-http';
import endpoint from '../src/pages/api/contact';

describe('/api/contact', () => {
    test('(200) Valid POST request', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john@shcc.nl'
            }
        });

        const response = {
            success: true
        };

        await endpoint(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toMatchObject(response);
    });

    test('(405) Invalid method', async () => {
        const { req, res } = createMocks({
            method: 'GET'
        });

        const response = {
            error: 'METHOD_NOT_ALLOWED'
        };

        await endpoint(req, res);

        expect(res._getStatusCode()).toBe(405);
        expect(JSON.parse(res._getData())).toMatchObject(response);
    });

    test('(422) Invalid email', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                firstname: 'John',
                lastname: 'Doe',
                email: 'invalid'
            }
        });

        const response = {
            data: {
                email: 'invalid',
                firstname: 'John',
                lastname: 'Doe'
            },
            error: 'VALIDATION_ERROR',
            errors: {
                email: [
                    {
                        error: 'INVALID_EMAIL'
                    }
                ]
            }
        };

        await endpoint(req, res);

        expect(res._getStatusCode()).toBe(422);
        expect(JSON.parse(res._getData())).toMatchObject(response);
    });
});
