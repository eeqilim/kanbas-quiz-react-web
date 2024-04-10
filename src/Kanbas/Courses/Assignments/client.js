import axios from "axios"

const BASE_API = process.env.REACT_APP_BASE_API_URL;

const COURSE_API = `${BASE_API}/api/courses`;
const ASSIGNMENT_API = `${BASE_API}/api/assignments`;



export const findAssignmentsForCourse = async (courseId) => {
    const response = await axios.get(`${COURSE_API}/${courseId}/assignments`);
    return response.data;
}


export const createAssignmentGroup = async (courseId, assignmentGroup) => {
    const response = await axios.post(`${COURSE_API}/${courseId}/assignments`, assignmentGroup);
    return response.data;
}

export const deleteAssignmentGroup = async (assignmentId) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
}
export const updateAssignmentGroup = async (assignmentGroup) => {
    const response = await axios.put(`${ASSIGNMENT_API}/${assignmentGroup._id}`, assignmentGroup);
    return response.data;
}





export const addAssignmentItem = async (assignmentId, assignmentItem) => {
    const response = await axios.post(`${ASSIGNMENT_API}/${assignmentId}/assignment`, assignmentItem);
    return response.data;
}

export const deleteAssignmentItem = async (assignmentGroupId, assignmentItemId) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentGroupId}/assignment/${assignmentItemId}`);
    return response.data;
}

export const updateAssignmentItem = async (assignmentGroupId, assignmentItem) => {
    const response = await axios.put(`${ASSIGNMENT_API}/${assignmentGroupId}/assignment/${assignmentItem._id}`, assignmentItem);
    console.log(response.data);
    return response.data;
}
