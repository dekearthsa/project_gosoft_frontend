
<script setup>
    import VueCookies from 'vue-cookies'
    import {ref, onMounted} from "vue";
    import axios from 'axios';

    const payloadProfile = ref()
    const isText = ref();

    const arrayText = ref([])

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
        const data = JSON.stringify({
            session_state_responses: [],
            session_state_request: [],
            query: isText.value,
            user_private_data: payloadProfile.value
        })

        // let data = JSON.stringify({
        //     "session_state_responses": [],
        //     "session_state_request": [],
        //     "query": "How are you?",
        //     "user_private_data": {
        //         "age": 30,
        //         "gender": "Male",
        //         "height": 170,
        //         "weight": 70,
        //         "exercise_intensity": "Less",
        //         "health_target": "BodyBuilder",
        //         "meal": 3,
        //         "cal_need": 0,
        //         "cal_dec": "N"
        //     }
        //     });

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
            console.log(response.data)
            arrayText.value.push({bot:response.data.response})
        }catch(err){
            console.log(err)
        }
        

        

    }

    onMounted(() => {
        haddleProfile();
    })

    
</script>

<template>
    <div>
        <div class="title text-center">Chatbot</div>
        <div>
            <div class="c-box" v-for="(idx, el) in arrayText" :key="idx">
                <div class="flex justify-start">{{el.bot}}</div>
                <div class="flex justify-end">{{el.user}}</div>
            </div>
            <div class="c-typing">
                <input v-model="isText"/>
                <button @click="haddleSend" class="btn-send">send</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
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
}
</style>