<script setup>
    import {ref, onMounted} from "vue";
    import { useRouter } from 'vue-router'; 
    import VueCookies from 'vue-cookies'
    import axios from "axios";

    // https://service-register-login-nya5fszoda-as.a.run.app/api/update/profile // 
    const router = useRouter();

    const weight = ref();
    const age = ref();
    const excercise = ref();
    const height =ref();
    const meal = ref();
    const sex = ref();
    const target = ref();
    const targetCal = ref();
    const errorText = ref("");

    const haddleBack = () => {
        router.push({path: "/update"})
    }

    const haddleUpdate = async () => {
        if(weight.value !== undefined && age.value !== undefined && excercise.value !== undefined && height.value !== undefined && meal.value !== undefined && sex.value !== undefined && target !== undefined && targetCal !== undefined){
            try{
                const isUser = await VueCookies.get("setDataGosoft")
                const payload = {
                    Username: isUser.Username,
                    Sex: sex.value,
                    Age: age.value,
                    Height: height.value,
                    Weight: weight.value,
                    Excercise: excercise.value,
                    Target: target.value,
                    Meal: meal.value,
                    TargetCal: targetCal.value
                }
                const result = await axios.post("https://service-register-login-nya5fszoda-as.a.run.app/api/update/profile", payload)
                if(result.data.status === "ok"){
                    alert("update sucess.");
                    location.reload();
                }else{
                    alert("update fail.")
                }
            }catch(err){
                alert(err)
            }
            
        }else{
            errorText.value = "weight, age, excercise, height, meal, sex, target, target cal, cannot be empty"
        }
    }


    const getCookies = () => {
            try{
                const profile = VueCookies.get("setDataGosoft")
                weight.value = profile.Weight
                age.value = profile.age
                excercise.value = profile.excercise
                height.value = profile.height
                meal.value = profile.meal
                sex.value = profile.sex
                target.value = profile.target
                targetCal.value = profile.targetCal

                if(!profile.token){
                    router.push({path: "/login"})
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
        <div class="c-sex">
            <div class="text-[14px]">
                Tell me about your physical sex*
            </div>
            <div>
                <select v-model="sex" class="w-[200px] border-[1px] border-gray-400 rounded-md">
                    <option value="unknown">unknown</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
        </div>

        <div class="c-age mt-10">
            <div class="text-[14px]">
                Insert your age*
            </div>
            <div>
                <input v-model="age" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>

        <div class="c-hight mt-10">
            <div class="text-[14px]">
                Insert your Hight (cm)*
            </div>
            <div>
                <input v-model="height" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>

        <div class="c-weight mt-10">
            <div class="text-[14px]">
                Insert your weight (kg)*
            </div>
            <div>
                <input v-model="weight" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>

        <div class="c-excercise mt-10">
            <div class="text-[14px]">
                excercise intensity*
            </div>
            <div>
                <select v-model="excercise" class="w-[200px] border-[1px] border-gray-400 rounded-md">
                    <option value="unknown">unknown</option>
                    <option value="Less">Less</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Extreme">Extreme</option>
                </select>
            </div>
        </div>

        <div class="c-excercise mt-10">
            <div class="text-[14px]">
                Target*
            </div>
            <div>
                <select v-model="target" class="w-[200px] border-[1px] border-gray-400 rounded-md">
                    <option value="unknown">unknown</option>
                    <option value="BodyBuilder">BodyBuilder</option>
                    <option value="Moderate">Moderate</option>
                    <option value="LossWeight">Loss Weight</option>
                </select>
            </div>
        </div>

        <div class="c-weight mt-10">
            <div class="text-[14px]">
                Meal per day*
            </div>
            <div>
                <input v-model="meal" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>

        <div class="c-weight mt-10">
            <div class="text-[14px]">
                OPTIONAL: If you have target calories, please specify
            </div>
            <div>
                <input v-model="targetCal" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
            </div>
        </div>

        <div class="flex">
            <button @click="haddleBack" class="mt-10 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Back</button>
            <button @click="haddleUpdate"   class="mt-10 ml-5 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Submit</button>
        </div>
        <div class="m-auto text-center text-red-700 font-bold">
            {{ errorText }}
        </div>
    </div>
</template>

<style scoped>

</style>