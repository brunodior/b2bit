import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { doLogin } from '../api/authService'; 
import { render, screen, act } from '@testing-library/react';
import bus from '../utils/bus';
import Loading from '../components/Loading';
import Message from '../components/Message';



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

jest.useFakeTimers();

describe('Message Component', () => {
    test('displays message when flash event is emitted', () => {
        render(<Message />);
        
        act(() => {
            bus.emit('flash', { message: 'Test Message', color: 'green' });
        });

        expect(screen.getByText('Test Message')).toBeInTheDocument();
        expect(screen.getByText('Test Message')).toHaveClass('bg-green-500');
    });

    test('hides message after 3 seconds', () => {
        render(<Message />);
        
        act(() => {
            bus.emit('flash', { message: 'Test Message', color: 'green' });
        });

        expect(screen.getByText('Test Message')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(screen.queryByText('Test Message')).toBeNull();
    });
});


describe('Loading Component', () => {
    test('displays loading component when setLoading(true) is called', () => {
        render(<Loading />);

        act(() => {
            bus.emit('loading', { visibility: true });
        });

        expect(screen.getByAltText('logoLoading')).toBeInTheDocument();
    });

    test('hides loading component when setLoading(false) is called', () => {
        render(<Loading />);

        act(() => {
            bus.emit('loading', { visibility: true });
        });

        expect(screen.getByAltText('logoLoading')).toBeInTheDocument();

        act(() => {
            bus.emit('loading', { visibility: false });
        });

        expect(screen.queryByAltText('logoLoading')).toBeNull();
    });
});