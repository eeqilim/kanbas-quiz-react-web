import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const fetchQuestionsByQuizId = async (quizId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/quizzes/${quizId}/questions`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
};

export const fetchQuestionById = async (qsId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/questions/${qsId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch question:", error);
    return null;
  }
};

export const createQuestion = async (qzId, questionData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/quizzes/${qzId}/questions`,
      questionData
    );
    console.log("response.data", response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to create question:", error);
    return null;
  }
};

export const updateQuestion = async (questionData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/questions/${questionData._id}`,
      questionData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update question:", error);
    return null;
  }
};

export const deleteQuestion = async (qsId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/questions/${qsId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete question:", error);
    return null;
  }
};