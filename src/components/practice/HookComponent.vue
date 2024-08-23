<template>
    <h2>생명 주기 함수(Hook)</h2>
    <p>{{data1}}</p>
    <p>{{data2}}</p>
    <p>{{data3}}</p> <!-- 변경된 데이터3로 표시된다.  -->

</template>


<script>
export default {
    data() {
        return {
            data1: "변경될 데이터1",
            data2: "변경될 데이터2",
            data3: "변경될 데이터3"
        }
    },
    // 화면이 열리기 전(vue 인스턴스가 생성되기 이전)에 실행되는 함수
    created() {
        this.data2 = "변경된 데이터2"; // 화면이 생기기 전에 필요한 데이터들을 axios로 받아올 때 created를 많이 사용한다.
    },
    beforeMount() {
        window.addEventListener('resize', this.resize); // 'resize'는 약속된 함수이다. 
        // 이런 resize는 일반적으로 화면이 다 그려지기 이전에 이벤트리스너를 추가한다.
    },
    // 컴포넌트가 화면에서 제거될 때 아래 함수 실행. beforeDestroy로 사용하기도 함.
    // 화면을 떠날 때 연결을 끊어줘야하는 상황들 예시. 웹 소켓, sse 연결 등 서버와의 연결을 끊어주고 나가야하는 시점
    beforeUnmount() { // ⭐️ 서버와의 연결을 끊어주어야하는 시점
        alert("unmount!!!!");
        console.log("unmount!");
        window.removeEventListener('resize', this.resize);
    },
    methods: {
        resize() {
            alert('화면의 배율이 변경되고 있습니다.');
        }

    },
    // vue 컴포넌트들이 DOM에 마운트된 이후(화면이 모두 그려진 이후)에 실행되는 함수
    // == 화면이 모두 그려진 이후
    mounted() {
        console.log("화면이 변경된 이후");
        this.data3 = "변경된 데이터3";
        
    }
}
</script>