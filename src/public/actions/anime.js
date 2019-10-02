import axios from 'axios'

const base_url = 'https://api.jikan.moe/v3'

// /top/anime/3/upcoming
export const getAnimeFul = (data) => ({
    type: "GETANIME_FULFILLED",
    payload: data
})

export const getAnimePending = (data) => ({
    type: "GETANIME_PENDING",
    payload: data
})

export const getAnimeRejected = (data) => ({
    type: "GETANIME_REJECTED",
    payload: data
})