const initialState = {
    genre: [],
    isLoading: false,
    isFinish: false,
    isError: false 
}

const manga = (state= initialState, action) =>{
    switch(action.type){
        case "GETGENRE_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GETGENRE_FULFILLED":
            return {
                ...state,
                isError: false,
                isFinish: true,
                isLoading: false,
                genre: action.payload
            }  
        case "GETGENRE_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default manga