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
  background: rgb(250,250,250);
  background: linear-gradient(169deg, rgba(250,250,250,1) 25%, rgba(255,246,228,1) 51%, rgba(255,182,58,1) 77%, rgba(255,139,0,1) 100%);
}
</style>
