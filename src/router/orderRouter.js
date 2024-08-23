import OrderList from '@/views/OrderList.vue'
import OrderCart from '@/views/OrderCart.vue'

export const orderRouter = [
    {
        path: '/order/list',
        name: 'OrderList',
        component: OrderList
    },
    {
        path: '/order/cart',
        name: 'OrderCart',
        component: OrderCart
    },
]