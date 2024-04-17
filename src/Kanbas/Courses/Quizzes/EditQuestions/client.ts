import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const fetchQuestionsByQuizId = async (quizId?:string) => {
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

export const fetchQuestionById = async (qsId?:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/questions/${qsId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch question:", error);
    return null;
  }
};

export const createQuestion = async (qzId?:string, questionData?:any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/quizzes/${qzId}/questions`,
      questionData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create question:", error);
    return null;
  }
};

export const updateQuestion = async (questionData?:any) => {
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

export const deleteQuestion = async (qsId?:string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/questions/${qsId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete question:", error);
    return null;
  }
};

// export const createAnswer = async (qsId?:string, answerData?:any) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/api/questions/${qsId}/answers`,
//       answerData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to create answer:", error);
//     return null;
//   }
// };

// export const updateAnswer = async (answerData?:any) => {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/api/answers/${answerData._id}`,
//       answerData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to update answer:", error);
//     return null;
//   }
// };

// export const deleteAnswer = async (ansId?:string) => {
//   try {
//     const response = await axios.delete(`${API_BASE_URL}/api/answers/${ansId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to delete answer:", error);
//     return null;
//   }
// };