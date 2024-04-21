import { useParams, useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { FaEllipsisV } from "react-icons/fa";

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
    const questions = useSelector((state: KanbasState) => state.quizsReducer.questions);
    const quizzes = useSelector((state: KanbasState) => state.quizsReducer.quizes);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setQuestions(questions));
    }, [questions])


    const handleSave = async (publish: boolean) => {
        let newQuiz = quizItem;  

        if (publish) {
            newQuiz = { ...newQuiz, published: true }
            console.log(newQuiz)
        }

        let questionCount = 0;
        let totalPoints = 0;
        questions.forEach((question) => {
            questionCount++;
            totalPoints += question.points;
            console.log(typeof question.points)
        });

        newQuiz = { ...newQuiz, question_count: questionCount, points: totalPoints }
        
        if (action === "Add") {
            newQuiz = await handleAddQuiz(newQuiz);
        } else {
            await handleUpdateQuiz(newQuiz);
        }
        dispatch(resetQuizItemState());

        if (publish) {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        } else {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz._id}`);
        }
        
    };


    const handleAddQuiz = async (quizToBeAdded: quizItemType) => {
        console.log('Add Quiz Called')

        const newQuiz = await quizClient.addQuiz(courseId, quizToBeAdded);
        
        dispatch(setQuizzes([...quizzes, newQuiz]));

        console.log("New Quiz ID: " + newQuiz._id)

        questions.forEach((question) => {
            questionClient.createQuestion(newQuiz._id, question)
                .then((newQuestion) => {
                    dispatch(setQuestions([...questions, newQuestion]));
                })
        });
        return newQuiz;
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
        dispatch(setQuizItem(updatedQuiz));
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