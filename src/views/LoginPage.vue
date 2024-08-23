<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="8">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        로그인
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <!-- <v-text-field color="sid_btn1" prepend-icon="mdi-account" label="이름" v-model="name" required></v-text-field> -->
                            <v-text-field color="sid_btn1" type="email" prepend-icon="mdi-email" label="이메일" v-model="email" required></v-text-field>
                            <v-text-field color="sid_btn1" type="password" prepend-icon="mdi-lock" label="패스워드" v-model="password" required></v-text-field>
                            <v-row>
                                <!-- block은 부모 컨테이너 너비만큼 꽉 채워진다. -->
                                <v-col><v-btn block color="sid_btn2"  @click="showPasswordModal" >비밀번호 변경</v-btn></v-col>
                                <v-col><v-btn block type="submit" color="sid_btn1">로그인</v-btn></v-col>
                                
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
        <!-- 모달창 -->
         <!-- resetPassword 변수가 true여야 보인다. -->
         <!-- @update:dialog는 modal 컴포넌트가 update:dialog라는 이벤트를 발생 시킬때 실행될 이벤트 핸들러를 정의한다 -->
          <!-- $event는 자식 요소로부터 전달된 값을 의미한다. (true, false가 전달됨) -->
          <!-- 닫기 버튼을 누르면 false로 전달됨. 재설정을 누르면 true로 전달됨 -->
         <ResetPasswordModal
         v-model="resetPassword"
         @update:dialog="resetPassword = $event"
         />
    </v-container>

</template>
<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ResetPasswordModal from '@/views/ResetPasswordModal.vue';

export default{
    data(){
        return {
            // try, catch 묶어서 login 성공시 console.log로 출력
            email: "",
            password: "",
            resetPassword: false
        }
    },
    methods: {
        async doLogin() {
            try {
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`, loginData);
                
                // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰 값 저장
                const token = response.data.result.token;
                const refreshToken = response.data.result.refreshToken;
                const role = jwtDecode(token).role;

                console.log(jwtDecode(token));
                console.log(role);
                
                // 로컬 스토리지에 저장해주기!
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('role', role);

                // sse 연결 코드 => 이 로그인 시점에 있으면 안됨!! 왜냐면 로그인 액션을 취하는 시점에서만 유효해짐


                // this.$router.push("/"); // <- 이렇게 하면 헤더부는 created 호출이 안됨
                window.location.href = '/';
            } catch(e) {
                console.log(e.response.data.errorMessage);
            }

        },
        showPasswordModal() {
            console.log("!!!!!!!!!!!!!!!");
            this.resetPassword = true;
        }
    
    },
    components: {
        ResetPasswordModal
    }
};
</script>