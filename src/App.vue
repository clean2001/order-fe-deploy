<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> msg는 HelloWorld로 넘겨준 것임 -->

  <!-- router-view를 통해 app.vue에서 화면 라우팅. 라우터를 찾아가서 화면을 뿌려주는 것이다. -->

  <!-- <HeaderComponent/> -->
  <v-app>
    <HeaderComponent/>
    <v-main>
      <router-view/>
    </v-main>
    <FooterComponent/>
  </v-app>

  <!-- <FooterComponent/> -->
</template>
<!-- template에는 html 코드가 들어가고, script에는 js 코드가 들어감. 디자인은 style 태그 안에 들어감 -->
<!-- html로 따지면, template 태그가 body 부분인 것이다. -->
<!-- vue 파일 안에는 head 태그가 없고, head에 공통 import사항은 main.js에 구성하면 된다. -->
<script>
// App.vue는 Vue 애플리케이션의 루트 컴포넌트(재활용이 가능한 화면)
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'


export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */


</style>
