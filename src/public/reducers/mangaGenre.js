const initialState = {
    manga: [],
    isLoading: false,
    isFinish: false,
    isError: false 
}

const manga = (state= initialState, action) =>{
    switch(action.type){
        case "GETMANGAGENRE_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GETMANGAGENRE_FULFILLED":
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
        case "GETMANGAGENRE_REJECTED":
            return {
                ...state,
                isError: true, isLoading: false
            }
        default:
        return state
    }
}

export default manga