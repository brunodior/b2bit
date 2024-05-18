import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.homologation.cliqdrive.com.br/auth/'
})

export async function doLogin(user?: any){
    const response = await axios.post('https://api.homologation.cliqdrive.com.br/auth/login/', user, {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json;version=v1_web'
        }
    })
    return response;
}


export async function getProfile(token: string) {
    const response = await api.get('/profile/', {  
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json;version=v1_web'
        }
      });  
      return response.data;
}

