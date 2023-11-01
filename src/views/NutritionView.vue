<script setup>
    import {ref} from "vue";
    import axios from "axios";
    
    import { useStore } from 'vuex'
    const store = useStore();
    const imgUrl = ref("");

    const haddleOpenPopup = () => {
        store.state.isPopup = true
    }
 
    // const onloading = ref(false)
    const upload = async (event) => {
        store.state.isLoading = true
        let formData = new FormData();
        formData.append("image", event.target.files[0]);
        const createUrl = URL.createObjectURL(event.target.files[0]);
        imgUrl.value = createUrl
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
            alert(err)
            console.log(err)
            store.state.isLoading = false
        }
        
        
    }


</script>

<template>
    
    <div class="c-container-n">
        <div class="c-title mt-5 mb-5">Nutrition</div>
        <div class="mt-10">
            <div class="mb-5" v-if="imgUrl !== ''">
                <img :src="imgUrl" width="240" height="240"/>
            </div>
            <div class="c-file">
                <label class="custom-file-upload">
                    <input type="file" @change="upload($event)" id="file-input"/>
                    <div class="select-img">Upload image</div>
                </label>
            </div>
                
        </div>
        <div class="c-desc" v-if="imgUrl !== ''">
            <div class="btn-upload ">
                <button @click="haddleOpenPopup" class="border-[1px] border-gray-600 w-[120px] h-[4vh] rounded-md bg-gray-700 text-white font-bold ">Result</button>
            </div>
        </div>
    </div>
    
</template>

<style scoped>

@media not all and (min-width: 768px){
    .c-title{
        font-size: 14px;
        font-weight: bold;
        text-align: center;
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