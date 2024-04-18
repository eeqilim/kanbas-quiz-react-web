import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizsReducer from "../Courses/Quizzes/quizsReducer";


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
export type quizItemType = {
    _id: string;
    course: string;
    item_name: string;
    question_count: number;
    published: boolean;
    quiz_type: string;
    points: number;
    group: string;
    shuffle: boolean;
    time_limit: number;
    multiple_attempts: boolean;
    responses: string;
    show_ans: boolean;
    one_question_at_a_time: boolean;
    lockdown_browser: boolean;
    webcam_required: boolean;
    lock_questions_after_answering: boolean;
    due_date: string;
    assign_to: string;
    available_from_date: string;
    available_to_date: string;
    access_code: string;
    instructions: string;
};

export type questionItemType = {
    _id: string;
    title: string;
    points: number;
    questionText: string;
    possibleAnswers: string[];
    correctAnswer: string;
    questionType: string;
    quizId: string;
    previewAnswer: string;
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
    quizsReducer: {
        quizes: quizItemType[];
        quiz: quizItemType;
        questions: questionItemType[];
        question: questionItemType;
    };
}


const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        quizsReducer,
    },
})




export default store;