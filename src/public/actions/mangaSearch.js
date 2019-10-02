import axios from 'axios'

// /top/anime/3/upcoming
export const getMangaSearchFul = (data) => ({
    type: "GETMANGASEARCH_FULFILLED",
    payload: data
})

export const getMangaSearchPending = () => ({
    type: "GETMANGASEARCH_PENDING",
})

export const getMangaSearchRejected = () => ({
    type: "GETMANGASEARCH_REJECTED",
})