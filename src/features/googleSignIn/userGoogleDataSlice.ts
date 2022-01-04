import { createSlice } from '@reduxjs/toolkit'

interface userGoogleData {
    items: {
        name: string,
        email: string,
        photo: string,
        givenName: string,
        familyName: string,
        id: string
    }
}

const initialState: userGoogleData = {
    items: {
        name: '',
        email: '',
        photo: '',
        givenName: '',
        familyName: '',
        id: ''
    }
}


export const userGoogleDataSlice = createSlice({
    name: 'userGoogleData',
    initialState,
    reducers: {
        login(state, action) {
            state.items = action.payload
        },
        signOut(state) {
            state.items = initialState.items
        },
    },
})


export const { login, signOut } = userGoogleDataSlice.actions;

export default userGoogleDataSlice.reducer;