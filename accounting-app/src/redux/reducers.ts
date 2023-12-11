import { REGISTER_SUCCESS, REGISTER_FAILURE } from "./actions";

const initialState = {
    registrationSuccess: false,
    error: "",
};

const registrationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, registrationSuccess: true, error: "" };
        case REGISTER_FAILURE:
            return { ...state, registrationSuccess: false, error: action.payload };
        default:
            return state;
    }
};

export default registrationReducer;
