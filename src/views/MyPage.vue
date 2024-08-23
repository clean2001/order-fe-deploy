<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8" sm="10">
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원 정보
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <tbody>
                                <tr v-for="element in memberInfoList" :key="element.key">
                                    <!-- key-value 형식으로 -->
                                    <td>{{element.key}}</td>
                                    <td>{{element.value}}</td>
                                </tr>
                            </tbody>
                        </v-table>

                    </v-card-text>
                    
                </v-card>

            </v-col>
        </v-row>
    </v-container>
    <OrderListComponent />
</template>
<script>
import axios from 'axios';
import OrderListComponent from '@/components/OrderListComponent.vue';

export default {
    components: {
        OrderListComponent
    },
    data() {
        return {
            memberInfo: {},
            memberInfoList: []
        }
    },
    methods: {

    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myinfo`);
        this.memberInfo = response.data.result;
        this.memberInfoList = [
            {key: "이름", value: this.memberInfo.name},
            {key: "email", value: this.memberInfo.email},
            {key: "도시", value: this.memberInfo.city}, // ⭐️ API의 response에 맞게 써줘야함. 나는 address로 감싸지 않았기 때문에 이렇게 씀
            {key:"상세주소", value: this.memberInfo.street},
            {key: "우편번호", value: this.memberInfo.zipcode}
        ]
    }
}
</script>