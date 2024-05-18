import  useMyContext  from '../context/UserContext';

export function NavBar(){

    const context = useMyContext();
   
    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
    }

    const {logout } = context;
    return (
            <div className="py-3.5 px-4 md:px-8 bg-white w-full flex justify-end fixed top-0 left-0 right-0">
                        <button onClick={() => logout()}  className="bg-primary text-white font-semibold rounded-lg py-3 px-20 rounded-[9px]">Logout</button>
            </div>
    )
}