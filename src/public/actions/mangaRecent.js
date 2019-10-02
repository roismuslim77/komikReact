import axios from 'axios'

// /top/anime/3/upcoming
export const getMangaRecentFul = (data) => ({
    type: "GETMANGARECENT_FULFILLED",
    payload: data
})

export const getMangaRecentPending = () => ({
    type: "GETMANGARECENT_PENDING",
})

export const getMangaRecentRejected = () => ({
    type: "GETMANGARECENT_REJECTED",
})