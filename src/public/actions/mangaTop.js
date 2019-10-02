import axios from 'axios'

// /top/anime/3/upcoming
export const getMangaTopFul = (data) => ({
    type: "GETMANGATOP_FULFILLED",
    payload: data
})

export const getMangaTopPending = () => ({
    type: "GETMANGATOP_PENDING",
})

export const getMangaTopRejected = () => ({
    type: "GETMANGATOP_REJECTED",
})