<script setup>

</script>

<template>
    <div class="c-login ">
        <div>
            <div class="">
                <input class="border-b-[1px] border-gray-500 w-[100%]" placeholder="username" type="text"/>
            </div>
            <div class="mt-3">
                <input class="border-b-[1px] border-gray-500 w-[100%]" placeholder="password" type="password"/>
            </div>
            <div class="mt-5 text-center">
                <button class="border-[1px] border-gray-600 text-[13px] font-bold w-[150px] rounded-md text-white bg-gray-600">Login</button>
            </div>
            <div class="mt-5 text-right text-[10px] text-blue-800 font-bold">
                <button>Create username</button>
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