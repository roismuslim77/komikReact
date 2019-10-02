const initialState = {
    anime: [],
    isLoading: false,
    isFinish: false,
    isError: false 
}

const anime = (state= initialState, action) =>{
    switch(action.type){
        case "GETANIME_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GETANIME_FULFILLED":
            return {
                ...state,
                isError: false,
                isFinish: true,
                isLoading: false,
                anime: [...state.anime, ...action.payload]
            }
        case "GETANIME_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default anime