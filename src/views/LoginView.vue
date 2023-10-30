<script setup>
    import { useRouter } from 'vue-router'; 
    import {ref, onMounted} from "vue";
    import axios from "axios";
    import VueCookies from 'vue-cookies'


    const router = useRouter();

    const username = ref("");
    const password = ref("");

    const isToken = ref("");

    const haddleRouterPage = () => {
        router.push({path: "/register"})
    }

    const haddleLogin = async () => {
        const payload ={
            Username: username.value,
            Password: password.value
        }
        try{
            const haddleLogin = await axios.post("https://service-register-login-nya5fszoda-as.a.run.app/api/login", payload);
            VueCookies.set("setDataGosoft",haddleLogin.data);
            // console.log(haddleLogin.data)
            router.push({path: "/nutrition"})
        }catch(err){
            console.log(err)
            alert(err)
            VueCookies.remove("setDataGosoft",haddleLogin.data.token);
            username.value = ""
            password.value = ""
        }
    }

    const haddleGetCheckToken = async () => {
        const getToken = await VueCookies.get("setDataGosoft")
        if(getToken.token){
            isToken.value = getToken.token 
        }else{
            isToken.value = ""
        }
    }

    const haddleLogout = async () => {
        await VueCookies.remove("setDataGosoft")
        location.reload();
    }

    onMounted(() => {
        haddleGetCheckToken();
    })

</script>

<template>
    <div class="c-login ">
        <div v-if="isToken === ''">
            <div class="">
                <div>Username</div>
                <input v-model="username" class="border-b-[1px] border-gray-500 w-[100%]" placeholder="example" type="text"/>
            </div>
            <div class="mt-3">
                <div>Password</div>
                <input v-model="password" class="border-b-[1px] border-gray-500 w-[100%]" placeholder="xxxx" type="password"/>
            </div>
            <div class="mt-5 text-center">
                <button @click="haddleLogin" class="border-[1px] border-gray-600 text-[13px] font-bold w-[150px] rounded-md text-white bg-gray-600">Login</button>
            </div>
            <div class="mt-5 text-right text-[10px] text-blue-800 font-bold">
                <button @click="haddleRouterPage">Create username</button>
            </div>
        </div>
        <div v-if="isToken !== ''">
            <div>
                <div> Welcome...</div>
                <div>you are already login. </div>
                <div class="mt-5">
                    <button @click="haddleLogout" class="border-[1px] border-gray-600 text-[13px] font-bold w-[100px] rounded-md text-white bg-gray-600">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
@media not all and (min-width: 768px){
    .c-login{
        padding-top: 30vh;
        margin-left: 25%;
        width: 100%;
    }
}

@media (min-width: 768px){
    .c-login{
        width: 350px;
        min-width: 350px;
        position: fixed;
        top: 40%;
        left: 40%
    }
}

</style>