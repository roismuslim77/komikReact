const initialState = {
    user: [],
    isLoading: false,
    isFinish: false,
    isError: false 
}

const auth = (state= initialState, action) =>{
    switch(action.type){
        case "AUTH_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "AUTH_FULFILLED":
            return {
                ...state,
                isError: false,
                isFinish: true,
                isLoading: false,
                user: action.payload
            }
        case "AUTH_CLEAR":
            return {
                ...state,
                user: []
            }
        case "AUTH_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default auth