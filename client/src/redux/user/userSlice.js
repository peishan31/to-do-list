import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        signOutSuccess: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
    },
});

export const { signInSuccess, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;