<script setup>
    import {ref} from "vue";
    import { useStore } from 'vuex'

    const store = useStore();

    const haddleClosePopup = () => {
        store.state.isPopup = false
    }


</script>


<template>
    <div class="pop-up">
        <div class="flex justify-end mr-5 mt-5" @click="haddleClosePopup">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
            </svg>
        </div>
        <div class="set-detail m-auto text-center mt-20">

            <div>
                <div>calories</div>
                <div>fiber</div>
                <div>Sugar</div>
                <div>total carbohydrate</div>
                <div>cholesterol</div>
                <div>saturated fat</div>
                <div>total fat</div>
                <div>trans fat</div>
                <div>protien</div>
                <div>sodium</div>
            </div>
            <div>
                <div>{{ store.state.isCal.calories }}</div>
                <div>{{ store.state.isCarb.dietary_fiber }}</div>
                <div>{{ store.state.isCarb.sugar }}</div>
                <div>{{ store.state.isCarb.total_carbohydrate }}</div>
                <div>{{ store.state.isCholesterol.total_cholesterol }}</div>
                <div>{{ store.state.isFat.saturated_fat }}</div>
                <div>{{ store.state.isFat.total_fat }}</div>
                <div>{{ store.state.isFat.trans_fat }}</div>
                <div>{{ store.state.isProtien.total_protien }}</div>
                <div>{{ store.state.isSodium.total_sodium }}</div>
            </div> 
        </div>
        <div class="">

        </div>
    </div>
</template>


<style scoped>
.pop-up{
    position: fixed;
    z-index: 999;
    background-color: rgb(255, 255, 255);
    border: 1px solid gray;
    border-radius: 10px;
    height: 90vh;
    width: 89%;
    top:5%;
    left: 7%
}

.set-detail{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>