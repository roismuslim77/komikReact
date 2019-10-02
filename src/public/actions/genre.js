export const getGenreFul = (data) => ({
    type: "GETGENRE_FULFILLED",
    payload: data
})

export const getGenrePending = () => ({
    type: "GETGENRE_PENDING",
})

export const getGenreRejected = () => ({
    type: "GETGENRE_REJECTED",
})