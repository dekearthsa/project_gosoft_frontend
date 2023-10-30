<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
</script>

<template>
  <div class="flex">
    <div>
      <Navbar/>
    </div>
    <div class="">
      <RouterView class="c-view-p" />
    </div>
  </div>
</template>

<style >
body{
  margin: 0px;
  padding: 0px;
}


.c-view-p{
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
}
</style>
