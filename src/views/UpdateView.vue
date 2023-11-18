<script setup>
    import { useRouter } from 'vue-router'; 
    import { onMounted} from "vue";
    import axios from "axios";
    import VueCookies from 'vue-cookies'
    import { useStore } from 'vuex'
    // const publicPath = ref(import.meta.env.BASE_URL)

    const store = useStore();

    const router = useRouter(); 

    const haddleChangeBody = () => {
        router.push({path: "/update/changebody"})
    }

    const haddleChangePassword = () => {
        router.push({path: "/update/changepassword"})
    }


    const haddleAuth = async () => {
        const getToken = await VueCookies.get("setDataGosoft");
        // console.log(getToken.token)
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

    onMounted(() => {
        haddleAuth();
        store.state.cssSelectionHome = "is-menu-none-select"
        store.state.cssSelectionNutrition = "is-menu-none-select"
        store.state.cssSelectionChatbot = "is-menu-none-select"
        store.state.cssSelectionLogin = "is-menu-selected"
        store.state.cssSelectionFilter = "is-menu-none-select"
    })

    

</script>

<template>  
    <div class="c-update" >
        <div class="c-title text-center mt-10 font-bold ">Update Profile</div>
        <div class="c-desc">
            <div class="c-card c-1">
                <div class="c-change-pass font-bold pt-4">
                    <button @click="haddleChangePassword">
                        <div>Change password</div>
                        <div>
                            <img class="m-auto mt-10" src="https://cdn-icons-png.flaticon.com/512/3596/3596029.png" width="170" height="170"/>
                        </div>
                    </button>
                </div>
            </div>
            <div class="c-card c-2">
                <div class="c-change-body font-bold pt-4">
                    <button @click="haddleChangeBody">
                        <div>Change body</div>
                        <div>
                            <img class="m-auto mt-10" src="https://cdn-icons-png.flaticon.com/512/3843/3843036.png" width="170" height="170"/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
@media not all and (min-width: 768px){
    .c-card{
        margin-top: 30px;
    }
    .c-change-pass{
        margin: auto;
        border: 1px solid gray;
        width: 200px;
        text-align: center;
        height: 300px;
        border-radius: 10px;
    }

    .c-change-body{
        margin: auto;
        border: 1px solid gray;
        width: 200px;
        text-align: center;
        height: 300px;
        border-radius: 10px;
    }   

}

@media (min-width: 768px){
    .c-1{
        margin-left: 13%;
    }

    .c-2{
        margin-right: 13%;
    }
    .c-update{
        position: relative;
        z-index: 1;
    }

    .c-update::before{
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("https://marvel-b1-cdn.bc0a.com/f00000000128518/www.torrens.edu.au/-/media/project/laureate/shared/course-hero/health/diploma-of-nutrition/health-courses-fresh-fruit-display-hero-lg.png?rev=f06dde100ed34e89aaf06e3e91908fe8");
        opacity: 0.35;
    }
    .c-desc{
        display: flex;
        justify-content: space-around;  
        margin-top: 50px;
        line-height: 0.9;
    }
    .c-card{
        margin-top: 30px;
    }
    .c-change-pass{
        margin: auto;
        border: 1px solid gray;
        width: 350px;
        text-align: center;
        height: 300px;
        border-radius: 10px;
    }

    .c-change-body{
        margin: auto;
        border: 1px solid gray;
        width: 350px;
        text-align: center;
        height: 300px;
        border-radius: 10px;
    } 
}
</style>