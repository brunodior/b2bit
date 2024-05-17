import { useContext, useEffect, useState } from "react"
import { Context } from "../context/UserContext";

export function Profile(){
    type User = {
        name: string ;
        last_name: string;
        email: string;
        avatar: any;
    };
    
    const [user, setUser] = useState<User | null>(null);
    const context = useContext(Context);
   
    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
    }

    const { getUser, logout } = context;

    useEffect(() => {
        getUser().then((response: any) => {
            setUser(response)
        }).catch((error: any) => {
            console.log(error)
        })
    }, [])


    return (
        
        <section className=" h-screen bg-[#F1F5F9]">
            
           
            <div className="py-3.5 px-4 md:px-8 bg-white w-full flex justify-end fixed top-0 left-0 right-0">
                        <button onClick={() => logout()}  className="bg-primary text-white font-semibold rounded-lg py-3 px-20 rounded-[9px]">Logout</button>
            </div>
            <div className='flex items-center justify-center w-full h-full'>
                    
                    <form className="p-8 bg-white rounded-[18px] shadow-lg p-8">
                        <div className="w-full flex items-center flex-col mb-7">
                            <h4  className=" text-primary text-xs mb-2 font-semibold">Profile picture</h4>
                            <img className="w-[56px] h-[56px] object-cover rounded-[8px]" src={user?.avatar.image_medium_url ? (user.avatar.image_medium_url ) : 'https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'} alt="image" />
                        </div>
                        <div className="flex flex-col mb-5">
                            <h4  className=" text-primary text-sm mb-2">Your <span className="font-bold">Name</span></h4>
                            <input type="text" name="name" id="name" readOnly disabled value={user?.name ? user.name : '' + ' ' + (user?.last_name ? user.last_name : ' ')}  className="bg-gray-100 p-4 rounded-lg text-xs w-[274px] md:w-72" placeholder="Digite o e-mail" />
                        </div>
                        <div className="flex flex-col">
                            <h4  className=" text-primary text-sm mb-2">Your <span className="font-bold">E-mail</span></h4>
                            <input type="text" name="email" id="email" readOnly disabled value={user?.email ? user.email : '' } className="bg-gray-100 p-4 rounded-lg text-xs w-[274px] md:w-72" placeholder="Digite o e-mail" />
                        </div>                   
                    </form>
            </div>           
        </section>
    )
}