import {createStore} from 'vuex'

export default createStore({
    state:{
        isLoading: false,
        isPopup: false,
        isCal: "",
        isCarb: "",
        isCholesterol: "",
        isFat: "",
        isProtien: "",
        isServing: "",
        isSodium: "",
    }
})