export const mangaDetailFul = (data) => ({
    type: "MANGADETAIL_FULFILLED",
    payload: data
})

export const mangaDetailPending = () => ({
    type: "MANGADETAIL_PENDING",
})

export const mangaDetailRejected = () => ({
    type: "MANGADETAIL_REJECTED",
})