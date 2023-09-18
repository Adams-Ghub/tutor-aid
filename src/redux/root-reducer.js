import { combineReducers } from 'redux';
import usersReducer from './users/usersSlice';
import userRequests from './requests/requestsSlice'

const rootReducer = combineReducers({
    users: usersReducer,
    requests:userRequests
});

export default rootReducer;