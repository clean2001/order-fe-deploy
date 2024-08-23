<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        회원가입
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="memberCreate">
                            <v-text-field color="sid_btn1" prepend-icon="mdi-account" label="이름" v-model="name" required></v-text-field>
                            <v-text-field color="sid_btn1" type="email" prepend-icon="mdi-email" label="email" v-model="email" required></v-text-field>
                            <v-text-field color="sid_btn1" type="password" prepend-icon="mdi-lock" label="패스워드" v-model="password" required></v-text-field>
                            <v-text-field color="sid_btn1" prepend-icon="mdi-city" label="도시" v-model="city"></v-text-field>
                            <v-text-field color="sid_btn1" prepend-icon="mdi-home" label="상세주소" v-model="street"></v-text-field>
                            <v-text-field color="sid_btn1" prepend-icon="mdi-mailbox" label="우편번호" v-model="zipcode"></v-text-field>
                            <v-row>
                                <v-col>
                                    <!-- block은 부모 컨테이너 너비만큼 꽉 채워진다. -->
                                    <v-btn block type="submit" color="sid_btn1">회원가입</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>
<script>
import axios from 'axios';

export default{
    data(){
        return {
            name: "",
            email: "",
            password: "",
            city: "",
            street: "",
            zipcode: ""
        }
    },
    methods: {
        // axios의 기본 동작은 비동기 방식이다.
        // 그래서 async await 붙이는 것임
        async memberCreate() {
            try {
                const registerData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    address: {
                        city: this.city,
                        street: this.street,
                        zipcode: this.zipcode
                    }
 
                }
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData)
                this.$router.push("/");    
            } catch(e) {
                console.log(e);
                alert(e.response.data.errorMessage);
                console.log(e.response.data.errorMessage);
            }
        }
    }
};
</script>