import { createSlice } from '@reduxjs/toolkit'

export const usersInitialState = {
    users: [],
    isLoading: false,
    isError: false
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        userFetching(state, action) {
            const {isLoading, isError = false, users = []} = action.payload

            return {...state, isLoading, isError, users}
        }
    },
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
