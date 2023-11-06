<script setup>
    
    import { useRouter } from 'vue-router'; 
    

    const router = useRouter(); 

    const haddleChangeBody = () => {
        router.push({path: "/update/changebody"})
    }

    const haddleChangePassword = () => {
        router.push({path: "/update/changepassword"})
    }

    

</script>

<template>
    <div>
        <div class="c-title text-center mt-10 font-bold ">Update Profile</div>
        <div class="c-desc">
            <div class="c-card">
                <div class="c-change-pass font-bold pt-4">
                    <button @click="haddleChangePassword">
                        <div>Change password</div>
                        <div>
                            <img class="m-auto mt-10" src="https://cdn-icons-png.flaticon.com/512/3596/3596029.png" width="170" height="170"/>
                        </div>
                    </button>
                </div>
            </div>
            <div class="c-card">
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

    .c-desc{
        display: flex;
        justify-content: space-around;  
        margin-top: 50px;
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