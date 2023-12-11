export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
});

export const registerFailure = (error: string) => ({
    type: REGISTER_FAILURE,
    payload: error,
});
