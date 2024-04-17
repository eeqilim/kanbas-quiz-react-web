import { useParams, useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { FaEllipsisV } from "react-icons/fa";

import { quizzes } from "../../../Database";
import QuizDetails from "../Details";
import QuizDetailsEditor from "./DetailsEditor";
import QuizQuestions from "./QuestionsEditor";

import "./index.css";
import QuestionsEditor from "./QuestionsEditor";
import MultipleChoiceQuestionEditor from "../EditQuestions";
import EditTrueFalseQuestion from "../EditQuestions/EditTrueFalseQuestion";
import EditFillInBlanksQuestion from "../EditQuestions/EditFillInBlanksQuestion";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState, quizItemType } from "../../../store";

import { useEffect } from "react";
import * as quizClient from "../quizClient";
import * as questionClient from "../questionClient";
import { resetQuizesState, resetQuizItemState, setQuizzes, setQuizItem, setQuestionItem, setQuestions, resetQuestionItemState, resetQuestionsState } from "../quizsReducer";

function QuizEditor() {
    // Base on how the URL is defined. If the action == "Add", then we are adding a new quiz.
    // When Editing an existing quiz, the action would be the quiz _id field. 
    const { courseId, action } = useParams();


    const { pathname } = useLocation();
    const quizItem = useSelector((state: KanbasState) => state.quizsReducer.quiz);


    const dispatch = useDispatch();
    const navigate = useNavigate();




    const handleSave = async (publish: boolean) => {
        let newQuiz = quizItem;  

        console.log(newQuiz);

        if (publish) {
            newQuiz = { ...newQuiz, published: true }
            console.log(newQuiz)
        }

        if (action === "Add") {
            handleAddQuiz(newQuiz);
        } else {
            handleUpdateQuiz(newQuiz);
        }
        dispatch(resetQuizItemState());
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };
    const handleAddQuiz = (quizToBeAdded: quizItemType) => {
        console.log('Add Quiz Called')
        
        quizClient.addQuiz(courseId, quizToBeAdded)
        .then((newQuiz) => {
            dispatch(setQuizzes([...quizzes, newQuiz]));
        })
    };
    const handleUpdateQuiz = (updatedQuiz: quizItemType) => {
        console.log('Update Quiz Called')

        quizClient.updateQuiz(quizItem._id, updatedQuiz)
        .then((status) => {
            dispatch(setQuizzes(quizzes.map((quiz) => {
                if (quiz._id === quizItem._id) {
                    return quizItem;
                } else {
                    return quiz;
                }
            })));   
        })
    };  


    useEffect(() => {
        if (action !== "Add") {
            questionClient.fetchQuestionsByQuizId(action).then((questions) => {
                dispatch(setQuestions(questions));
            })
        } else {
            dispatch(resetQuestionsState());
        }
        
    }, [action]);

    return (
        <div className="flex-fill me-2 ms-2 mt-2">

            {/* Top Level Points, Publish statis and other top level settings */}
            <div className="d-flex justify-content-end mb-0">
                <p className="fs-4 fw-bold me-2 mb-0">Points {quizItem.points}</p>
                {quizItem.published ? 
                    <p className="fs-4 fw-bold text-success mb-0"><CiCircleCheck className="pb-1" />Published</p>
                    : <p className="fs-4 fw-bold text-secondary mb-0"><CiCircleRemove className="pb-1" />Unpublished</p>
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
                <Route path="/Questions" element={<QuestionsEditor />} />
                <Route path="/Questions/addmultiple" element={<MultipleChoiceQuestionEditor/>} />
                <Route path="/Questions/addtruefalse" element={<EditTrueFalseQuestion/>} />
                <Route path="/Questions/addfillintheblank" element={<EditFillInBlanksQuestion/>} />
            </Routes>

            <hr/>
            <div className="row pb-3">
                <div className="col">
                    <div className="form-check d-flex">
                        <div className="flex-fill ms-2">
                            <input className="form-check-input" type="checkbox" value="" id="notify-user-content-change"></input>
                            <label className="form-check-label" htmlFor="notify-user-content-change">
                                Notify users that this content has changed
                            </label>
                        </div>
                        <div className="me-2">
                            <Link to={ `/Kanbas/Courses/${courseId}/Quizzes` } className="btn wd-courses-quizzes-edit-cancel-button me-1 border-light">Cancel</Link>
                            
                            <button className="btn wd-courses-quizzes-edit-cancel-button me-1 border-light" 
                            onClick={() => {
                                handleSave(true);
                            }}>
                                Save & Publish
                            </button>
                            
                            <button className="btn btn-danger" onClick={() => handleSave(false)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
        
    )
}




export default QuizEditor;