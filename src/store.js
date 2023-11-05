import {createStore} from 'vuex'

export default createStore({
    state:{
        isLoading: false,
        isPopup: false,
        isPopupNutrition: false,
        isCal: "",
        isCarb: "",
        isCholesterol: "",
        isFat: "",
        isProtien: "",
        isServing: "",
        isSodium: "",
        isOptimalNutrition: "",
        isProduct: [],
        loginContent: "login",
        publicURL: "https://storage.googleapis.com/optimization_bucket_nindo_1/",
        checkAuthURL: "https://service-register-login-nya5fszoda-as.a.run.app/api/check/auth"
    }
})

// gsutil -m acl set -R -a public-read gs://optimization_bucket_nindo_1/image_upload