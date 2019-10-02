export const getMangaGenreFul = (data, list) => ({
    type: "GETMANGAGENRE_FULFILLED",
    payload: data,
    data: list
})

export const getMangaGenrePending = () => ({
    type: "GETMANGAGENRE_PENDING",
})

export const getMangaGenreRejected = () => ({
    type: "GETMANGAGENRE_REJECTED",
})