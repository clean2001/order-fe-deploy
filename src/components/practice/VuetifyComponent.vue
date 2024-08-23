<template>
    <v-app-bar app>
        네비게이션 바
    </v-app-bar>
    <!-- v-container, v-row, v-col 
     v-container는 하나의 박스이다.
     v-row:
     v-col:
     row안에 col이 들어가는 것이다. col의 너비를 지정하는 것이 매우 중요하다.
    -->
     <v-container>
        <v-row> <!-- cols의 전체 사이즈는 12이다. -->
            <v-col cols="4">
                hello world 1
            </v-col>
            <v-col cols="8">
                hello world 2
            </v-col>
        </v-row>
        <v-row>
            <v-card width="50%">
                <!-- v-card에는 card-title, card-text등이 있다. -->
                <v-card-title>
                    안내 문구
                </v-card-title>
                <v-card-text>
                    안녕하세요~
                </v-card-text>
            </v-card>
        </v-row>

        <v-row> <!-- table: 2가지가 있다. simple-table,  -->
            <v-simple-table>
                <thead>
                    <tr>
                       <th>이름</th> 
                       <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>hong1</td>
                        <td>hong2</td>
                    </tr>
                    <tr>
                        <td>hong1@naver.com</td>
                        <td>hong2@naver.com</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
        <v-row>
            
        </v-row>

     </v-container>
     <v-card>
        <v-card-title>회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="email" type="email"></v-text-field>
                <v-text-field label="name" type="text"></v-text-field>
                <v-text-field label="password" type="password"></v-text-field>
                
                <v-btn>제출</v-btn>
            </v-form>
        </v-card-text>
    </v-card><br>
    <v-btn @click.stop="cancel()">
        취소버튼
    </v-btn>

    <!-- 모달창을 위한 v-dialog -->
     <!-- v-model의 dialog를 true로 해야 모달창이 보인다. -->
     <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title>정말 취소하시겠습니까?</v-card-title>
            <v-card-actions>
                <v-btn color="sid_btn" @click="dialog=false">확인</v-btn>
                <v-btn color="sid_btn" @click="dialog=false">취소</v-btn>
            </v-card-actions>
        </v-card>

     </v-dialog>
    
     <!-- 1번 방법 href: 실시간으로 데이터가 변경되고 있는 경우 이 방법을 쓰자. -->
      <!-- html 상에서 이동. 템플릿 안에서 이동 -->
     <v-btn href="/practice/modeling">라우팅 1</v-btn>  
     <v-btn :to="{path: '/practice/modeling'}">SPA 라우팅(router 기능 활용)</v-btn>
     <v-btn :to="{name: 'ModelingComponent' /* 라우터의 이름으로 라우팅 */}">SPA 라우팅(router 기능 활용)</v-btn>
</template>

<script>
export default {
    // 변수 설정은 data() 함수를 전역적으로 쓰이는 통해 할 수 있다.
    data() {
        return {
            dialog:false, // 초기값은 false로 깔아놓는다
        }

    },
    methods: {
        cancel() {
            this.dialog = true;
        },

    }
}
</script>