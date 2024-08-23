<template>
    <v-app-bar app dark>
        <v-container align-center background-color="sid_green">
            <v-row>
                <v-col class="d-flex justify-start"> <!--d-flex justify-start: 전체를 좌측 정렬-->
                    <div v-if="userRole == 'ADMIN'">
                        <v-btn :to="{path:'/member/list'}">회원 관리</v-btn>
                        <v-btn :to="{path:'/product/manage'}">상품 관리</v-btn>
                        <v-btn href="/order/list">실시간 주문({{ liveQuantity }})</v-btn>
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="{path:'/'}" color="sid_btn2">java shop</v-btn>
                </v-col>
                <v-col class="d-flex justify-end"> <!--d-flex justify-start: 전체를 우측 정렬-->
                    <v-btn v-if="isLogin" :to="{path:'/order/cart'}">장바구니({{ getTotalQuantity }})</v-btn>
                    <v-btn :to="{path:'/product/list'}">상품 목록</v-btn>
                    <v-btn v-if="isLogin" :to="{path:'/mypage'}">마이페이지</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원 가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
                    <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>

    </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'
// 서버와 실시간 알림 서비스를 위한 의존성 추가 필요
import { EventSourcePolyfill } from 'event-source-polyfill';

export default{
    data() {
        return {
            userRole: null,
            isLogin: false,
            liveQuantity: 0
        }
    },
    created() {
        const token = localStorage.getItem("token");
        if(token) {
            this.isLogin = true;
            this.userRole = localStorage.getItem("role");
            console.log('role' + this.userRole);
        }

        // axios 요청이 아니라서 토큰을 따로 세팅해 주어야 한다.
        if(this.userRole === 'ADMIN') {
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`, {headers: {Authorization: `Bearer ${token}`}});
            sse.addEventListener('connect', (event) => {
                console.log(event);
            }); // connect라는 이름의 이벤트가 들어오면

            // 주문 발생 이벤트
            sse.addEventListener('ordered', (event) => {
                console.log(event);
                console.log(event.data);
                this.liveQuantity++;
            }); // ordered라는 이름의 이벤트가 들어오면

            sse.onerror = (error) => {
                console.log(error);
                sse.close();
            }
        }
    },
    computed: {
        ...mapGetters(['getTotalQuantity'])
    },
    methods: {
        doLogout() {
            localStorage.clear();
            window.location.href = '/';
        }
    }
};
</script>