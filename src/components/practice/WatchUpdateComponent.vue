<template>
    <h2>watch 예제</h2>
    <div>count: {{count}}</div>
    <button @click.stop="incrementCount">increment count</button>

    <h2>Update 예제</h2>
    <div>message: {{message}}</div>
    <button @click.stop="updateMessage">update message</button>
</template>


<script>
export default {
    data() {
        return {
            count: 0,
            message: "hello java"
        }
    },
    watch: { // 특정 변수 값의 변경 사항을 인지하는 hook 함수이다.
        // 인지하고자 하는 변수값과 일치되는 함수명
        count() { // count만을 바라보고 있음
            alert("count값 변경");
        }
    },
    updated() { // dom 객체(화면)의 변경 사항을 인지하는 hook 함수이다.
        // 변경의 범위가 watch 보다 더 넓음
        alert("DOM 요소 변경");
    },
    methods: {
        incrementCount() {
            this.count++;
        },
        updateMessage() {
            this.message = "hello python";
        }

    }
}
</script>