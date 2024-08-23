<template>
    <v-row justify="center">
        <v-col cols="12" md="8" sm="10">
            <v-card-title class="text-center text-h5">
                주문 목록
            </v-card-title> 
            <v-card-text>
                <v-data-table
                :headers="tableHeaders"
                :items="orderList"
                class="elevation-1"
                show-expand
                >
                <!-- actions 자리를 커스텀하겠다는 뜻. item은 items의 item이다! -->
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn v-if="isAdmin && item.orderStatus === 'ORDERED'" color="red"
                    @click.stop="cancelOrder(item.id)"
                    size="small">CANCEL</v-btn>
                </template>
                <template v-slot:expanded-row="{ item }">
                    <v-row class="expand-row">
                        <v-col>
                            <v-list-item v-for="orderItem in item.orderDetailDtos" :key="orderItem.id">
                                <v-list-item-content>
                                    <v-list-item-title class="expand-title">
                                        <span>{{orderItem.productName}} {{ orderItem.count }}개 </span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </template>
                </v-data-table>
            </v-card-text>
        </v-col>
    </v-row>
</template>
<script>
import axios from 'axios';

export default {
    props: ['isAdmin'],
    components: {
        // OrderList
    },
    data() {
        return {
            orderList: [],
            tableHeaders: [
            {title: 'ID', key: 'id', align: 'start'}, // key와 response dto 변수를 맞춰주어야한다.
            {title: '회원 이메일', key:'memberEmail', align: 'center'},
            {title: '주문 상태', key: 'orderStatus', align: 'center'},
            {title: 'ACTION', key:'actions', align: 'center'}
        ],

        }
    },
    methods: {
        cancelOrder(orderId) {
            // 주문 취소 API 호출 및 화면 reload

            // // 검증. 이미 취소되었는지.
            // if(this.orderList[orderId-1].orderStatus == 'CANCELED') {
            //     alert("이미 취소된 주문입니다.");
            //     return;
            // }

            try{
                axios.patch(`${process.env.VUE_APP_API_BASE_URL}/order/${orderId}/cancel`);
                alert("주문 취소 되었습니다.");
                window.location.reload();
            } catch(e) {
                console.log(e.response?.errorMessage);
            }
        }

    },
    async created() {

        try{
            if(this.isAdmin) {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/list`);
            this.orderList = response.data.result.content;
        } else {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/myorders`);
            this.orderList = response.data.result.content;
        }
        console.log(this.orderList);
        } catch(e) {
            console.log(e);
        }

    }
}
</script>
<style>
.expand-row {
    text-align: center;
}

.expand-title {
    text-align: center;
    display: flex;
    justify-content: center;

}

</style>