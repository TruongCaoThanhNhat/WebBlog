import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authenticationReducer from '../../redux/slice/authenticationSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        authentication: authenticationReducer,
    },
});

export default store;