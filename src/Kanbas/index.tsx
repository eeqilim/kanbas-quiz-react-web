import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import TopHiddenKanbasNavigation from "./Navigation/TopHiddenKanbasNavigation";
import db from "./Database";
import { useState } from "react";

import store from "./store";
import { Provider } from "react-redux";

function Kanbas() {
    const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState({
        _id: "",
        name: "",
        number: "", 
        startDate: "",
        endDate: "",
        term: "",
        image: ""
    });

    const getTerm = (startDate: string) => {
        const date = new Date(startDate);
        const month = date.getMonth();
        if (month >= 0 && month <= 3) return `Spring ${date.getFullYear().toString()}`;
        else if (month >= 4 && month <= 7) return `Summer ${date.getFullYear().toString()}`;
        else if (month >= 8 && month <= 11) return `Fall ${date.getFullYear().toString()}`;
        else return "Unknown Term"
    }
    const addNewCourse = () => {
        const newCourse = { ...course, _id: new Date().getTime().toString(), term: getTerm(course.startDate) };
        setCourses([...courses, { ...course, ...newCourse }]);
    };

    const deleteCourse = (courseId: string) => {
        const newCourses = courses.filter((course) => course._id !== courseId);
        setCourses(newCourses);
    };

    const updateCourse = () => {
        course.term = getTerm(course.startDate);
        setCourses(courses.map((c) => c._id === course._id ? course : c));
    };

    return(
        <Provider store={store}>
            <>
                <div className="d-none d-md-block">
                    <KanbasNavigation />
                </div>

                <div className="d-flex">
                    {/* Blank Spacer For Left Float Nav */}
                    <div className="d-none d-md-block" style={{ flex: "0 0 84px" }}></div>
        
                    <div className="flex-fill">

                        <TopHiddenKanbasNavigation />

                        <Routes>
                            <Route path="/" element={<Navigate to="Dashboard" />} />
                            <Route path="Account" element={<h1>Account</h1>} />
                            <Route path="Dashboard" element={<Dashboard courses={courses} course={course} setCourse={setCourse} setCourses={setCourses} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} />} />
                            <Route path="Courses/:courseId/*" element={<Courses courses={courses}/>} />
                        </Routes>
                    </div>
                </div>
            </>
        </Provider>
    )
}
export default Kanbas;