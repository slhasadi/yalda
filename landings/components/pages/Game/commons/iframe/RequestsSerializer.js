
import Requests from './Requests'

class RequestsSerializer {
    constructor(name, rawdata, callback, request, requestData){

        this.state = {
            name,
            callback,
            rawdata,
            request,
            requestData,
            timerId: null

        }
    }
  
    getRawData(){
        return this.state.rawdata
    }
    start(fromSerializer){
        const {callback, name} = this.state
        const obj = this.storageGet(this.storageKeys(name))
        if(!obj) return;

        if(!fromSerializer)
        callback(obj)

        const timerId = setTimeout(this.retry.bind(this), 3000)
        this.state.timerId = timerId
    }
    updateStorage(){
        const {name, rawdata} = this.state
        this.storageSet(this.storageKeys(name), rawdata)
    
    }
    retry(){
        const {request, requestData} = this.state
   
        Requests[request]({...requestData})
        
    }
    storageGet = (key) => {

        let obj = window.localStorage ? window.localStorage.getItem(key) : null
        try {
            obj = JSON.parse(obj)
        } catch(e){
            obj = window.localStorage.getItem(key)
        }
        return obj
       
    }
    storageSet = (key, value) => {
     
        window.localStorage.setItem(key, JSON.stringify(value))
      
    }
    storageKeys = (name) => {
        return 'thirdparty_baazigooshi_' + name 
    }
}

export default RequestsSerializer