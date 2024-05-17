import bus from '../utils/bus'

export default function useFlashMessage(){
    function setFlashMessage(msg: string, colorMsg: string){
        bus.emit('flash', {
            message: msg,
            color: colorMsg
        })
    }
    return { setFlashMessage }
}

