import { createStore } from 'vuex'
import practice from './practice'
import cart from './cart'

const store = createStore({
    modules: {
        practice,
        cart
    }
})

export default store;