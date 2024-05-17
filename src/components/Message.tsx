import { useState, useEffect } from "react";
import bus  from '../utils/bus'

function Message(){
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')

    useEffect(()=> {
        bus.addListener('flash', ({message, color}) =>{
            setVisibility(true)
            setMessage(message)
            console.log(color)
            setColor(`bg-${color}-500`)
            setTimeout(() =>{
                setVisibility(false)
            }, 3000)
        })
    }, [])

    return (
        visibility ? (
                <div style={{zIndex: '1000'}} className={`rounded-xl shadow-lg absolute w-3/6 text-center mt-3 font-bold absolute translate-x-1/2 p-3 text-white border  ${color}`}>
                   {message}
                </div>
        ) : (
            <></>
        )
    )
}

export default Message