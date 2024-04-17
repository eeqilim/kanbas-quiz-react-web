import axios from "axios";

const BASE_API = process.env.REACT_APP_BASE_API_URL;

const QUIZZES_API = `${BASE_API}/api/quizzes`;
const COURSE_API = `${BASE_API}/api/courses`;


export const findAllQuizzesForCourse = async (courseId) => {
    const response = await axios.get(`${COURSE_API}/${courseId}/quizzes`);
    return response.data;
}


export const findQuiz = async (quizId) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}


export const deleteQuiz = async (quizId) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
}


export const togglePublishQuiz = async (quizId) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/publish`);
    return response.data;
}


export const updateQuiz = async (quizId, quiz) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}`, quiz);
    return response.data;
}

export const addQuiz = async (courseId, quiz) => {
    const response = await axios.post(`${QUIZZES_API}/${courseId}`, quiz);
    return response.data;
}