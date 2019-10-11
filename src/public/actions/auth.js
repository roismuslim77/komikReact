export const authFul = (data) => ({
    type: "AUTH_FULFILLED",
    payload: data
})

export const authPending = () => ({
    type: "AUTH_PENDING",
})

export const authRejected = () => ({
    type: "AUTH_REJECTED",
})

export const authClear = () =>({
    type: "AUTH_CLEAR"
})