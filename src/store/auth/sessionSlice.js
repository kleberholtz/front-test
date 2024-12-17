import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
	name: 'auth/session',
	initialState: {
        token: '',
        expires_at: '',
        signedIn: false,
    },
	reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload.token
            state.expires_at = action.payload.expires_at
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
            state.expires_at = ''
        },
        setAccessToken: (state, action) =>  {
            state.token = action.payload
        },
        setAccessTokenExpiresAt: (state, action) => {
            state.expires_at = action.payload
        }
	},
})

export const { onSignInSuccess, onSignOutSuccess, setAccessToken, setAccessTokenExpiresAt } = sessionSlice.actions

export default sessionSlice.reducer