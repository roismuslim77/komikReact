export const getMangaExpFul = (data, list) => ({
    type: "GETMANGAEXP_FULFILLED",
    payload: data,
    data: list
})

export const getMangaExpPending = () => ({
    type: "GETMANGAEXP_PENDING",
})

export const getMangaExpRejected = () => ({
    type: "GETMANGAEXP_REJECTED",
})