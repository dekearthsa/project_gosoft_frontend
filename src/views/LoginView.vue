<script setup>
    import { useRouter } from 'vue-router'; 
    import {ref, onMounted} from "vue";
    import axios from "axios";
    import VueCookies from 'vue-cookies'
    import { useStore } from 'vuex'
    const publicPath = ref(import.meta.env.BASE_URL)


    const router = useRouter();
    const store = useStore();

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
            store.state.loginContent = "Profile"
            store.state.cssSelectionHome = "is-menu-selected"
            store.state.cssSelectionNutrition = "is-menu-none-select"
            store.state.cssSelectionChatbot = "is-menu-none-select"
            store.state.cssSelectionLogin = "is-menu-none-select"
            store.state.cssSelectionFilter = "is-menu-none-select"
            router.push({path: "/"})
        }catch(err){
            // console.log(err)
            alert(err)
            store.state.loginContent = "login"
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
        store.state.loginContent = "login"
        await VueCookies.remove("setDataGosoft")
        location.reload();
    }

    const haddleUpdate = () => {
        router.push({path: "/update"})
    }

    onMounted(() => {
        haddleGetCheckToken();
    })

</script>

<template>
    <div class="bg-img">
        <div >
            <img :src="`${publicPath}gym.png`"/>
        </div>
        <div class="c-login">
            <div v-if="isToken === ''">
                <div class="">
                    <div class="c-username">Username</div>
                    <input v-model="username" class="border-b-[1px] border-gray-500 w-[100%]" placeholder="example" type="text"/>
                </div>
                <div class="mt-3">
                    <div class="c-password">Password</div>
                    <input v-model="password" class="border-b-[1px] border-gray-500 w-[100%]" placeholder="xxxx" type="password"/>
                </div>
                <div class="mt-5 text-center">
                    <button @click="haddleLogin" class=" text-[14px] font-bold w-[150px] h-[40px] rounded-md text-white bg-amber-700">Login</button>
                </div>
                <div class="mt-5 text-right text-[10px]">
                    <button class="btn-create-acc" @click="haddleRouterPage">Create username</button>
                </div>
            </div>
            <div class="c-islogin" v-if="isToken !== ''">
                <div>
                    <div> Welcome...</div>
                    <div>you are already login. </div>
                    
                    <div class="flex justify-around mt-5">
                        <button @click="haddleUpdate" class=" text-[13px] font-bold w-[80px]  h-[40px] rounded-md text-white bg-amber-700">Update</button>
                        <button @click="haddleLogout" class=" text-[13px] font-bold w-[80px]  h-[40px] rounded-md text-white bg-amber-700">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>

@media not all and (min-width: 768px){
    .btn-create-acc{
        color: rgb(30 64 175);
        font-weight: bold;
    }

    img{
        display: none
    }
    .c-login{
        padding-top: 30vh;
        width: 200px;
        margin: auto;
    }
}

@media (min-width: 768px){
    .c-islogin{
        color: white;
        font-size: 16px;
        font-weight: bold;
    }
    input::placeholder{
        padding-left: 10px;
    }
    input{
        border-radius: 5px;
    }
    .btn-create-acc{
        color: white;
        font-weight: bold;
        font-size: 14px;
    }

    .c-username{
        color: white;
        font-weight: bold;
    }

    .c-password{
        color: white;
        font-weight: bold;
    }
    
    img{
        object-fit: cover;
        opacity: 0.8;
    }
    .bg-img{
        overflow-y: scroll;
    }
    .c-login{
        width: 350px;
        min-width: 350px;
        position: fixed;
        top: 40%;
        left: 40%
    }
}

</style>