<template>
<v-container>
    <!-- row 1 start -->
    <v-row class="d-flex justify-content-between mt-5">
        <v-col> <!-- 검색 -->
            <v-form @submit.prevent="searchProducts">
                <v-row>
                    <v-col cols="auto">
                        <v-select
                        v-model="searchType"
                        :items="searchOptions"
                        item-title="text"
                        item-value="value"
                        >

                        </v-select>
                    </v-col>
                    <v-col>
                        <v-text-field
                        v-model="searchValue" label="Search"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn type="submit">검색</v-btn>
                    </v-col>
                </v-row>

            </v-form>
        </v-col>
        <v-col cols="auto" v-if="!isAdmin"> <!-- 장바구니, 주문하기 -->
            <v-btn @click="addCart" color="sid_green" class="mr-2">장바구니</v-btn>
            <v-btn @click="createOrder" color="sid_btn1">주문하기</v-btn>
        </v-col>
        <v-col cols="auto" v-if="isAdmin">
            <v-btn href="/product/create" color="sid_btn1">상품 등록</v-btn>
        </v-col>
    </v-row>
    <!-- row 1 end -->

    <!-- row 2 start -->
    <v-row>
        <v-col>
            <v-card>
                <v-card-title class="text-h6 text-center">{{ pageTitle }}</v-card-title>
                <v-card-text>
                    <v-data-table>
                        <thead>
                            <tr>
                                <th>상품 아이디</th>
                                <!-- <th>인덱스</th> -->
                                <th>제품 사진</th>
                                <th>제품 명</th>
                                <th>가격</th>
                                <th>재고 수량</th>
                                <th v-if="!isAdmin">주문 수량</th>
                                <th v-if="!isAdmin" class="text-center">주문 선택</th>
                                <th v-if="isAdmin">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in productList" :key="p.id">
                                <td>{{p.id}}</td>
                                <!-- <td>{{ index }}</td> -->
                                <td><img :src="p.imagePath" style="height:100px; width:auto"></td>
                                <td>{{p.name}}</td>
                                <td>{{p.price}}</td>
                                <td>{{p.stockQuantity}}</td>
                                <td v-if="!isAdmin" class="text-center">
                                    <v-text-field
                                    v-model.number="p.quantity"
                                    type="number"
                                    style="width: 60px;"
                                    density=compact
                                    >

                                    </v-text-field>
                                </td>
                                <td v-if="!isAdmin" class="text-center">
                                    <input type="checkbox" v-model="selected[p.id]" />
                                </td>
                                <td v-if="isAdmin">
                                    <v-btn color="sid_green" @click="deleteProduct(p.id)">삭제</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <!-- row 2 end -->
</v-container>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    props: ['isAdmin', 'pageTitle'],
    data() {
        return {
            searchType: 'optional',
            searchOptions: [
                {text: '선택', value: 'optional'},
                {text: '상품명', value: 'name'},
                {text: '카테고리', value: 'category'},
            ],
            productList: [],
            pageSize: 5,
            currentPage: 0,
            isLastPage: false,
            isLoading: false,
            // selected 예시:
            /*
            1: true => 1번 상품 선택 O
            2: false => 2번 상품 선택 X
            3: false => 3번 상품 선택 X
            4: true => 4번 상품 선택 O
            {1: true, 2: false, 3:false, 4:true} => 이런식으로 담기게 된다!
            */
            selected: {}, 
        }
    },
    methods: {
        deleteProduct(productId) {
            console.log(productId);
        },
        searchProducts() {
            console.log(this.searchType);
            console.log(this.searchValue);

            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;

            this.loadProduct(); // loadProduct 호출
        },
        addCart() {
            const orderProducts = Object.keys(this.selected)
                .filter(key => this.selected[key]).map(key=>{
                    const product = this.productList.find(p => p.id == key)

                    // 키:밸류를 전역 변수를 받는 화면에 맞춰주어야한다.
                    return { id: product.id, name: product.name, quantity: product.quantity };
                }); // 객체에서 키값만 뽑아냄
            
                orderProducts.forEach(p => this.$store.dispatch('addCart', p));
                console.log(this.getProductsInCart);
                window.location.reload(); // 잠깐 주석처리!!!!
        },
        async loadProduct() {
            try {
                // Pageable 객체에 맞게 파라미터 형식으로 데이터를 전송해주어야 한다.
                // 방법 1. axios에서는 {params: {page:10, size: 2}}와 같은 형식으로 전송 시, 파라미터 형식으로 변환되어 서버로 전송된다.
                // 방법 2. FormData 객체 생성하여 서버로 데이터 전송
                if(this.isLoading || this.isLastPage) return;

                console.log("서치 타입: " + this.searchType);
                console.log("검색 값: " + this.searchValue);

                this.isLoading = true;
                let params = {
                    page: this.currentPage,
                    size: this.pageSize,
                }

                // params = {size:5, page:0, category:"fruits"}
                // 또는 params = {size:5, page:0, name:"apple"}
                if(this.searchType === 'name') {
                    console.log("line 136");
                    params.searchName = this.searchValue; // name이라는 키값을 추가하는 것이다.
                } else if(this.searchType === 'category') {
                    console.log("line 139");
                    params.category = this.searchValue; // category라는 키값을 추가하는 것이다.
                }


                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, { params });
                // 서버에서 주지 않은 데이터를 추가한 것이다.
                const additionalData = response.data.result.content.map(p => ({...p, quantity: 0}));
                console.log(params);
                // if(additionalData.length == 0) {
                    
                //     // return;
                // }
                this.productList = [...this.productList, ...additionalData]; // 0번 페이지 + 1번 페이지 + ...
                this.isLastPage = response.data.result.last; // 라스트 여부
                if(this.isLastPage) {
                    this.isLastPage = true;
                }
                this.currentPage++; // ⭐️ 로드가 끝나면 currentPage를 하나 늘려줘야 한다.

                this.isLoading = false; // 로딩 끝!
            } catch(e) {
                console.log(e);
            }
        },
        scrollPagination() {
            // "현재 화면 + 스크롤로 이동한 화면 > 전체화면 - n"의 조건이 성립되면 추가 데이터 로드
            // 빼는 숫자 n: 작을 수록 많이 내려와야하고, 클수록 적게 내려와야함. 남겨두는 거리를 의미한다.
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

            if(isBottom && !this.isLastPage && !this.isLoading) {
                console.log('데이터를 불러옵니다.');
                this.loadProduct();
            }
        },
        async createOrder() {
            const orderProducts = Object.keys(this.selected)
            .filter(key => this.selected[key]).map(key=>{
                const product = this.productList.find(p => p.id == key)

                return { productId: product.id, quantity: product.quantity };
            }); // 객체에서 키값만 뽑아냄

            // 체크
            console.log(orderProducts);
            if(orderProducts.length < 1) {
                alert("주문 대상 물건이 없습니다.");
                return;
            }

            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`); // 확인을 누르면 true, 취소를 누르면 false가 들어간다.
            if(!yesOrNo) {
                console.log("주문 취소");
                return;
            }
            
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert("주문 완료!");
            } catch(e) {
                console.log(e);
                alert("주문 실패");
            }
            
        }
    },
    created() { // 훅 메서드
        this.loadProduct(); // this.loadProduct로 호출해주어야한다.
        window.addEventListener('scroll', this.scrollPagination); // 스크롤을 움직였을 때
    },
    computed: {
        ...mapGetters(['getProductsInCart'])
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollPagination); // 이벤트 리스너 제거
    }
}
</script>
