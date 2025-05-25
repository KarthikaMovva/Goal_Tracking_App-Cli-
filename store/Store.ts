import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from './GoalSlice';

const Store = configureStore({
    reducer : {
        goals : goalsReducer
    },
})

export type RootState = ReturnType<typeof Store.getState>
export type GoalDispatch = typeof Store.dispatch;
export default Store;