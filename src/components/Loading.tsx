import { useState, useEffect } from "react";
import bus  from '../utils/bus'
import logo from '../assets/logob2bit.png'
import { ClipLoader } from 'react-spinners';

function Loading(){
    const [visibility, setVisibility] = useState(false)


    useEffect(()=> {
        bus.addListener('loading', ({visibility}: any) =>{
            setVisibility(visibility)
        })
    }, [])

    return (

        visibility ? (
               <div className="h-full w-full absolute bg-white flex items-center justify-center bg-opacity-25">
                <div className="flex relative items-center justify-center">
                    <img src={logo} className="w-12 absolute" alt="" />
                    <ClipLoader size={90} color={"#02274F"} loading={true} />

                </div>
                    
               </div>
        ) : (
            <></>
        )
    )
}

export default Loading