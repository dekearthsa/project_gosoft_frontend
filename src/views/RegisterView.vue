<script setup>
    import {ref} from "vue";
    import { useRouter } from 'vue-router'; 
    import axios from "axios";

    const router = useRouter();

    const isPage = ref(1);

    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const isSex = ref("");
    const isAge = ref();
    const isHight = ref();
    const isWeight = ref();
    const isExcercise = ref("");
    const isTarget = ref("");
    const isMeal = ref("");
    const optionCal = ref();
    const isError = ref("");

    const haddleNextPages = () => {
        const setUsername =  username.value.trim()
        if(password.value !== confirmPassword.value || setUsername === ""){
            isError.value = "password invalid or username missing."
        }else{
            isPage.value = isPage.value + 1
        }

    }

    const haddleBackPages = () => {
        isPage.value = isPage.value - 1
    }

    const haddleSubmitCreate = async () => {
        if(isSex.value !== "" || (isAge.value) || (isHight.value) || (isWeight.value) || isExcercise.value !== "" || isTarget.value !== "" || isMeal.value !== ""){
            isError.value("sex, age, hight, weight, excercise, target, meal cannot be empty")
        }else{
            const payload = {
                Username: username.value,
                Password: password.value,
                Sex: isSex.value,
                Age: isAge.value,
                Height: isHight.value,
                Weight: isWeight.value,
                Excercise: isExcercise.value,
                Target: isTarget.value,
                Meal: isMeal.value,
                TargetCal: optionCal.value? optionCal.value: "n/a"
            }
            try{
                await axios.post("https://service-register-login-nya5fszoda-as.a.run.app/api/register", payload)
                alert("Create profile success.")
                router.push({path:"/login"})
            }catch(err){
                alert(err)
            }
        }
    }




</script>

<template>
    <div class="mt-3 ml-3">
        <div class="title"></div>
        <div class="c-reigster-content">
            <div>
                <div v-if="isPage === 1">
                    <div class="c-age mt-10">
                        <div class="text-[14px]">
                            Username*
                        </div>
                        <div>
                            <input v-model="username" type="text" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
    
                    <div class="c-age mt-10">
                        <div class="text-[14px]">
                            Password*
                        </div>
                        <div>
                            <input v-model="password" type="password" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
    
                    <div class="c-age mt-10">
                        <div class="text-[14px]">
                            Confirm password*
                        </div>
                        <div>
                            <input v-model="confirmPassword" type="password" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
                    
                    <div>
                        <button @click="haddleNextPages" class="mt-10 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Next</button>
                    </div>

                    <div class="text-red-600 text-center text-[14px]">
                        {{ isError }}
                    </div>
                </div>
                
                <div v-if="isPage === 2">
                    <div class="c-sex">
                        <div class="text-[14px]">
                            Tell me about your physical sex*
                        </div>
                        <div>
                            <select v-model="isSex" class="w-[200px] border-[1px] border-gray-400 rounded-md">
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
                            <input v-model="isAge" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
    
                    <div class="c-hight mt-10">
                        <div class="text-[14px]">
                            Insert your Hight (cm)*
                        </div>
                        <div>
                            <input v-model="isHight" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
    
                    <div class="c-weight mt-10">
                        <div class="text-[14px]">
                            Insert your weight (kg)*
                        </div>
                        <div>
                            <input v-model="isWeight" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
    
                    <div class="c-excercise mt-10">
                        <div class="text-[14px]">
                            excercise intensity*
                        </div>
                        <div>
                            <select v-model="isExcercise" class="w-[200px] border-[1px] border-gray-400 rounded-md">
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
                            <select v-model="isTarget" class="w-[200px] border-[1px] border-gray-400 rounded-md">
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
                            <input v-model="isMeal" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>
    
                    <div class="c-weight mt-10">
                        <div class="text-[14px]">
                            OPTIONAL: If you have target calories, please specify
                        </div>
                        <div>
                            <input v-model="optionCal" type="number" class="w-[200px] border-[1px] border-gray-400 rounded-md"/>
                        </div>
                    </div>

                    <div class="flex">
                        <button @click="haddleBackPages" class="mt-10 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Back</button>
                        <button @click="haddleSubmitCreate"  class="mt-10 ml-5 w-[100px] border-[1px] border-gray-600 bg-gray-600 text-white rounded-md">Create</button>
                    </div>

                </div>

                

            </div>
        </div>
    </div>
</template>

<style>

</style>