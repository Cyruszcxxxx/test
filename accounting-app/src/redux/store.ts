import { createStore, combineReducers } from "redux";
import registrationReducer from "./reducers";

const rootReducer = combineReducers({
    registration: registrationReducer,
});

const store = createStore(rootReducer);

export default store;
