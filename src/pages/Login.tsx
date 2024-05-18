import logo from '../assets/logob2bit.png'
import { useFormik } from 'formik';
import  useMyContext  from '../context/UserContext';



export function Login(){

    const {login} = useMyContext();

  

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validate: (values) => {
          const errors = {email: '', password: ''};
          if (!values.email) {
            errors.email = 'O e-mail é obrigátorio!'; 
            return errors; 
          }
          if (!values.password) {
            errors.password = 'A senha é obrigatória!'; 
            return errors; 
          }
          
        },
        onSubmit: async(values) => {   
          login(values)
        }
      });
      


    return (
        <section className="flex items-center justify-center h-screen bg-light">
            <div className='bg-white rounded-[20px] shadow-2xl'>
                    <div className=' p-12 md:p-14'>
                            <img src={logo} alt="logo" className='h-20 md:h-24' />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="px-6 pb-10 ">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="email" className="font-bold text-primary text-lg mb-2">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className={`bg-gray-100 p-4 rounded-lg ${formik.errors.email ? `border border-red-500` : ''}`} 
                                placeholder="Digite o e-mail"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                />
                                {formik.errors.email ? 
                                    <div className='mt-2 w-full text-red-500 font-bold'>{formik.errors.email}</div> 
                                    : null
                                }
                        </div>
                        <div className="flex flex-col mb-8">
                            <label htmlFor="password" className="font-bold text-primary text-lg mb-2">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className={`bg-gray-100 p-4 rounded-lg ${formik.errors.password ? `border border-red-500` : ''}`} 
                                placeholder="Digite a senha" 
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                />
                                {formik.errors.password ? 
                                    <div className='mt-2 w-full text-red-500 font-bold'>{formik.errors.password}</div> 
                                    : null
                                }
                        </div>
                           
                        <button type='submit' className="bg-primary text-white font-semibold rounded-lg w-full text-lg p-3.5 rounded-[9px]">Sign in</button>
                        
                    </form>
            </div>           
        </section>
    )
}