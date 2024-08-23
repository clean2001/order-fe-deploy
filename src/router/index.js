import { createRouter, createWebHistory } from 'vue-router';
// @는 src(루트 폴더 경로)를 의미한다.
// 파일(HomeComponent) 내부에 export default가 있는 경우에는 {}가 필요없고, 그렇지 않은 경우에는 {}가 필요하다.
// 요소가 여러개 있을 때에도 {}를 붙인다
// import HomeComponent from '@/components/HomeComponent.vue';
// import TestComponent from '@/components/TestComponent.vue';

import { practiceRouter } from './practiceRouter';
import { memberRouter } from './memberRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';

const routes = [
    // {
    //     // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    //     // 1) createWebHistory: /home, 2) createHashHistory: /#/home
    //     // 대부분 WebHistory 방식을 사용한다.
    //     /*
    //     path로도 라우팅이 가능하고 name으로도 라우팅이 가능하다.
    //     name으로 라우팅하는 경우는 js 코드 내에서 라우팅하는 경우이다.
    //      */
    //     path: '/',
    //     name: 'HOME',
    //     component: HomeComponent
    // },
    // {
    //     path: '/test',
    //     name: 'HOME',
    //     component: TestComponent
    // }
    ...practiceRouter, // 스프레드 문법
    ...memberRouter,
    ...productRouter,
    ...orderRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router