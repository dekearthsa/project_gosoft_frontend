<script setup>
  import VueCookies from 'vue-cookies'
  import { useRouter } from 'vue-router';
  import {onMounted} from "vue";

  const router = useRouter();

  onMounted(() => {
    const data = VueCookies.get("setDataGosoft")
    try{
      if(data.token){
        router.push({path: "/nutrition"})
      }else{
        router.push({path: "/login"})
      }
    }catch(err){
      router.push({path: "/login"})
    }
  
  })
</script>

<template>
  <div>

  </div>
</template>


<style scoped>

</style>