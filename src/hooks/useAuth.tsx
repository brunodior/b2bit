import {useNavigate } from 'react-router-dom'
import useLoading from './useLoading'
import useFlashMessage from './useFlashMessage'
import { doLogin, getProfile, api } from '../api/authService'
export default function useAuth(){

    const {setFlashMessage} = useFlashMessage()
    const {setLoading} = useLoading()
    const navigate = useNavigate()


    async function login(user?: any){
        setLoading(true);
          try {
            await doLogin(user).then(async(response) => {
               authUser(response)
            })
          } catch (error: any) {
            setLoading(false);
            setFlashMessage(error.response.data.detail, 'red')
        }
    }

    async function getUser() {
      
      await checkAuth()

      try {
          const token = localStorage.getItem('token')
          if(token){
            const response = await getProfile(token)
            setLoading(false);
            setFlashMessage('Seja Bem-vindo!', 'green')
            return response 
          }
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
   
    function authUser(response: any){


        localStorage.setItem('token', JSON.stringify(response.data.tokens.access))
        navigate('/profile')
        
    }

    function checkAuth(){
      const token = localStorage.getItem('token')
      if(token){
          setLoading(true);
          api.defaults.headers.Authorization =  `Bearer ${JSON.parse(token)}`
          return true
      }else{
          setLoading(false)
          navigate('/')
          return false
      }
    }


    return { login, checkAuth, getUser, logout}

}