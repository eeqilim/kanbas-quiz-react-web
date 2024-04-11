import courses from './courses.json';
import modules from './modules.json';
import assignments from './assignments.json';
import quizzes from './quizzes.json';
import users from './users.json';
import enrollments from './enrollments.json';
import grades from './grades.json';



const db = {
    courses: courses,
    modules: modules,
    assignments: assignments,
    users: users,
    enrollments: enrollments,
    grades: grades
};

export default db;
export { quizzes };