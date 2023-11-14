<script setup>
import {ref }from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'; 

const store = useStore();
const router = useRouter();
const publicPath = ref(import.meta.env.BASE_URL)
const isPopUp = ref(false);
const negativeWord = ref("");
// const arrayOfNegative = ref([]);

    const haddleClosePopup = () => {
        isPopUp.value = false
    }
    const haddleOpenPopUp = () => {
        isPopUp.value = true
    }

    const haddleAddingNegative = () => {
        const setNegativeWord = negativeWord.value.trim()
        if(setNegativeWord !== ""){
            store.state.arrayOfNegative.push(setNegativeWord)
            negativeWord.value = ""
        }

        // console.log(store.state.arrayOfNegative.value)
    }

    const haddleRemoveNegative = () => {
        store.state.arrayOfNegative.pop()
    }

</script>

<template>
    <div class="c-popup" v-if="isPopUp === true">
        <div class="c-meaning font-bold text-[19px] mt-10 ml-5 mr-5">
            A filter ingredients is a way that allows the user to specify what he doesn't want to see, without any extra input. It is a parameter that tells the model what not to include in the generated model.
        </div>
        <div>
            <img class="mt-10" :src="`${publicPath}pngwing.png`" alt="Logo"/>
        </div>
        <div class="text-center">
            <button @click="haddleClosePopup" class="mt-10 text-[20px] font-bold bg-zinc-700 w-[100px] h-[35px] text-white rounded-md">Close</button>
        </div>
    </div>
    <div class="set-scolling">
        
        <div class="c-title">
            <div class="pt-4">
                <div class="mb-2">Filter</div>
                <div>Negative prompt</div>
            </div>
        </div>
        <div class="c-prompt mt-10">
            <div class="mt-5 text-center">
                    <input v-model="negativeWord" class="c-input-ing border-b-[1px] border-neutral-500"  list="ingre"  id="ingres" placeholder="Filter ingredient">
                    <datalist id="ingre">
                        <option v-for="(el, idx) in store.state.propmt" :key="idx" :value="el">{{el}}</option>
                    </datalist>
                    <div class="mt-7 flex justify-center">
                        <button  @click="haddleRemoveNegative" class="mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C20303" class="w-8 h-8">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button  @click="haddleAddingNegative" class="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#034BC2" class="w-8 h-8">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <div class="mt-8 mb-10 font-bold">Your filter ingredients</div>
                    <div class="c-desc-filter">
                        <div class="c-set-img">
                            <div class="w-[80%] ml-[10%]">
                                A filter ingredients is a way that allows the user to specify what he doesn't want to see, without any extra input. It is a parameter that tells the model what not to include in the generated model.
                            </div>
                            <img class="mt-10" :src="`${publicPath}pngwing.png`" alt="Logo"/>
                        </div>
                        <div class="c-inger-desc mt-5">
                            <button @click="haddleOpenPopUp">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7C7C7C" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div class="c-desc mt-3">
                            <div class="ml-1" v-for="(el, idx) in store.state.arrayOfNegative" :key="idx">
                                <div class="font-bold mt-3">{{ idx + 1 }}. {{el}}</div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
        </div>
    </div>
</template>

<style scoped>

.set-scolling{
    overflow-y: scroll;
}
.c-title{
    width: 90%;
    margin: auto;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: white;
    height: 90px;
    background: rgb(39, 45, 56);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}


.c-desc-filter{
    display: flex;
    justify-content: end;
    
}


@media (min-width: 768px){
    .c-input-ing{
        width: 90%;
    }
    

    .c-set-img{
        width: 50%;
        position: relative;
        margin-top: 70px;
    }

    .c-desc{
        border-top-left-radius: 100px;
        background-color: rgba(237, 237, 237, 0.5);
        width: 55%;
        height: 63vh;
    }

    .c-meaning{
        display: none;
    }
    .c-inger-desc{
        display: none
    }
}

@media not all and (min-width: 768px){
    .c-set-img{
        display: none;
    }
    .c-desc{
        border-top-left-radius: 100px;
        background-color: rgba(237, 237, 237, 0.7);
        width: 75%;
        height: 63vh;
    }

    .c-popup{
        position: fixed;
        height: 80vh;
        width: 95%;
        top: 10%;
        left: 4%;
        background: rgba(255, 255, 255, 0.8);
    }


}
</style>