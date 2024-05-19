import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { doLogin } from '../api/authService'; 




describe('doLogin', () => {
        let mock: MockAdapter;

        beforeAll(() => {
            mock = new MockAdapter(axios);
        });

        afterEach(() => {
            mock.reset();
        });

        test('should successfully login with correct user credentials', async () => {
            const mockUser = { email: 'cliente@youdrive.com', password: 'password' };
            const mockResponse = {
                data: {
                user: {
                    id: 4,
                    name: 'Cliente',
                    email: 'cliente@youdrive.com',
                    is_active: true,
                    avatar: {},
                    type: 'StoreUser',
                    created: '2023-09-20T11:42:54.515946-03:00',
                    modified: '2024-05-17T18:06:24.635043-03:00',
                    role: 'OWNER'
                },
                tokens: {
                    refresh: 'fake-refresh-token',
                    access: 'fake-access-token'
                }
                },
                status: 200,
                statusText: 'OK'
            };

            mock.onPost('https://api.homologation.cliqdrive.com.br/auth/login/').reply(200, mockResponse);

            const response = await doLogin(mockUser);

            expect(response.data.data).toEqual(mockResponse.data);
            expect(response.status).toBe(200);
        });

        test('should fail login with incorrect user credentials', async () => {
            const mockUserWrong = { username: 'wrong', password: 'wrong' };
            const mockErrorResponse = {
            response: {
                data: { details: 'Usuário e/ou senha incorreto(s)' },
                status: 401
            }
            };

            mock.onPost('https://api.homologation.cliqdrive.com.br/auth/login/').reply(401, mockErrorResponse.response.data);

            try {
            await doLogin(mockUserWrong);
            } catch (error: any) {
            expect(error.response.data).toEqual(mockErrorResponse.response.data);
            expect(error.response.status).toBe(401);
            }
        });

});


