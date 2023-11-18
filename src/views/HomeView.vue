<script setup>
  import VueCookies from 'vue-cookies'
  import { useRouter } from 'vue-router';
  import {onMounted, ref} from "vue";
  const publicPath = ref(import.meta.env.BASE_URL)

  

  const router = useRouter();

  const haddleToURL = (evt) => {
    if(evt === "info"){
      window.location.href = "https://drive.google.com/file/d/1aMPMZ3h1d_F2JLJEoU9JDPwwDYTRKwgT/view?usp=drive_link"
    }else if(evt === "pitch"){
      window.location.href = "https://drive.google.com/file/d/1I2KaxPq5fMaxKlEyBbZN9poccuL_qgZ6/view?usp=drive_link"
    }else if(evt === "mp4"){
      window.location.href = "https://drive.google.com/file/d/1hvnj02z_FHL3Iejx09MLLmBv-22BYBHl/view?usp=sharing"
    }
  }


</script>

<template>
  <div class="">

    <div class="">
      <div class="pl-5 mt-[10px]  h-[300px]">
        <div class="text-right">
          <div class="mb-10 mr-5 font-bold">
            <div class="flex justify-end">
              <img :src="`${publicPath}logo.png`" width="100" height="100"/> 
            </div>
            <div class="logo-name">
              INTELLIGENCE NUTRITION ADVISOR
            </div>
          </div>
          
        </div>

        <div class="c-mobile pt-10">
          <div class="set-goal border-[1px] border-orange-600 mr-4 rounded-md">

            <div class="pt-10">
              <button @click="haddleToURL('info')" class="flex" >
                <div class="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D65100" class="c-info">
                    <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clip-rule="evenodd" />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                  </svg>
                </div>
                <div class="font-bold text-orange-600 mt-8 ml-2">
                  INFROGRAPHAPIC
                </div>
              </button>
            </div>

            <div class="pt-10">
              <button @click="haddleToURL('pitch')" class="flex">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D65100" class="c-pitch">
                    <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="font-bold text-orange-600 mt-8 ml-2">
                  PITCH DESK
                </div>
              </button>
            </div>

            <div class="pt-10 pb-10">
              <button @click="haddleToURL('mp4')" class="flex">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D65100" class="c-mp4">
                    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                  </svg>
                </div>
                <div class="font-bold text-orange-600 ">
                  <div class="mt-3 ml-2">
                    <div class="flex">VIDEO</div>
                    <div class="flex">INTRODUCTION</div>
                  </div>
                </div>
              </button>
            </div>
            
          </div>
        </div>

        <div class="c-screen pt-10">
          <div class="set-goal-s border-[1px] border-orange-600 mr-4 rounded-md">

            <div class="pt-10">
              <button @click="haddleToURL('info')">
                <div class="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="c-info">
                    <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clip-rule="evenodd" />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                  </svg>
                </div>
                <div class="font-bold text-orange-600 mt-8 ml-2">
                  INFROGRAPHAPIC
                </div>
              </button>
            </div>


            <div class="pt-10">
              <button @click="haddleToURL('pitch')">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="c-pitch">
                    <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="font-bold text-orange-600 mt-8  ml-2">
                  PITCH DESK
                </div>
              </button>
            </div>

            <div class="pt-10 pb-10">
              <button @click="haddleToURL('mp4')" >
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="c-mp4">
                    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                  </svg>
                </div>
                <div class="font-bold text-orange-600 ">
                  <div class="mt-3 ml-2">
                    <div class="flex">VIDEO</div>
                    <div class="flex">INTRODUCTION</div>
                  </div>
                </div>
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>
img{
  border-radius: 15px;
}

    @media not all and (min-width: 768px){
      .c-screen{
        display: none;
      }
      .logo-name{
        font-size: 12px;
        font-weight: bold;
      }

      .c-point{
        font-weight: bold;
      }

      .c-info{
        width: 80px;
        height: 80px;
      }

      .c-pitch{
        width: 80px;
        height: 80px;     
      }

      .c-mp4{
        width: 80px;
        height: 80px;
      }
    }

    @media (min-width: 768px){
      .c-mobile{
        display: none;
      }

      .set-goal-s{
        margin: auto;
        margin-top: 100px;
        margin-right: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
      }

      .c-info{
        width: 150px;
        height: 150px;
        fill: #D65100;
        transition: 1s;
      }

      .c-pitch{
        width: 150px;
        height: 150px; 
        transition: 1s;  
        fill: #D65100  
      }

      .c-mp4{
        width: 150px;
        height: 150px;
        transition: 1s;
        fill: #D65100
      }

      .c-info:hover{
        fill: #f69559;
        transform: translateY(-10px);
        transition: 1s;
      }

      .c-pitch:hover{
        fill: #f69559;
        transform: translateY(-10px);
        transition: 1s;
      }

      .c-mp4:hover{
        fill: #f69559;
        transform: translateY(-10px);
        transition: 1s;
      }


    }
</style>