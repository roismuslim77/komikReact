export const authFul = (data, value) => ({
    type: "AUTH_FULFILLED",
    payload: data,
    from: value
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