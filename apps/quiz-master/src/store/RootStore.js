import {createStore} from "redux";

import rootReducer from "../reducers/rootReducer";

var store = createStore(rootReducer);

export default store
