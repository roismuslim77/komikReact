import axios from 'axios'

// /top/anime/3/upcoming
export const getMangaRecentFul = (data, string) => ({
    type: "GETMANGARECENT_FULFILLED",
    payload: data,
    data: string
})

export const getMangaRecentPending = () => ({
    type: "GETMANGARECENT_PENDING",
})

export const getMangaRecentRejected = () => ({
    type: "GETMANGARECENT_REJECTED",
})

// action manga rencent more
export const getMangaRecentMoreFul = (data, string) => ({
    type: "GETMANGARECENTMORE_FULFILLED",
    payload: data,
    data: string
})

export const getMangaRecentMorePending = () => ({
    type: "GETMANGARECENTMORE_PENDING",
})

export const getMangaRecentMoreRejected = () => ({
    type: "GETMANGARECENTMORE_REJECTED",
})

