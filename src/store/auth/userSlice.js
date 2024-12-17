import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    permissions: [],
    email_verified: false,
    ml_id: null,
    data: {},
}

export const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
        setUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer