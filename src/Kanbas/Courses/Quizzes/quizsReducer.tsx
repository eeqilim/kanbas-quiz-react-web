import { createSlice } from "@reduxjs/toolkit";

const emptyQuizItem = {
    _id: "", 
    item_name: "", 
    question_count: "", 
    available: "",
    published: "",
    quiz_type: "",
    points: 0,
    group: "",
    shuffle: "",
    time_limit: "",
    multiple_attempts: "",
    response: "",
    show_ans: "",
    one_q_per_time: "",
    lockdown_browser: "",
    view_results: "",
    webcam: "",
    lock_questions: "",
    due_date: "",
    available_from_date: "",
    available_to_date: "",
    }
const emptyQuizesObj = {
    _id: "", 
    course: "", 
    category: "", 
    total_grade_percentage: 0, 
    items: [emptyQuizItem]
}

const initialState = {
    quizes: [emptyQuizesObj],
    quizGroup: emptyQuizesObj,
    quizItem: emptyQuizItem,
}


const quizesSlice = createSlice( {
    name: "quizes",
    initialState,
    reducers: {
        resetQuizesState: (state) => {
            state.quizes = [emptyQuizesObj];
        },
        resetQuizGroupState: (state) => {
            state.quizGroup = emptyQuizesObj;
        },
        resetQuizItemState: (state) => {
            state.quizItem = emptyQuizItem;
        },
    }
})

export const { } = quizesSlice.actions;
export default quizesSlice.reducer;