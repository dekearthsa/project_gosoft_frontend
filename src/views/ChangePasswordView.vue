<script setup>
    import {ref, onMounted} from "vue";
    import { useRouter } from 'vue-router'; 
    import VueCookies from 'vue-cookies'
    import axios from "axios";
    
    const router = useRouter();

    const password = ref("");
    const conPassword= ref("");
    const isError = ref("");
    const haddleBack = () => {
        router.push({path: "/update"})
    }

    const haddleSubmit = async () => {
        const setPassword = password.value.trim();
        const isUser = VueCookies.get("setDataGosoft")
        try{
            if(setPassword !== ""){
                if(setPassword === conPassword.value){
                    const payload = {
                        Username: isUser.Username,
                        Password: setPassword
                    }
                    const status = await axios.post("https://service-register-login-nya5fszoda-as.a.run.app/api/update/password", payload);
                    console.log(status.data)
                }else{
                    isError.value = "password not match."
                }
            }else{
                isError.value = "password cannot be empty."
            }
        }catch(err){
            console.log(err)
        }
    }

    const getCookies =  () => {
        try{
            const isToken = VueCookies.get("setDataGosoft")

            if(!isToken.token){
                router.push({path: "/login"})
            }else{
                
            }
        }catch(err){
            console.log(err)
            router.push({path: "/login"})
        }

    }

    onMounted(() => {
        getCookies();
    })
</script>

<template>
    <div class="ml-5 mt-5"> 
        <!-- <div class="c-age mt-10">
            <div class="text-[14px]">
                Username*
            </div>
            <div>
                <input v-model="username" type="text" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div> -->
    
        <div class="c-age mt-10">
            <div class="text-[14px]">
                Password*
            </div>
            <div>
                <input v-model="password"  type="password" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>
    
        <div class="c-age mt-10">
            <div class="text-[14px]">
                Confirm password*
            </div>
            <div>
                <input v-model="conPassword"  type="password" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>
        <div class="flex justify-around">
            <div>
                <button @click="haddleBack" class="mt-10 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Back</button>
            </div>
            <div>
                <button @click="haddleSubmit" class="mt-10 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Submit</button>
            </div>
        </div>
        <div class="text-center text-red-700 m-auto mt-10">{{ isError }}</div>
        
    </div>
    
</template>

<style scoped>

</style>