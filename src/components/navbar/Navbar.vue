<script setup>
    // import { RouterLink } from 'vue-router'
    import { useRouter } from 'vue-router'; 
    import {ref, computed, onUpdated} from "vue";
    // import VueCookies from 'vue-cookies'
    import { useStore } from 'vuex'

    const cssNavBar = ref("c-navbar")
    const store = useStore();
    const router = useRouter();

    const haddleCloseBar = (evt) => {
        if(evt === "close"){
            cssNavBar.value = "c-navbar-c"
        }else{
            cssNavBar.value = "c-navbar"
        }
    }

    const haddleRoute = (evt) => {
        if(evt === "nutrition"){
            router.push({path:"/nutrition"})
        }else if(evt === "chatbot"){
            router.push({path:"/chatbot"})
        }else if(evt === "login"){
            router.push({path:"/login"})
        }
    }

    // const islogin = computed(  () => {
    //     const getToken =  VueCookies.get("setDataGosoft")
    //     if(getToken){
    //         return "Profile"
    //     }else{
    //         return "login"
    //     }
    // })

</script>

<template>
    <div :class="cssNavBar" class=" bg-gray-800 font-bold text-white">
        <div class="flex justify-end">
            <button class="mr-1 mt-1" v-if="cssNavBar === 'c-navbar'" @click="haddleCloseBar('close')">
                <svg class=" w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" >
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                </svg>
            </button>
            <button class="mr-1 mt-1" v-if="cssNavBar === 'c-navbar-c'" @click="haddleCloseBar('open')">
                <svg class=" w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" >
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
        <div class="c-nutrition pt-10 ml-4" v-if="cssNavBar === 'c-navbar'">
            <button @click="haddleRoute('nutrition')" class="flex" > 
                <div>
                    <svg class="c-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                        <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    Nutrition
                </div>
            </button >
        </div>
        <div class="c-chatbot mt-10 ml-4" v-if="cssNavBar === 'c-navbar'">
            <button @click="haddleRoute('chatbot')" class="flex">
                <div>
                    <svg class="c-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                        <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div>Chatbot</div>
            </button >
        </div>
        <div class="c-login mt-[60vh]" v-if="cssNavBar === 'c-navbar'">
            <div class="">
                <button @click="haddleRoute('login')" class="flex  m-auto" >
                    <div class="">
                        <svg class="c-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        {{ store.state.loginContent }}
                    </div>
                </button>
            </div>
        </div>
        
    </div>
</template>

<style scoped>

@media not all and (min-width: 768px){
    .c-navbar{
        height: 100vh;
        width: 130px;
        transition: width 1.5s;
    }
    
    .c-navbar-c{
        height: 100vh;
        width: 35px;
        transition: width 1.5s;
    }

    .c-icon{
        margin-right: 10px;
    }
}


@media (min-width: 768px){

    .c-nutrition{
        margin-left: 50px;
    }

    .c-chatbot {
        margin-left: 50px;
    }
    .c-navbar{
        height: 100vh;
        width: 200px;
        transition: width 1.5s;
    }
    
    .c-navbar-c{
        height: 100vh;
        width: 35px;
        transition: width 1.5s;
    }

    .c-icon{
        margin-right: 20px;
    }
}
</style>