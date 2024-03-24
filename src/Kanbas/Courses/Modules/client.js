import axios from "axios";

const COURSES_API = "https://kanbas-node-server-app-8t36.onrender.com/api/courses";
const MODULES_API = "https://kanbas-node-server-app-8t36.onrender.com/api/modules"

export const findModulesForCourse = async (courseId) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
}

export const createModule = async (courseId, module) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
    return response.data;
}
export const deleteModule = async (moduleId) => {
    const response = await axios.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
}
export const updateModule = async (module) => {
    const response = await axios.put(`${MODULES_API}/${module._id}`, module);
    return response.data;
}






export const createLesson = async (moduleId, lesson) => {
    const response = await axios.post(`${MODULES_API}/${moduleId}/lessons`, lesson);
    return response.data;
}
export const deleteLesson = async (moduleId, lessonId) => {
    const response = await axios.delete(`${MODULES_API}/${moduleId}/lessons/${lessonId}`);
    return response.data;
}
export const updateLesson = async (moduleId, lesson) => {
    const response = await axios.put(`${MODULES_API}/${moduleId}/lessons/${lesson._id}`, lesson);
    return response.data;
}