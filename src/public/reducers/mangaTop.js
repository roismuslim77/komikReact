const initialState = {
    manga: [],
    isLoading: false,
    isFinish: false,
    isError: false 
}

const manga = (state= initialState, action) =>{
    switch(action.type){
        case "GETMANGATOP_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GETMANGATOP_FULFILLED":
            return {
                ...state,
                isError: false,
                isFinish: true,
                isLoading: false,
                manga: [...state.manga, ...action.payload]
            }
        case "GETMANGATOP_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default manga