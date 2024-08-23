<template>
    <v-dialog max_width="500px">
        <v-card>
            <v-card-title class="text-h5 text-center">
                비밀번호 변경하기
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="resetPassword">
                    <v-text-field color="sid_btn1" type="email" prepend-icon="mdi-email" label="이메일" v-model="email" required></v-text-field>
                    <v-text-field color="sid_btn1" type="password" prepend-icon="mdi-lock" label="기존 비밀번호" v-model="asIsPassword" required></v-text-field>
                    <v-text-field color="sid_btn1" type="password" prepend-icon="mdi-lock" label="신규 비밀번호" v-model="toBePassword" required></v-text-field>
                    <v-row>
                        <!-- block은 부모 컨테이너 너비만큼 꽉 채워진다. -->
                        <v-col><v-btn @click.prevent="resetPassword" block type="submit" color="sid_btn2">비밀번호 변경</v-btn></v-col>
                        <v-col><v-btn @click="closeModal" block color="sid_btn1">화면 닫기</v-btn></v-col>
                        
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>
<script>
import axios from 'axios';

export default{
    data() {
        return {
            email: "",
            asIsPassword: "",
            toBePassword: ""
        }

    },
    methods: {
        async resetPassword() {
            // member/reset-password => server api와 화면 만들기
            const body = {
                email: this.email,
                asIsPassword: this.asIsPassword,
                toBePassword : this.toBePassword
            }
            try {
                await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/member/reset-password`, body);


                alert("정상 변경 되었습니다.");
            } catch(e) {
                console.log("line 48!!");
                console.log(e);
                // alert("입력값 확인 ㄱㄱ");
                alert(e.response?.data?.errorMessage || "입력 값을 확인해주세요.");
            }
        
        },
        closeModal() {
            // this.emit은 vue에서 컴포넌트 간의 이벤트를 전달하는 매커니즘이다.
            // 자식 컴포넌트에서 this.$emit을 호출하면 update:dialog라는 이벤트가 실행되고, false가 부모 컴포넌트로 전달된다.
            this.$emit('update:dialog', false);
        }
    },

}
</script>