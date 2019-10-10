export const getMangaChapterFul = (data, list) => ({
    type: "GETMANGACHAPTER_FULFILLED",
    payload: data,
    data: list
})

export const getMangaChapterPending = () => ({
    type: "GETMANGACHAPTER_PENDING",
})

export const getMangaChapterRejected = () => ({
    type: "GETMANGACHAPTER_REJECTED",
})