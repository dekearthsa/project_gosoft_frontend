
<script setup>
    import VueCookies from 'vue-cookies'
    import {ref, onMounted }from "vue";
    import axios from 'axios';
    import { useRouter } from 'vue-router'; 
    import { useStore } from 'vuex'

    const store = useStore();
    const router = useRouter();

    const payloadProfile = ref()
    const isText = ref();
    const arrayText = ref([]);
    // const negativeWord = ref("");
    // const arrayOfNegative = ref([]);
    const isTyping = ref(false);

    // const haddleAddingNegative = () => {
    //     arrayOfNegative.value.push(negativeWord.value)
    //     negativeWord.value = ""
    //     console.log(arrayOfNegative.value)
    // }

    const haddleRouteFilter = () => {
        store.state.cssSelectionHome = "is-menu-none-select"
        store.state.cssSelectionNutrition = "is-menu-none-select"
        store.state.cssSelectionChatbot = "is-menu-none-select"
        store.state.cssSelectionLogin = "is-menu-none-select"
        store.state.cssSelectionFilter = "is-menu-selected"
        router.push({path:"/filter"})
    }

    const haddleAuth = async () => {
        const getToken = await VueCookies.get("setDataGosoft");
        
        try{
            if(getToken.token){
                    let config = {
                        method: 'get',
                        url: 'https://service-register-login-nya5fszoda-as.a.run.app/api/check/auth',
                        headers: { 
                            "Authorization": getToken.token
                        }
                    };
                    const auth = await axios.request(config)
                    // console.log(auth.data)
                    if (!auth.data.login) {
                        store.state.cssSelectionHome = "is-menu-none-select"
                        store.state.cssSelectionNutrition = "is-menu-none-select"
                        store.state.cssSelectionChatbot = "is-menu-none-select"
                        store.state.cssSelectionLogin = "is-menu-selected"
                        store.state.cssSelectionFilter = "is-menu-none-select"
                        VueCookies.remove("setDataGosoft");
                        router.push({path: "/login"})
                    }
            }else{
                store.state.cssSelectionHome = "is-menu-none-select"
            store.state.cssSelectionNutrition = "is-menu-none-select"
            store.state.cssSelectionChatbot = "is-menu-none-select"
            store.state.cssSelectionLogin = "is-menu-selected"
            store.state.cssSelectionFilter = "is-menu-none-select"
                VueCookies.remove("setDataGosoft");
                router.push({path: "/login"})
            }
        }catch(err){
            // console.log(err)
            store.state.cssSelectionHome = "is-menu-none-select"
            store.state.cssSelectionNutrition = "is-menu-none-select"
            store.state.cssSelectionChatbot = "is-menu-none-select"
            store.state.cssSelectionLogin = "is-menu-selected"
            store.state.cssSelectionFilter = "is-menu-none-select"
            VueCookies.remove("setDataGosoft");
            router.push({path: "/login"})
        }
    }

    const haddleProfile = () => {
        const profileData = VueCookies.get("setDataGosoft");
        try{
            const payload = {
            age: Number(profileData.age),
            gender: profileData.sex,
            height: Number(profileData.height),
            weight: Number(profileData.Weight),
            exercise_intensity: profileData.excercise,
            health_target: profileData.target,
            meal: profileData.meal,
            cal_need: Number(profileData.targetCal),
            cal_dec: profileData.targetCal?"Y":"N"
            }
            payloadProfile.value = payload
            // console.log(payloadProfile)
        }catch(err){
            router.push({path: "/login"})
        }
        
    }

    const haddleSend = async() => {
        isTyping.value = true
        const data = JSON.stringify({
            session_state_responses: [],
            session_state_request: [],
            query: isText.value,
            filter_ingredient: store.state.arrayOfNegative,
            user_private_data: payloadProfile.value,
        })
        console.log(data)


        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://us-central1-nindocnx.cloudfunctions.net/chat_processing',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        arrayText.value.push({user:isText.value})
        isText.value = "";
        
        try{
            const response = await axios.request(config)
            arrayText.value.push({bot:response.data.response})
            if(response.data.str_result.optimal_nutrition !== undefined){
                store.state.isOptimalNutrition = response.data.str_result.optimal_nutrition
                store.state.isProduct = response.data.str_result.products
            }
            // console.log(arrayText.value)
            isTyping.value = false
        }catch(err){
            console.log(err)
            isTyping.value = false
        }
        

    }

    const haddlerShowResult = () => {
        store.state.isPopupNutrition = true
    }

    onMounted(() => {
        haddleAuth();
        haddleProfile();
    })

    
</script>

<template>
    <div>
        <div class="mb-10">
            <div class="c-title m-auto">
                <div class="pt-10">
                    Chatbot
                </div>
            </div>
        </div>
        
        <div class="c-contaniner">
            <div class="c-container-box">
                
                <div class="c-box" >
                    
                    <div v-for="(el,idx) in arrayText" :key="idx">
                        <div class="flex justify-start ml-3 mt-2 w-[50%]">
                            <div class="ai-bubble text-white">{{el.bot}}</div>
                        </div>
                        <div class="">
                            <div class="flex justify-end mr-3 ">
                                <div class="text-white  text-right font-bold speech-bubble">{{el.user}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="mt-5 text-center">
                    <input v-model="negativeWord"  list="ingre"  id="ingres" placeholder="Filter ingredient">
                    <datalist id="ingre">
                        <option v-for="(el, idx) in store.state.propmt" :key="idx" :value="el">{{el}}</option>
                    </datalist>
                    <button  @click="haddleAddingNegative" class="btn-send w-[50px] border-[1px] border-gray-600 bg-amber-700 text-white rounded-md">add</button>
                    <div >
                        <span class="ml-1" v-for="(el, idx) in arrayOfNegative" :key="idx">{{el}}</span>
                    </div>
                </div> -->
                <div class="">
                    <div class="c-typing">
                        <div class="">
                            <input v-if="isTyping === false" v-model="isText" placeholder="your message here."/>
                            <div class="flex justify-center mt-5">
                                <button v-if="isTyping === false" @click="haddleSend" class="btn-send w-[80px] h-[40px]  bg-amber-700 text-white rounded-md">send</button>
                                <button v-if="isTyping === false" class="ml-4" @click="haddleRouteFilter">
                                    <svg v-if="store.state.arrayOfNegative.length === 0" class="w-8 h-8 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                    </svg>
                                    <svg v-if="store.state.arrayOfNegative.length > 0" class="w-8 h-8 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E0EA00" >
                                        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                    </svg>
                                </button>

                                <span v-if="isTyping === false" class="ml-1 font-bold">{{store.state.arrayOfNegative.length}}</span>
                                <div class="set-result ml-3" v-if="store.state.isProduct.length !== 0 ">
                                    <button  @click="haddlerShowResult" class="w-[80px] border-[1px] h-[40px]  bg-amber-700 text-white rounded-md">Result</button>
                                </div>
                            </div>
                            <div class="loader m-auto" v-if="isTyping === true"></div>
                            
                        </div>
                    </div>
                    
                    
                </div>
                
                
            </div>
            
        </div>
    </div>
</template>


<style scoped>

 

.speech-bubble {
	background: #9b8d59;
	border-radius: .4em;
}

.ai-bubble {
	position: relative;
	background: #00aabb;
	border-radius: .4em;
}

::placeholder {
    text-align: center; 
 }

.loader,
.loader:before,
.loader:after {
  width: 10px; /* update this to control the size */
  aspect-ratio: .5;
  display: grid;
  background: radial-gradient(#939393 68%,#0000 72%) center/100% 50% no-repeat;
  animation: load 1.2s infinite linear calc(var(--_s,0)*.4s);
  transform: translate(calc(var(--_s,0)*150%));
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
}
.loader:before {--_s: -1}
.loader:after  {--_s:  1}

@keyframes load {
  20% {background-position: top   }
  40% {background-position: bottom}
  60% {background-position: center}
}


@media (min-width: 768px){
    .c-title{
        width: 90%;
        margin: auto;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: white;
        height: 90px;
        background: #522206;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    }
    .c-bot{
        width: 70%;
    }

    .c-container-box{
        margin-top:40px;
    }
    .c-box{ 
        overflow-y: scroll;
        height: 70vh;
        border: 1px solid gray;
        width: 80%;
        margin: auto;
        border-radius: 10px;
    }
    .c-typing{
        padding-top: 20px;
        margin: auto;
        text-align: center;
        width: 90%;
        height: 40px;
    }

    input{
        width: 500px;
        border: 1px solid gray;
        border-radius: 4px;
    }

    .btn-send{
        margin-left: 10px;
    }

    .set-result{
        text-align: center;
    }
}


@media not all and (min-width: 768px){
    .c-title{
        background: #522206;
        width: 90%;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: white;
        height: 90px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    }
    .c-bot{
        width: 90%;
    }
    .c-box{

        overflow-y: scroll;
        height: 70vh;
        border: 1px solid gray;
        width: 90%;
        margin: auto;
        border-radius: 10px;
    }

    .c-typing{
        padding-top: 20px;
        margin: auto;
        text-align: center;
        width: 90%;
        height: 40px;
    }

    input{
        border: 1px solid gray;
        border-radius: 4px;
    }

    .btn-send{
        margin-left: 10px;
    }

    .set-result{
        text-align: center;
    }
}
</style>
