import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AuthDataPayloadI} from './types'
import {setCookie, getCookie} from "@modules/cookie"

export const profileInitialState = {
    username: getCookie('username') || '',
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: profileInitialState,
    reducers: {
        setAuthData(state, action: PayloadAction<AuthDataPayloadI>) {
            const {username} = action.payload
            setCookie('username', username)

            return {username}
        },
    },
})

export const profileActions = profileSlice.actions
export const profileReducer = profileSlice.reducer
