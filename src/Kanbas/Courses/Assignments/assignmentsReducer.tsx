import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
    assignments: [{_id: "", category: "", course: "0", total_grade_percentage: 0, items: [{item_id: "", item_name: "", module: "", points: 0, due_date: "", due_time: "", available_from_date: "", available_to_date: ""}]}],
    assignmentGroup: {category: "", course: "0", total_grade_percentage: 0, items: []},
    assignment: {item_id: "", item_name: "", module: "", points: 0, due_date: "", due_time: "", available_from_date: "", available_to_date: ""},
}

const assignmentsSlice = createSlice({
    name: "assignments", 
    initialState,
    reducers: {

        resetAssignmentGroupState: (state) => {
            state.assignmentGroup = {category: "", course: "0", total_grade_percentage: 0, items: []};
        },


        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        


        addAssignmentGroup: (state, action) => {
            state.assignments = [...state.assignments, action.payload];
        },



        setAssignmentGroupState: (state, action) => {
            state.assignmentGroup = action.payload;
        },
        deleteAssignmentGroup: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignmentGroup: (state, action) => {
            state.assignments = state.assignments.map(
                (assignment) => {
                    if (assignment._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return assignment;
                    }
                }
            );
        },



        deleteAssignment: (state, action) => {
            const {assignmentGroupId, assignmentId} = action.payload;
            state.assignments = state.assignments.map(
                (assignmentGroup) => {
                    if (assignmentGroup._id === assignmentGroupId) {
                        assignmentGroup.items = assignmentGroup.items.filter(
                            (item) => item.item_id !== assignmentId
                        );
                    }
                    return assignmentGroup;
                }
            )
            state.assignment = {item_id: "", item_name: "", module: "", points: 0, due_date: "", due_time: "", available_from_date: "", available_to_date: ""};
            state.assignmentGroup = {category: "", course: "0", total_grade_percentage: 0, items: []};
        },

        setAssignmentState: (state, action) => {
            state.assignment = action.payload;
        },
        
        resetAssignmentState: (state) => {
            state.assignment = {item_id: "", item_name: "", module: "", points: 0, due_date: "", due_time: "", available_from_date: "", available_to_date: ""};
        },

        addAssignment: (state, action) => {
            const {assignmentGroupId, assignment} = action.payload;
            state.assignments = state.assignments.map(
                (assignmentGroup) => {
                    if (assignmentGroup._id === assignmentGroupId) {
                        assignmentGroup.items = [
                            ...assignmentGroup.items,
                            { ...assignment, item_id: `${assignmentGroup._id}.${new Date().getTime().toString()}` }
                        ];
                    }
                    return assignmentGroup;
                }
            )
        },
        
        updateAssignment: (state, action) => {
            const {assignmentGroupId, assignment} = action.payload;
            const assignmentGroup = state.assignments.find((assignmentGroup) => assignmentGroup._id === assignmentGroupId);
            assignmentGroup?.items.map((item) => {
                if (item.item_id === assignment.item_id) {
                    item = assignment;
                }
                return item;
            });
        }


    },
});
export const { setAssignments, addAssignmentGroup, setAssignmentGroupState, deleteAssignmentGroup, updateAssignmentGroup, setAssignmentState, deleteAssignment, resetAssignmentState, addAssignment, updateAssignment, resetAssignmentGroupState } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;