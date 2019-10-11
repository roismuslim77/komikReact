import { createStore } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistStore, persistCombineReducers } from 'redux-persist'
// import storage from 'redux-persist/es/storage'

import reducer from './reducers'

const config ={
    key: "primary",
    storage: AsyncStorage
}

let persistedReducer = persistCombineReducers(config, {
    reducer
})

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
// const store = createStore(
//     reducer
// )
// export default store
