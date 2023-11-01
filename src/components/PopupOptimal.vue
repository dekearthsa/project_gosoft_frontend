<script setup>
    import {ref} from "vue";
    import { useStore } from 'vuex'

    const store = useStore();
    
    const haddleClosePopup = () => {
        store.state.isPopupNutrition = false
    }   
</script>

<template>
    <div class="pop-up-c">
        <div class="flex justify-end mr-5 mt-5" @click="haddleClosePopup">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
            </svg>
        </div>
        <div class="set-detail m-auto text-center mt-10">
            <div class="mb-5 font-bold">Optimal nutrition</div>
            <div class="set-desc">
                <div>
                    <div>Calories</div>
                    <div>Carbs</div>
                    <div>Fat</div>
                    <div>protein</div>
                </div>
                <div>
                    <div>{{store.state.isOptimalNutrition.calories.toFixed(1)}}</div>
                    <div>{{store.state.isOptimalNutrition.carbs.toFixed(1)}}</div>
                    <div>{{store.state.isOptimalNutrition.fat.toFixed(1)}}</div>
                    <div>{{store.state.isOptimalNutrition.protein.toFixed(1)}}</div>
                </div>
            </div>
            <div class="mt-5 font-bold">Product recommend</div>
            <div class="mt-5"> 
                <div class="c-card" v-for="(el, idx) in store.state.isProduct" :key="idx">
                    <div class="font-bold" >{{ el.brand }}</div>
                    <div class="name-desc">{{el.name}}</div>
                    <div class="font-bold text-left ml-4 mt-3">Nutrition</div>
                    <div class="c-nutr">
                        <div>
                            <div>Calories</div>
                            <div>Carbs g</div>
                            <div>Fat g</div>
                            <div>Protein g</div>
                            <div>Sodium mg</div>
                        </div>
                        <div>
                            <div>{{el.nutrition_summarize.calories.toFixed(1)}}</div>
                            <div>{{el.nutrition_summarize.carbs_g.toFixed(1)}}</div>
                            <div>{{el.nutrition_summarize.fat_g.toFixed(1)}}</div>
                            <div>{{el.nutrition_summarize.protein_g.toFixed(1)}}</div>
                            <div>{{el.nutrition_summarize.sodium_mg.toFixed(1)}}</div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<style scoped>


@media not all and (min-width: 768px){
    .pop-up-c{
        position: fixed;
        z-index: 999;
        height: 80vh;
        width: 90%;
        background-color: white;
        border: 1px solid gray;
        border-radius: 10px;
        top: 5%;
        left: 7%;
        overflow-y: scroll;
    }
    .set-desc{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .c-card{
        border: 1px solid grey;
        width: 280px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 20px;
        height: 300px;
        border-radius: 10px;
    }

    .c-nutr{
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow-y: scroll;
    }

}
</style>