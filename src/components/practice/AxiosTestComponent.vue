<template>
    <v-container>
        <v-row>
            <v-col>
                <v-simple-table>
                    <thead>
                        <tr>
                           <th>이름</th> 
                           <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in memberList" :key="member.id">
                            <td>{{member.id}}</td>
                            <td>{{member.email}}</td>
                        </tr>
                        <tr>
                            <td>hong2</td>
                            <td>hong2@naver.com</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>

    </v-container>

</template>
<script>
import axios from 'axios';
    
export default {
    data() {
        return {
            member: null
        }
    },
    async created() {
        const response = await axios.get('localhost:8080/api/member/3')
        this.member = response.data.result;
    }
}
</script>