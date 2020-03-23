import axios from 'axios'

function getGoods() {
    return axios.get('/api/goods')
}


export default {
    // model的命名空间，区分多个model
    namespace: 'goods',
    // 初始状态
    // state: [{ title: 'javascript' }, { title: 'Golang' }],
    state: [],
    // 异步操作
    effects: {
        *getList(actions, { call, put }) {
            const res = yield call(getGoods)
            yield put({ type: 'initGoods', payload: res.data.result })
        }
    },
    // 更新状态
    reducers: {
        addGood(state, action) {
            return [...state, { title: action.title }]
        },
        initGoods(state, action) {
            return action.payload
        }

    },
};
