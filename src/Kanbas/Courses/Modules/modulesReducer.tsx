import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    modules: [{_id: "", name: "", course: "", lessons: []}],
    module: {name: "", lessons: []},
}

const modulesSlice = createSlice({
    name: 'modules', 
    initialState,
    reducers: {

        setModules: (state, action) => {
            state.modules = action.payload;
        },


        addModule: (state, action) => {
            state.modules = [...state.modules, action.payload]
            state.module = {name: "", lessons: []};
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module) => module._id !== action.payload
            );
            console.log(state.modules)
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map(
                (module) => {
                    if (module._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return module;
                    }
                }
            )
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
        resetModuleState: (state) => {
            state.module = {name: "", lessons: []};
        },
    },
});

export const { setModules, addModule, deleteModule, updateModule, setModule, resetModuleState } = modulesSlice.actions;
export default modulesSlice.reducer;
