import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../components/DashBoards/UserDashBoard/Slices/types";

export interface AuthState {
    isAuthenticated: boolean;
    user: Users | null;
    token: string | null;

}
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;   
export default authSlice.reducer;