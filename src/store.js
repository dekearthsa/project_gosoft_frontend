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
        publicURL: "https://storage.googleapis.com/optimization_bucket_nindo_1/"
    }
})

// gsutil -m acl set -R -a public-read gs://optimization_bucket_nindo_1/image_upload