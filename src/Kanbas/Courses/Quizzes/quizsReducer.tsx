import { createSlice } from "@reduxjs/toolkit";

const emptyQuiz = {
    _id: "", 
    course: "",
    item_name: "Unnamed Quiz",
    question_count: 0,
    published: false,
    quiz_type: "Graded Quiz",
    points: 0,
    group: "QUIZZES",
    shuffle: false,
    time_limit: 20,
    multiple_attempts: false,
    responses: "Always",
    show_ans: true,
    one_question_at_a_time: true,
    lockdown_browser: false,
    webcam_required: false,
    lock_questions_after_answering: false,
    due_date: new Date().toISOString(),
    assign_to: "Everyone",
    available_from_date: new Date().toISOString(),
    available_to_date: new Date().toISOString(),
    access_code: "",
    instructions: "",
    }

const emptyQuestion = {
    title: "",
    points: 0,
    questionText: "",
    possibleAnswers: [] as string[],
    correctAnswer: "",
    questionType:"M",
    quizId: "",
}




const initialState = {
    quizes: [],
    quiz: emptyQuiz,

    questions: [],
    question: emptyQuestion,
}


const quizesSlice = createSlice( {
    name: "quizes",
    initialState,
    reducers: {

        // reset the quizzes list state
        resetQuizesState: (state) => {
            state.quizes = [];
        },

        // reset the single quiz state
        resetQuizItemState: (state) => {
            state.quiz = emptyQuiz;
        },

        // Set the quizzes list 
        setQuizzes: (state, action) => {
            state.quizes = action.payload;
        },

        // set the single quiz state
        setQuizItem: (state, action) => {
            state.quiz = action.payload;
        },


        // reset the questions list state
        resetQuestionsState: (state) => {
            state.questions = [];
        },

        // reset the single question state
        resetQuestionItemState: (state) => {
            state.question = emptyQuestion;
        },

        // set the questions list
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },

        // set the single question state
        setQuestionItem: (state, action) => {
            state.question = action.payload;
        },


    }
})

export const { resetQuizesState, resetQuizItemState, setQuizzes, setQuizItem, resetQuestionsState, resetQuestionItemState, setQuestionItem, setQuestions } = quizesSlice.actions;
export default quizesSlice.reducer;