import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";


export type moduleLessonType = {
    _id: string;
    name: string;
    url: string;
    indent: number;
    module: string;
};
export type moduleType = {
    _id: string;
    name: string;
    course: string;
    lessons: moduleLessonType[];
};
export type assignmentItemType = {
    _id: string;
    item_name: string;
    module: string;
    points: number;
    due_date: string;
    due_time: string;
    available_from_date: string;
    available_to_date: string;
    assignment_group_id: string;
};
export type assignmentType = {
    _id: string;
    category: string;
    course: string;
    total_grade_percentage: number;
    items: assignmentItemType[];
};


export interface KanbasState {
    modulesReducer: {
        modules: moduleType[];
        module: moduleType;
    };
    assignmentsReducer: {
        assignments: assignmentType[];
        assignmentGroup: assignmentType;
        assignment: assignmentItemType;
    };
}


const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
    },
})




export default store;