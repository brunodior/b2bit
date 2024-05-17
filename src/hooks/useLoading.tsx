import bus from '../utils/bus'

export default function useLoading(){
    function setLoading(visibility: any){
        bus.emit('loading', {
            visibility: visibility,
        })
    }
    return { setLoading }
}

