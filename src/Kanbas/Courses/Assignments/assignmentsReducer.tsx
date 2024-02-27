import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
    assignments: db.assignments,
    assignmentGroup: {category: "", course: "0", total_grade_percentage: 0, items: []},
    assignment: {item_id: "", item_name: "", module: "", points: 0, due_date: "", due_time: "", available_from_date: "", available_to_date: ""},
}

const assignmentsSlice = createSlice({
    name: "assignments", 
    initialState,
    reducers: {
        addAssignmentGroup: (state, action) => {
            if (action.payload.assignmentGroupState.category === "" || action.payload.assignmentGroupState.total_grade_percentage === "") return;
            const { courseId, assignmentGroupState} = action.payload;
            if (assignmentGroupState.total_grade_percentage > 100 || assignmentGroupState.total_grade_percentage < 0) return;
            const newAssignmentGroup = { ...assignmentGroupState, course: courseId, _id: `A${new Date().getTime().toString()}` };
            state.assignments = [...state.assignments, newAssignmentGroup];
            state.assignmentGroup = {category: "", course: "0", total_grade_percentage: 0, items: []};
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
            if (action.payload.category === "" || action.payload.total_grade_percentage === "") return;
            else if (action.payload.total_grade_percentage > 100 || action.payload.total_grade_percentage < 0) return;
            state.assignments = state.assignments.map(
                (assignment) => {
                    if (assignment._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return assignment;
                    }
                }
            );
            state.assignmentGroup = {category: "", course: "0", total_grade_percentage: 0, items: []};
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

            console.log(assignment.item_id);
            
            
            // First remove the assignment from the state, since the group might change
            state.assignments = state.assignments.map(
                (assignmentGroup) => {
                    if (assignmentGroup._id === assignment.item_id.split(".")[0]) {
                        assignmentGroup.items = assignmentGroup.items.filter(
                            (item) => item.item_id !== assignment.item_id
                        );
                        console.log("Found and deleted")
                    }
                    return assignmentGroup; // Return the assignmentGroup after filtering the items
                }
            );
            // Then add the assignment to the state
            state.assignments = state.assignments.map((assignmentGroup) => {
                if (assignmentGroup._id === assignmentGroupId) {
                  assignmentGroup.items = [
                    ...assignmentGroup.items,
                    { ...assignment, item_id: `${assignmentGroup._id}.${new Date().getTime().toString()}` },
                  ];
                }
                return assignmentGroup;
              });
        }


    },
});
export const { addAssignmentGroup, setAssignmentGroupState, deleteAssignmentGroup, updateAssignmentGroup, setAssignmentState, deleteAssignment, resetAssignmentState, addAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;