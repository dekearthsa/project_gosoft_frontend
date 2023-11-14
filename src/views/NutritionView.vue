<script setup>
    import {ref, onMounted} from "vue";
    import axios from "axios";
    import VueCookies from 'vue-cookies'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'; 

    const store = useStore();
    const imgUrl = ref("");
    const evtStore = ref();
    const isResult = ref(false);
    const router = useRouter();

    const haddleOpenPopup = () => {
        store.state.isPopup = true
    }

    const haddleAuth = async () => {
        const getToken = await VueCookies.get("setDataGosoft");
        // console.log(getToken.token)
        try{
            if(getToken.token){
                const headerConfig = {
                    headers: {
                        Authorization: getToken.token
                    }
                }
                const auth = await axios.get(store.state.checkAuthURL, headerConfig)
                // console.log(auth.data)
                if (!auth.data.login) {
                        VueCookies.remove("setDataGosoft",haddleLogin.data.token);
                        router.push({path: "/login"})
                    }
            }else{
                router.push({path: "/login"})
            }
        }catch(err){
            console.log(err)
            VueCookies.remove("setDataGosoft");
            router.push({path: "/login"})
        }
    }

    // const onloading = ref(false)
    const upload = async (event) => {
        
        // let formData = new FormData();
        evtStore.value = event
        const createUrl = URL.createObjectURL(event.target.files[0]);
        imgUrl.value = createUrl
        
    }

    const haddleSendImg = async () => {
        store.state.isLoading = true
        let formData = new FormData();
        formData.append("image", evtStore.value.target.files[0]);
        // formData.append("image", event.target.files[0]);
        
        try{
            const result = await axios.post(
                "https://us-central1-nindocnx.cloudfunctions.net/image_inference",
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }   
            )
            isResult.value = true
            store.state.isCal = result.data.cal
            store.state.isCarb = result.data.carb
            store.state.isCholesterol = result.data.cholesterol
            store.state.isFat = result.data.fat
            store.state.isProtien = result.data.protien
            store.state.isServing = result.data.serving
            store.state.isSodium = result.data.sodium

            // console.log(result.data)
            store.state.isLoading = false
        }catch(err){
            isResult.value = false
            alert(err)
            console.log(err)
            store.state.isLoading = false
        }
    }

    onMounted(() => {
        haddleAuth()
    })

</script>

<template>
    <div >
        <div class="c-title h-[90px]">
            <div class="pt-10 font-bold ">Nutrition</div>
        </div>
        <div class="set-nutriton">
            <div class="mt-[100px]">
                <div class="set-c-img">
                    <div class="mb-5" >
                        <img  v-if="imgUrl !== ''" class="m-auto rounded-md" :src="imgUrl" width="240" height="240"/>
                        <div v-if="imgUrl === ''"  class="set-blank-img" >
                            <div class="text-center mt-[170px]">
                                No image found
                            </div>
                        </div>
                    </div>
                    <div class="c-file m-auto text-center">
                        <label class="custom-file-upload">
                            <input type="file" @change="upload($event)" id="file-input"/>
                            
                            <div class="select-img">
                                <div>
                                    Upload image
                                </div>
                                <div class="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center m-auto mt-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                
                            </div>
                        </label>
                    </div>
                </div>
                <div class="c-btn-send mt-10 m-auto text-center">
                    <div>
                        <button @click="haddleSendImg" class="border-[1px] border-gray-600 w-[120px] h-[4vh] rounded-md bg-gray-700 text-white font-bold">Send</button>
                    </div>
                    
                    <div class="c-desc" v-if="isResult === true">
                            <button @click="haddleOpenPopup" class="border-[1px] border-gray-600 w-[120px] h-[4vh] rounded-md bg-gray-700 text-white font-bold ">Result</button>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    
</template>

<style scoped>

@media (min-width: 768px){

    .set-c-img{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .set-blank-img{
        margin: auto;
        width: 370px;
        height: 370px;
        border: 1px solid gray;
        border-radius: 10px;
    }

    .c-title{
        width: 90%;
        margin: auto;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: white;
        background: rgb(39, 45, 56);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    }

    .c-title{
        font-weight: bold;
        text-align: center;
    }

    .c-login{
        margin: auto;
        text-align: center;
    }

    .custom-file-input {
        font-size: 12px;
    }


    .select-img{
        margin-top: 170px;
        text-align: center;
    }

    input[type="file"] {
        display: none;
    }
    .custom-file-upload {
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        width: 400px;
        height: 40vh;
        border-radius: 10px;
        margin: auto;
    }

    .c-btn-send{
        display: flex;
        justify-content: space-around;
    }
}

@media not all and (min-width: 768px){
    .c-title{
        width: 90%;
        margin: auto;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: white;
        background: rgb(39, 45, 56);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    }

    .c-container-n{
        margin: auto;
    }
 
    .c-login{
        margin: auto;
        text-align: center;
    }
    .custom-file-input {
        font-size: 12px;
    }


    .select-img{
        font-size: 12px;
        margin-top: 80px;
        text-align: center;
    }

    input[type="file"] {
        display: none;
    }
    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        width: 200px;
        height: 20vh;
        border-radius: 10px;
        cursor: pointer;
        margin-left: 20px;
    }
    .c-desc{
        margin: auto;
        margin-top: 40px;
        width: 120px;
     
    }

}

</style>