<template>
<v-container>
    <v-row>
        <h2>Conditional Components</h2>

    </v-row>
    <v-row>
        <div v-if="isLogined">환영합니다 고객님</div>
        <div v-else>로그인 해주세요</div>
    </v-row>
    <v-row>
        <v-col cols="1"><v-btn color="sid_green" @click="login">로그인</v-btn></v-col>
        <v-col><v-btn color="sid_btn1" @click="logout">로그아웃</v-btn></v-col>
    </v-row>
    <v-row>
        <h2>상품 목록 조회</h2>
    </v-row>
    <v-row>
        <ul>
            <!-- v-for에서는 반드시 key 값을 지정해주어야한다. key값을 지정함으로써 각 요소마다 고유 식별 -->
            <li v-for="product in products" :key="product.id">{{product.name}}</li>
        </ul>
    </v-row>

</v-container>

</template>

<script>
export default { // data()와 methods는 기본적으로 깔아준다.
    data() { // 뷰에서 정해준 메서드
        return {
            isLogined: false,
            products: [ // 나중에 서버를 붙이게 되면 axios로 받아와야하는 정보이다.
                {id:1, name:"apple"},
                {id:2, name:"banana"},
                {id:3, name:"strawberry"},
                {id:4, name:"grape"},
                {id:5, name:"melon"}
            ], 
        }
    },
    methods: {
        login() {
            this.isLogined = true;
        },
        logout() {
            this.isLogined = false;
        }
    }
}
</script>