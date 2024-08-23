// 저장소임. 

function initState() {
    return {
        count: 0,
        recentMessage: "default message"
    }
}


const practice = {
    // state: 상태를 의미하는 객체로서 initState를 통해 상태 초기화
    state: initState,
    // mutations는 상태를 변경하기 위한 함수들의 집합이다.
    // mutation은 컴포넌트에서 직접 호출되기 보다는, actions를 통해 mutation이 호출된다.
    // 그 이유는 여러 mutation을 연속적으로 호출하는 등의 경우가 있을 수 있기 때문이다.
    mutations: {
        increment(state) {
            state.count++;
        },
        updateRecentMessage(state, message) {
            console.log("line 22");
            state.recentMessage = message;
        }

    },
    actions: {
        // 아래와 같이 actions의 함수를 통해 mutation의 함수를 호출한다.
        // 그러면 결국 컴포넌트는 actions의 함수를 호출
        incrementCount(context) { // 컨텍스트를 주입 받는다.
            context.commit('increment');
        },
        updateGlobalMessage(context, message) {
            console.log("line 34");
            context.commit('updateRecentMessage', message);
        }

    },
    // 상태(변수)를 get하기 위한 함수들의 집합
    getters: {
        getCount: state => state.count,
        getRecentMessage: state => state.recentMessage
    },

}

export default practice;