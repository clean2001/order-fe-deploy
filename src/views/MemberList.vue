<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원 목록
                    </v-card-title>
                    <v-card-text>
                        <!-- 페이지네이션 까지 다 해주는 테이블! -->
                        <v-data-table
                        :headers="tableHeaders"
                        :items="memberList"
                        > 
                            
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>
    </v-container>


</template>
<script>
import axios from 'axios';

export default{
    data() {
        return {
            tableHeaders: [{title: 'ID', key: 'id', align: 'start'},
            {title: '이름', key: 'name', align: 'center'},
            {title: '이메일', key:'email', align: 'center'},
            {title: '주문 수량', key:'orderCount', align: 'center'}],
            memberList: [],
        }
    }, 
    async created() {
        // const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 꺼내오기
        /**
         * 토큰을 세팅하는 룰
         * { headers: { Authorization: 'Bearer 토큰값' }, { Content-type: application/json }, ...  }
         **/
        // const headers = {
        //     Authorization: `Bearer ${token}`
        // }

        /**
         * {headers}  == {headers: headers} => 같은 문법이다.
         **/
        try { // 화면 깜빡임을 잡기 위함
            console.log("line 51 token: " + localStorage.getItem('token'));
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`);
            console.log(response);
            this.memberList = response.data.result.content;
        } catch(e) {
            console.log(e);
        }


    }

}
</script>

<style>
.text-center {
    text-align: center;
}
</style>