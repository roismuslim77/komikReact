const initialState = {
    manga: [],
    isLoading: false,
    isFinish: false,
    isError: false 
}

const manga = (state= initialState, action) =>{
    switch(action.type){
        case "LOVED_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "LOVED_FULFILLED":
            return {
                ...state,
                isError: false,
                isFinish: true,
                isLoading: false,
                manga: action.payload
            }
        case "LOVED_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default manga