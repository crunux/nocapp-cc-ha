import { envs } from '../../../src/config/plugins/envs.plugin'




describe('envs.plugin.ts', () => {


    test('should return env option', () => {
        expect(envs).toEqual({
            PORT: 3000,
            PROD: false,
            MAIL_EMAIL: 'joancruz0502@gmail.com',
            MAIL_SECRET_KEY: 'fkjoxlnpqttrayfg',
            MAIL_SERVICE: 'gmail',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_URI: 'mongodb://alumno:123456@10.0.0.4:27017/?authMechanism=DEFAULT',
            MONGO_USER: 'alumno',
            MONGO_PASS: '123456',
            POSTGRES_URL: 'postgresql://alumno:123456@10.0.0.4:5432/NOC-TEST',
            POSTGRES_USER: 'alumno',
            POSTGRES_PASS: '123456',
            POSTGRES_DB: 'NOC-TEST'

        })
    })

    test('should return env option no valid', () => {
        expect(envs).not.toEqual({
            PORT: 3000,
            PROD: false,
            MAIL_EMAIL: 'joancruz0502@gmail.com',
            MAIL_SECRET_KEY: 'fkjoxlnpqttrayfg',
            MAIL_SERVICE: 'gmail',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_URI: 'mongodb://alumnno:123456@10.0.0.5:27017/?authMechanism=DEFAULT',
            MONGO_USER: 'alumno',
            MONGO_PASS: '123456',
            POSTGRES_URL: 'postgresql://alumno:123456@10.0.0.5:5432/NOC',
            POSTGRES_USER: 'alumno',
            POSTGRES_PASS: '123456',
            POSTGRES_DB: 'NOC'

        })
    })

    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('../../../src/config/plugins/envs.plugin')
            expect(true).toBe(false)
        }
        catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })

})