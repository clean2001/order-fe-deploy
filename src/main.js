// main.js는 vue 애플리케이션의 시작점이다.
// 수정하고 저장하면 알아서 빌드돼있다. 부분 빌드하기 때문에 속도가 빠르다.

import { createApp } from 'vue'
import App from './App.vue'
// src/router/index.js 파일의 router를 사용하겠다는 선언
import router from '@/router/index.js' 
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'  // ⭐️
import axios from 'axios';

import store from './store/index.js' // ⭐️ 전역 상태 관리: 폴더 자체를 임포트

// App.vue 파일을 빌드해서 웹 브라우저에 올려놓겠다는 의미이다.
// createApp(App).mount('#app')
const app = createApp(App);

// axios 요청 인터셉터를 설정하여 모든 요청에 액세스 토큰을 포함
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        
        // 리프레시 토큰이 아닐때만 값 세팅
        console.log(config.url);
        if(token && !config.url.includes("refresh-token")) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            config.headers['Authorization'] = "";
        }

        if(config.url.includes("refresh-token")) {
            console.log("재발급 요청");
        }


        return config;
    },
    error => {
        // 해당 인터셉터가 무시되고, 사용자의 본래 요청인 화면으로 라우팅된다. (가던 길 가는 것)
        return Promise.reject(error);
    }
)

// 리프레시 토큰으로 액세스 토큰을 재발급 받는 로직
// 401 응답을 받을 경우에 interceptor를 통해 전역적으로 rt를 통한 at 재발급
// 만약 rt도 401 응답을 받은 경우, token 제거 후 Login 화면으로 리다이렉트
axios.interceptors.response.use(
    response => response,
    async error => {

        // console.log("line 49!!");
        // console.log(error);

        if(error.response && error.response.status === 401) {

            const refreshToken = localStorage.getItem('refreshToken');
            try {
                // 리프레시 토큰이 만료되면 여기서 에러가 터진다.

                localStorage.removeItem('token'); // ⭐️ 토큰을 지워주자! => 여기는 동기적으로 동작하기 때문에 await가 필요없음

                // ⭐️ aync await 꼭 넣어주기!
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/refresh-token`, { refreshToken /* refreshToken : 토큰값 */});
                localStorage.setItem('token', response.data.result.accessToken);
                
                // 받아온 토큰으로 다시 그 API를 호출하려면 reload를 한번 시켜줘야 한다.
                // 에러가 났고, 토큰을 새로 받아 왔다는 것을 사용자가 알면 안된다.
                // if(response.data.result.refreshToken) {
                    window.location.reload(); 
                // }
            } catch(e) {
                console.log("line 51");
                localStorage.clear();
                window.location.href = '/login';
            }
        
        }
        return Promise.reject(error);
    }
)

app.use(store);
app.use(router);
app.use(vuetify); // ⭐️
app.mount('#app');
