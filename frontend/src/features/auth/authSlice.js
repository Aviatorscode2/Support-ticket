/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';


// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
};

// register new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log(user);
});


// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
   await  authService.logout();
});




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        }).addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;