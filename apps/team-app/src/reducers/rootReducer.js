import { combineReducers } from "redux";

import DataReducer from "./DataReducer";

const rootReducer = combineReducers({
    test: DataReducer,
});

export default rootReducer;
