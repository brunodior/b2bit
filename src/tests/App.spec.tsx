import axios from 'axios';
import { doLogin } from '../api/authService';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
    data: {
        "user": {
            "id": 4,
            "name": "Cliente",
            "email": "cliente@youdrive.com",
            "is_active": true,
            "avatar": {
                "id": 75,
                "high": "https://you-drive-homologation-bucket.s3.amazonaws.com/media/images/30f2ade090db49d9a3dc7594a778ffa4_high.png",
                "medium": "https://you-drive-homologation-bucket.s3.amazonaws.com/media/images/30f2ade090db49d9a3dc7594a778ffa4_medium.png",
                "low": "https://you-drive-homologation-bucket.s3.amazonaws.com/media/images/30f2ade090db49d9a3dc7594a778ffa4_low.png"
            },
            "type": "StoreUser",
            "created": "2023-09-20T11:42:54.515946-03:00",
            "modified": "2024-05-17T18:06:24.635043-03:00",
            "role": "OWNER"
        },
        "tokens": {
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzUxNTk4OSwiaWF0IjoxNzE1OTc5OTg5LCJqdGkiOiJhZDM5NWM3NWI4NWI0ZmQ4ODI0MmJhNWI4MzZjZGNkMyIsInVzZXJfaWQiOjR9.plLoepQMSO3xwTvBYZrni5E91reLWvJgkuBcKpWRhi8",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MDY2Mzg5LCJpYXQiOjE3MTU5Nzk5ODksImp0aSI6IjI4NTYyYmJhZWM1OTQyZGU4ZjNhNGY5Y2M3NmI4OTY2IiwidXNlcl9pZCI6NH0.ZiZfu_ozjV_LX4B2gpeNdcljFCFUu5WUG-P33v5vbDY"
        }
    },
    status: 200,
    statusText: 'OK'
}

const mockUserData = {
    "email": "cliente@youdrive.com",
    "password": "password"
}

describe('Test API', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should login successfully', async () => {
        mockAxios.post.mockResolvedValueOnce(mockResponse);

        const data = await doLogin(mockUserData);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(data).toEqual(mockResponse.data); // Verifica a propriedade data da resposta
    });
});
