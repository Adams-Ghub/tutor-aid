import { combineReducers } from 'redux';
import usersReducer from './users/usersSlice';
import userRequests from './requests/requestsSlice';
import userPerformances from './performances/performanceSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    requests:userRequests,
    performances:userPerformances
});

export default rootReducer;