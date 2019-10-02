export const lovedFul = (data) => ({
    type: "LOVED_FULFILLED",
    payload: data
})

export const lovedPending = () => ({
    type: "LOVED_PENDING",
})

export const lovedRejected = () => ({
    type: "LOVED_REJECTED",
})