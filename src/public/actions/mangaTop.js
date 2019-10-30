import axios from 'axios'

// /top/anime/3/upcoming
export const getMangaTopFul = (data, list) => ({
    type: "GETMANGATOP_FULFILLED",
    payload: data,
    data: list
})

export const getMangaTopPending = () => ({
    type: "GETMANGATOP_PENDING",
})

export const getMangaTopRejected = () => ({
    type: "GETMANGATOP_REJECTED",
})

// action manga top more //
export const getMangaTopMoreFul = (data, list) => ({
    type: "GETMANGATOPMORE_FULFILLED",
    payload: data,
    data: list
})

export const getMangaTopMorePending = () => ({
    type: "GETMANGATOPMORE_PENDING",
})

export const getMangaTopMoreRejected = () => ({
    type: "GETMANGATOPMORE_REJECTED",
})