// 저장소임. 

function initState() {
    return {
        // 꺼내올 때는 parse, 넣은 때는 stringify
        // 로컬스토리지에서 역직렬화해서 데이터 추출
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [], // 장바구니에 담겨있는 상품 목록
        totalQuantity: localStorage.getItem('totalQuantity') || 0,
    }
}


const practice = {
    // state: 상태를 의미하는 객체로서 initState를 통해 상태 초기화
    state: initState,
    // mutations는 상태를 변경하기 위한 함수들의 집합이다.
    // mutation은 컴포넌트에서 직접 호출되기 보다는, actions를 통해 mutation이 호출된다.
    // 그 이유는 여러 mutation을 연속적으로 호출하는 등의 경우가 있을 수 있기 때문이다.
    mutations: {
        addCart(state, product) {
            const existProduct = state.productsInCart.find(p => p.id === product.id);

            if(existProduct) {
                existProduct.quantity += product.quantity;
            } else {
                state.productsInCart.push(product);
            }

            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity;

            // 로컬 스토리지에 데이터 직렬화하여 삽입
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart)); // 기존에 뭐가 있든지, 갈아끼우기
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        },
        clearCart(state) {
            state.productsInCart = [];
            state.totalQuantity = 0;

            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalQuantity');
        }
    },
    actions: {
        // 아래와 같이 actions의 함수를 통해 mutation의 함수를 호출한다.
        // 그러면 결국 컴포넌트는 actions의 함수를 호출
        addCart(context, product) { // 컨텍스트를 주입 받는다.
            context.commit('addCart', product);
        },
        clearCart(context) {
            context.commit('clearCart');
        }
    },
    // 상태(변수)를 get하기 위한 함수들의 집합
    getters: {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    },

}

export default practice;