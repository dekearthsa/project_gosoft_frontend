<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
import OnloadVue from "./components/Onload.vue";
import Popup from "./components/Popup.vue";
import { useStore } from 'vuex'
const store = useStore();

</script>

<template>
  <div class="onloading" v-if="store.state.isLoading === true">
    <OnloadVue class="isloading"/>
  </div>
  <Popup v-if="store.state.isPopup === true"/>
  <div class="c-container">
    <div>
      <Navbar/>
    </div>
      <RouterView class="c-view-p" />
  </div>
</template>

<style scoped>


.onloading{
  position: fixed;
  z-index: 999;
  background-color: gray;
  height: 100vh;
  opacity: 0.5;
  width: 100%;
}

.isloading{
  top: 30%;
  left: 40%
}


body{
  margin: 0px;
  padding: 0px;
}

.c-container{
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.c-view-p{
  height: 100vh;
  overflow-y: scroll;
}
</style>
