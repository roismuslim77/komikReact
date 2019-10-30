const initialState = {
    manga: [],
    manga_more: [],
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
            if(action.data === null){
                return {
                    ...state,
                    isError: false,
                    isFinish: true,
                    isLoading: false,
                    manga: [...state.manga, ...action.payload]
                }   
            }else{
                return {
                    ...state,
                    isError: false,
                    isFinish: true,
                    isLoading: false,
                    manga: action.payload
                }  
            }
        case "GETMANGATOP_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        case "GETMANGATOPMORE_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GETMANGATOPMORE_FULFILLED":
            if(action.data === null){
                return {
                    ...state,
                    isError: false,
                    isFinish: true,
                    isLoading: false,
                    manga_more: [...state.manga_more, ...action.payload]
                }   
            }else{
                return {
                    ...state,
                    isError: false,
                    isFinish: true,
                    isLoading: false,
                    manga_more: action.payload
                }  
            }
        case "GETMANGATOPMORE_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default manga