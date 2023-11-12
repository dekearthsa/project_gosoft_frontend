
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
    const negativeWord = ref("");
    const arrayOfNegative = ref([]);
    const isTyping = ref(false);

    const haddleAddingNegative = () => {
        arrayOfNegative.value.push(negativeWord.value)
        negativeWord.value = ""
        console.log(arrayOfNegative.value)
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
                    console.log(auth.data)
                    if (!auth.data.login) {
                        VueCookies.remove("setDataGosoft");
                        router.push({path: "/login"})
                    }
            }else{
                VueCookies.remove("setDataGosoft");
                router.push({path: "/login"})
            }
        }catch(err){
            console.log(err)
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
            console.log(payloadProfile)
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
            filter_ingredient: arrayOfNegative.value,
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
        <div class="c-title m-auto ">
            <div class="pt-10">
                Chatbot
            </div>
        </div>
        <div class="mt-10">
            <div class="c-box" >
                <div v-for="(el,idx) in arrayText" :key="idx">
                    <div class="flex justify-start ml-3 mt-2">
                        <div class="c-bot">{{el.bot}}</div>
                    </div>
                    <div class="flex justify-end mr-3">
                        <div class="c-user w-[70%] text-right font-bold">{{el.user}}</div>
                    </div>
                </div>
            </div>
            <div class="mt-5 text-center">
                <input v-model="negativeWord"  list="ingre"  id="ingres" placeholder="Filter ingredient">
                <datalist id="ingre">
                    <option v-for="(el, idx) in store.state.propmt" :key="idx" :value="el">{{el}}</option>
                </datalist>
                <button  @click="haddleAddingNegative" class="btn-send w-[50px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">add</button>
                <div >
                    <span class="ml-1" v-for="(el, idx) in arrayOfNegative" :key="idx">{{el}}</span>
                </div>
            </div>
            <div class="c-typing">
                <input v-if="isTyping === false" v-model="isText" placeholder="tpying message"/>
                <button v-if="isTyping === false" @click="haddleSend" class="btn-send w-[50px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">send</button>
                <div class="loader m-auto" v-if="isTyping === true"></div>
            </div>
            
            <div class="set-result mt-10" v-if="store.state.isProduct.length !== 0 ">
                <button  @click="haddlerShowResult" class="w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Result</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
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
        background: rgb(47, 47, 47);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    }
    .c-bot{
        width: 70%;
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
        width: 90%;
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