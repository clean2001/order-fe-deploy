<template>
    <h1>화면 라우팅 테스트</h1>
    <v-container>
        <v-row>
            <v-btn color="sid_green" @click="spaMove1">modeling 페이지로 이동(url)</v-btn>
        </v-row>
        <v-row>
            <v-btn color="sid_green" @click="spaMove2">modeling 페이지로 이동(name)</v-btn>
        </v-row>
        <v-row>
            <v-btn color="sid_green" @click="hrefMove">modeling 페이지로 이동(href)</v-btn>
        </v-row>
        <v-row>
            <v-btn color="sid_green" @click="reloadPage">현재 화면 reload</v-btn>
        </v-row>
    </v-container>

</template>


<script>
export default {
    data() {
        return {

        }
    },
    beforeUnmount() { // ⭐️ 서버와의 연결을 끊어주어야하는 시점
        alert("unmount!!!!");
        console.log("unmount!");
    },
    methods: {
        // router를 통한 spa 방식은 created 함수가 실행되지 않음!
        spaMove1() {
            this.$router.push("/practice/modeling");
        },
        spaMove2() {
            this.$router.push({name:"ModelingComponent"});

        },
        hrefMove() {
            window.location.href='/practice/modeling';
        },
        reloadPage() {
            window.location.reload();
        }

    }
}
</script>