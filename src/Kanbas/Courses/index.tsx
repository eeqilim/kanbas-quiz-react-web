import { useParams, Navigate, Route, Routes, Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import Preview from "./Quizzes/Preview";
import QuizEditor from "./Quizzes/QuizEditor";
import Grades from "./Grades";

import "../../index.css";
import { courseType } from "../Dashboard";
import { useState, useEffect } from "react";

import axios from "axios";


import * as moduleClient from "./Modules/client"
import { setModules } from "./Modules/modulesReducer"
import { useDispatch } from "react-redux";
import MultipleChoiceQuestionEditor from "./Quizzes/EditQuestions";


function Courses() {
    const { "*": tab, courseId } = useParams();
    const dispatch = useDispatch();

    const BASE_API = process.env.REACT_APP_BASE_API_URL;
    const COURSES_API = `${BASE_API}/api/courses`;

    const defaultEmptyCourseType = { _id: "", number: "", name: "", startDate: "", endDate: "", term: "", image: "" }
    const [course, setCourse] = useState<courseType>(defaultEmptyCourseType);



    const findCourseById = async (courseID?: string) => {
        const response = await axios.get(`${COURSES_API}/${courseID}`);
        setCourse(response.data);
    }

    useEffect(() => {
        findCourseById(courseId);
        moduleClient.findModulesForCourse(courseId).then((modules) => dispatch(setModules(modules)));
    }, [courseId]);

    const renderBreadcrumb = (courseName: string, tab?: string) => {
        const tabList = tab ? tab.split("/") : [];

        if (tabList.length > 0 && tabList[0] === "Assignments" && tabList[1]?.[0] === "A" && tabList[2]?.[0] === "A") {
            return (
                <Breadcrumb className="pt-2 d-inline-block">
                    <Breadcrumb.Item linkAs="span">
                        <Link to={`/Kanbas/courses/${courseId}/Assignments`} className="red-links">
                            {courseName}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item linkAs="span">
                        <Link to={`/Kanbas/courses/${courseId}/Assignments`} className="red-links">
                            {tabList[0]}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{tabList[1]}</Breadcrumb.Item>
                </Breadcrumb>
            );
        }


        return (
            <Breadcrumb className="pt-2 d-inline-block">
                <Breadcrumb.Item linkAs="span">
                    <Link to={`/Kanbas/Courses/${courseId}`} className="red-links">
                        {courseName}
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{tabList[0]}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    return (
        <>
            {/* BreadCrumb Top Bar */}
            <div className="container-fluid flex-fill d-none d-md-flex m-0 justify-content-between pt-3 align-items-center align-middle">
                <div>
                    <button className="btn pt-0" type="button" data-bs-toggle="collapse" data-bs-target="#wd-courses-navigation-side-bar" aria-expanded="false" aria-controls="collapseWidthExample">
                        <HiMiniBars3 style={{ color: "red" }} />
                    </button>
                    {course && renderBreadcrumb(course.name, tab)}
                </div>
                <div className="float-end">
                    <a href="#" className="btn gray-buttons"><FaGraduationCap className="me-1 fs-5" />Student View</a>
                </div>
            </div>


            <hr className="d-none d-md-block m-0 mt-1 mb-1"></hr>

            <div className="d-flex">
                <div className="collapse collapse-horizontal show" id="wd-courses-navigation-side-bar">
                    <CourseNavigation />
                </div>



                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Piazza" element={<h1>Piazza</h1>} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:assignmentGroupId/:assignmentId" element={<AssignmentEditor />} />
                    <Route path="Assignments/Add" element={<AssignmentEditor />} />
                    <Route path="Quizzes/:quizId" element={<QuizDetails />} />
                    <Route path="Quizzes/:quizId/Preview" element={<Preview />} />
                    <Route path="Quizzes" element={<Quizzes />} />
                    <Route path="Quizzes/Editor/:action/*" element={<QuizEditor />} />
                    <Route path="Grades" element={<Grades />} />
                </Routes>



            </div>
        </>
    );


}

export default Courses;