<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
import OnloadVue from "./components/Onload.vue";
import Popup from "./components/Popup.vue";
import PopupOptimal from './components/PopupOptimal.vue';

import { useStore } from 'vuex'
const store = useStore();

</script>

<template>
  <div >
    <div class="onloading" v-if="store.state.isLoading === true">
      <OnloadVue class="isloading"/>
    </div>
    <PopupOptimal v-if="store.state.isPopupNutrition === true"/>
    <Popup v-if="store.state.isPopup === true"/>
    <div class="c-container">
      <div>
        <Navbar/>
      </div>
        <RouterView class="c-view-p" />
    </div>
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
  grid-template-columns: 1fr 100fr;
}

.c-view-p{
  height: 100vh;
  overflow-y: scroll;
  background: rgb(255,255,255);
  background: linear-gradient(162deg, rgba(255,255,255,1) 60%, rgba(151,205,255,1) 81%, rgba(85,117,145,1) 90%, rgba(68,95,122,1) 100%);
}
</style>
