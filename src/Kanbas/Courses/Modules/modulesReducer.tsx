import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";
const initialState = {
    modules: db.modules,
    module: {name: "", lesson: []},
}

const modulesSlice = createSlice({
    name: 'modules', 
    initialState,
    reducers: {
        addModule: (state, action) => {
           if (action.payload.name !== "") {
                state.modules = [
                    ...state.modules,
                    { ...action.payload, _id: `M${new Date().getTime().toString()}` }
                ];
                state.module = {name: "", lesson: []};
                console.log(state.modules);
           }
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
    },
});

export const { addModule, deleteModule, updateModule, setModule } = modulesSlice.actions;
export default modulesSlice.reducer;
