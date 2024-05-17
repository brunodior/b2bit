import api from '../utils/api'
import {useNavigate } from 'react-router-dom'
import useLoading from './useLoading'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){

    const {setFlashMessage} = useFlashMessage()
    const {setLoading} = useLoading()

   
    const navigate  = useNavigate()


    async function login(user?: any){

        setLoading(true);
          try {
            const data = await api.post('/login/', user, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json;version=v1_web'
              }
            });
            await authUser(data)
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            setFlashMessage(error.response.data.detail, 'red')
        }
    }

    function logout(){

      localStorage.removeItem('token')
      api.defaults.headers.Authorization = ''
      navigate('/')
      
    }
   
    async function authUser(response: any){


        localStorage.setItem('token', JSON.stringify(response.data.tokens.access))
        navigate('/profile')
        
    }

    async function checkAuth(){
      const token = localStorage.getItem('token')
      if(token){
          setLoading(true);
          api.defaults.headers.Authorization =  `Bearer ${JSON.parse(token)}`
          return true
      }else{
          setLoading(false)
          navigate('/login')
          return false
      }
    }

    async function getUser() {
      
          await checkAuth()
      
          try {
            const token = localStorage.getItem('token')
            if(token){
              const response = await api.get('/profile/', {  
                headers: {
                  'Authorization': `Bearer ${JSON.parse(token)}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json;version=v1_web'
                }
              });  
            setLoading(false);
            setFlashMessage('Seja Bem-vindo!', 'green')

            return response.data
        }} catch (error: any) {
            setLoading(false);
            setFlashMessage(error.response.data.detail, 'red')
        }

    }

   
    

    return { login, checkAuth, getUser, logout}

}