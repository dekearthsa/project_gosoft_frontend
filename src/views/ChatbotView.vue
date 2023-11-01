
<script setup>
    import VueCookies from 'vue-cookies'
    import {ref, onMounted} from "vue";
    import axios from 'axios';

    import { useStore } from 'vuex'

    const store = useStore();

    const payloadProfile = ref()
    const isText = ref();
    const arrayText = ref([]);
    const isTyping = ref(false);

    const haddleProfile = () => {
        const profileData = VueCookies.get("setDataGosoft");
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
    }

    const haddleSend = async() => {
        isTyping.value = true
        const data = JSON.stringify({
            session_state_responses: [],
            session_state_request: [],
            query: isText.value,
            user_private_data: payloadProfile.value
        })


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
            // console.log(response.data.str_result)
            arrayText.value.push({bot:response.data.response})
            if(response.data.str_result.optimal_nutrition !== undefined){
                store.state.isOptimalNutrition = response.data.str_result.optimal_nutrition
                store.state.isProduct = response.data.str_result.products
                console.log(response.data.str_result)
                console.log(store.state.isProduct)
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
        haddleProfile();
    })

    
</script>

<template>
    <div>
        <div class="title text-center mt-5 mb-5">Chatbot</div>
        <div>
            <div class="c-box" >
                <div v-for="(el,idx) in arrayText" :key="idx">
                    <div class="flex justify-start ml-3 mt-2">
                        <div class="w-[90%]">{{el.bot}}</div>
                    </div>
                    <div class="flex justify-end mr-3">
                        <div class="w-[70%] text-right font-bold">{{el.user}}</div>
                    </div>
                </div>
            </div>
            <div class="c-typing">
                <input v-if="isTyping === false" v-model="isText"/>
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



@media not all and (min-width: 768px){
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
        border-radius: 10px;
    }

    .btn-send{
        margin-left: 10px;
    }

    .set-result{
        text-align: center;
    }
}
</style>