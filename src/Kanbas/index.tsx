import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import TopHiddenKanbasNavigation from "./Navigation/TopHiddenKanbasNavigation";
import { useState, useEffect } from "react";
import Account from "./Account";

import store from "./store";
import { Provider } from "react-redux";


import axios from "axios";


function Kanbas() {
    const [courses, setCourses] = useState<{_id: string, number: string, name: string, startDate: string, endDate: string, term: string, image: string}[]>([]);

    const BASE_API = process.env.REACT_APP_BASE_API_URL;
    const COURSES_API = `${BASE_API}/api/courses`;

    const fetchAllCourses = async () => {
        const response = await axios.get(COURSES_API);
        setCourses(response.data);
    };

    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([ ...courses, response.data]);
    };

    const deleteCourse = async (courseId: string) => {
        const response = await axios.delete(`${COURSES_API}/${courseId}`);
        const newCourses = courses.filter((course) => course._id !== courseId);
        setCourses(newCourses);
    };

    const updateCourse = async () => {
        course.term = getTerm(course.startDate);
        const response = await axios.put(`${COURSES_API}/${course._id}`, course);
        setCourses(courses.map((c) => c._id === course._id ? course: c));
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);


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
    

    
    const resetCourse = () => {
        setCourse({
            _id: "",
            name: "",
            number: "", 
            startDate: "",
            endDate: "",
            term: "",
            image: ""
        });
    }

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
                            <Route path="/Account/*" element={<Account />} />
                            <Route path="/Dashboard" element={<Dashboard courses={courses} course={course} setCourse={setCourse} setCourses={setCourses} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} resetCourse={resetCourse}/>} />
                            <Route path="/Courses/:courseId/*" element={<Courses />} />
                            
                        </Routes>
                    </div>
                </div>
            </>
        </Provider>
    )
}
export default Kanbas;