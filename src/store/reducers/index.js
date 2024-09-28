import { combineReducers } from "redux";
import counter from './counter.reducer';

const allReducers = combineReducers({
    counter
});

export default allReducers;
