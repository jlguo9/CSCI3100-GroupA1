import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) =>{
    axios.defaults.baseURL = ''
    Vue.prototype.$http = axios
}

export default MyHttpServer
