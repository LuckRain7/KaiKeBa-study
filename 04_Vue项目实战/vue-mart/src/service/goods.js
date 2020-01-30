import axios from 'axios'

export default {
    getGoodsInfo(){
        return axios.get('/api/goods')
    }
}