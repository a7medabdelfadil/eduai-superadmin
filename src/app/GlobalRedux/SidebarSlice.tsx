import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface sideBarState {
    isSideBarOpen: boolean
}

const initialState: sideBarState = {
    isSideBarOpen: true, 
};

export const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSideBar(state) {
            state.isSideBarOpen = true; 
        },
        closeSideBar(state) {
            state.isSideBarOpen = false; 
        },
    },
});

export const { openSideBar, closeSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
