<script setup>
  import VueCookies from 'vue-cookies'
  import { useRouter } from 'vue-router';
  import {onMounted} from "vue";

  const router = useRouter();


</script>

<template>
  <div class="">
    <div class="c-title">
      <div class="pt-10">HOME</div>
    </div>
    <div>
      <div class="pl-5 mt-[70px] font-bold h-[300px]">
          Description 
      </div>
    </div>
    <div>
      <div>

      </div>
    </div>
  </div>
</template>


<style scoped>
   .c-title{
        width: 90%;
        margin: auto;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: white;
        height: 90px;
        background: rgb(47, 47, 47);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    }
</style>