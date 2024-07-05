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
            state.user = action.payload;

            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('isLoggedIn', 'true')
        },
        signOutSuccess: (state) => {
            console.log("logged out triggered")
            state.isLoggedIn = false;
            state.user = null;

            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
        },
    },
});

export const { signInSuccess, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;