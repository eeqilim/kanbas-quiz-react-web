import { useParams, useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { FaEllipsisV } from "react-icons/fa";

import { quizzes } from "../../../Database";
import QuizDetails from "../Details";
import QuizDetailsEditor from "./DetailsEditor";

import "./index.css";

function QuizEditor() {
    const { courseId, quizGroupId, action } = useParams();
    const { pathname } = useLocation();
    const quizItem = quizzes[0];

    return (
        <div className="flex-fill me-2 ms-2 mt-2">

            {/* Top Level Points, Publish statis and other top level settings */}
            <div className="d-flex justify-content-end mb-0">
                <p className="fs-3 me-2 mb-0">Points {quizItem.points}</p>
                {quizItem.published ? 
                    <p className="fs-3 text-success mb-0"><CiCircleCheck className="pb-1" />Published</p>
                    : <p className="fs-3 text-secondary mb-0"><CiCircleRemove className="pb-1" />Unpublished</p>
                }
                <a className="btn ms-4 ps-1 pe-1 border border-dark bg-light"><FaEllipsisV className="ms-1 me-1" /></a>
            </div>

            <hr/>
           

            <nav className="nav nav-tabs mt-2">
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${action}/Details`} className={`nav-link red-nav-link ${pathname.includes("Details") ? "active" : ""}`}>Details</Link>
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${action}/Questions`} className={`nav-link red-nav-link ${pathname.includes("Questions") ? "active" : ""}`}>Questions</Link>
            </nav>
            <Routes>
                <Route path="/" element={<QuizDetailsEditor />} />
                <Route path="/Details"  element={<QuizDetailsEditor />} />
            </Routes>
        </div>
    )
}




export default QuizEditor;