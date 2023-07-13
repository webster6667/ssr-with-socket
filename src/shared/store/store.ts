import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {profileReducer, usersReducer} from "./reducers"

const rootReducer = combineReducers({
  profileReducer,
  usersReducer
})

export const createStore = (preloadedState?) => {
  return configureStore({reducer: rootReducer, preloadedState})
}

export type RootState = ReturnType<typeof rootReducer>