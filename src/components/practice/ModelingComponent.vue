<template>
    <!-- html 요소의 동적 값 표시 -->
    <!-- html 요소 안에 중괄호 2번을 사용함으로써 script에 정의된 변수값을 화면에 표시한다. -->
    <h1>hello world {{language}}</h1>

    <!-- v-model은 양방향 데이터 바인딩을 하고 있다. -->
    <!-- :value 문법을 사용하면 단방향 데이터 바인딩이다. -->
    <v-text-field type="text" :value="value1"></v-text-field>
    <!-- 여기서 값을 변경하면, 아래 data에 있는 값까지 바꿀 수 있다. -->
    <v-text-field type="text" v-model="value2"></v-text-field> 

    <v-btn @click="showValue">변수 변경 사항 확인</v-btn>
    <br>
    <br>
    <v-container width="80%">
        <v-row>
            <v-col><span>단방향: </span><span>{{count1}}</span></v-col>
            <v-col><v-btn @click="increment1" color="sid_btn1">increment</v-btn></v-col>
            <v-col><v-btn @click="reset1" color="sid_btn2">reset</v-btn></v-col>
        </v-row>
        <v-row>
            
            <span>양방향: </span><v-col><v-text-field v-model="count2"></v-text-field></v-col>
            <v-col><v-btn @click="increment2" color="sid_btn1">increment</v-btn></v-col>
            <v-col><v-btn @click="reset2" color="sid_btn2">reset</v-btn></v-col>
            <input type="text" v-model="count1"/>
        </v-row>
        <v-row>
            <v-col><span>{{doubleCount}}</span></v-col> <!-- doubleCount는 함수이다. count가 변경될 때 변경됨 -->
        </v-row>
    </v-container>

</template>

<script>
export default { // data()와 methods는 기본적으로 깔아준다.
    data() { // 뷰에서 정해준 메서드
        return {
            language: "python",
            value1: "java",
            value2: "python",
            count1: 0,
            count2: 0,
            myArr: [],
            isLogin: false,
        }
    },
    created() {
        alert("created 함수 호출!!");
    },
    beforeMount() {
        alert("beforeMount 호출!!");
    },
    // computed는 종속된 반응형 데이터가 변경될 때에 함수를 다시 실행하여 값을 계산하는 함수이다.
    computed: {
        doubleCount() {
            return this.count2 * 2;
        }
    },
    methods: {
        showValue() {
            alert("value2: " + this.value2);
        },
        increment1() {
            this.count1++;
        },
        reset1() {
            this.count1 = 0;
        },
        increment2() {
            this.count2++;
        },
        reset2() {
            this.count2 = 0;
        },

    }
}
</script>