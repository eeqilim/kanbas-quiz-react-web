import { FaCheckCircle, FaEllipsisV, FaPlus, FaSortDown } from "react-icons/fa";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { PiProhibit } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import * as quizClient from "./quizClient";
import { useDispatch, useSelector } from "react-redux";

import { resetQuizesState, resetQuizItemState, setQuizzes, setQuizItem, setQuestionItem, resetQuestionItemState, setQuestions, resetQuestionsState } from "./quizsReducer";
import { KanbasState } from "../../store";


function DeleteQuizModal({ show, onClose, onDelete }: { show: boolean, onClose: () => void, onDelete: () => void }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this quiz?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { onClose() }}>Cancel</Button>
                <Button variant="danger" onClick={() => { onDelete() }}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

function Quizzes() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch all the quizzes for the course and load it in to the reducer state "quizzes"
        // Refreshes everytime the courseId changes
        quizClient.findAllQuizzesForCourse(courseId).then((quizzes) => { dispatch(setQuizzes(quizzes)) });

    }, [courseId])


    const quizList = useSelector((state: KanbasState) => state.quizsReducer.quizes);
    const quizItem = useSelector((state: KanbasState) => state.quizsReducer.quiz);



    // Handle the toggle publish quiz action
    const handleTogglePublishQuiz = async (quizId: string) => {
        const response = await quizClient.togglePublishQuiz(quizId);
        if (response.acknowledged) {
            const newQuizzes = quizList.map((quiz) => {
                if (quiz._id === quizId) {
                    return { ...quiz, published: !quiz.published };
                }
                return quiz;
            });
            dispatch(setQuizzes(newQuizzes));
        }
    };

    const handleDeleteQuiz = async () => {
        const response = await quizClient.deleteQuiz(quizItem._id);
        if (response.acknowledged) {
            const newQuizzes = quizList.filter((quiz) => quiz._id !== quizItem._id);
            dispatch(setQuizzes(newQuizzes));
        } else {
            alert("Failed to delete the quiz");
            return;
        }
        setShowDeleteQuizModal(false);
        dispatch(resetQuizItemState());
    }

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC'
        });
    };
    const formatTime = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };
    const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);


    return (
        <div className="flex-fill me-2 ms-2 mt-2">
            <div className="d-flex flex-row justify-content-between ps-3 pe-3">
                <div className="w-25">
                    <input className="form-control" type="text" placeholder="Search for Quizzes" title="Search by Quiz name"></input>
                </div>
                <div>
                    <div className="d-inline">

                        <Link
                            to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/Add/Details`}
                            className="btn btn-danger"
                            onClick={() => { dispatch(resetQuizItemState()) }}
                        >
                            <FaPlus /> Quiz
                        </Link>

                    </div>
                    <a className="btn ms-1 ps-1 pe-1 border border-dark bg-light"><FaEllipsisV /></a>
                </div>
            </div>
            <hr />


            <ul className="list-group wd-courses-quizzes">
                <li className="list-group-item">
                    <div>
                        <a className="btn" data-bs-toggle="collapse" href="#collapse-Quiz-List">
                            <FaSortDown style={{ verticalAlign: "top" }} />
                        </a>

                        <span className="fw-bold">Assignment Quizzes</span>
                    </div>

                    <div className="p-0 collapse show" id="collapse-Quiz-List">
                        {quizList.length === 0 ? (
                            <div className="wd-courses-no-quizzes list-group-item text-muted ">
                                <br />
                                No quizzes available.
                                <br />
                                Click + Quiz button to add quiz.
                                <br /><br />
                            </div>
                        ) : (
                            <div>
                                {quizList.map((quiz) => (
                                    <li key={quiz._id} className={
                                        `list-group-item ${quiz.published ? 'wd-courses-quizzes-available-published' : ''}`
                                    }>

                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center" style={{ flexShrink: 0 }}>
                                                <HiOutlineRocketLaunch className={`me-3 ms-2 ${quiz.available_from_date && !quiz.published ? "text-muted" : "text-success"}`} />
                                            </div>
                                            <div className="flex-fill">
                                                <div>
                                                    <Link
                                                        className="fw-bold quizzes-list-link text-dark"
                                                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                                                        onClick={() => { dispatch(setQuizItem(quiz)) }}
                                                    >
                                                        {quiz.item_name}
                                                    </Link>
                                                </div>
                                                <div className="wd-courses-quizzes-minor-text">
                                                    {quiz.available_from_date && new Date(quiz.available_from_date) > new Date() ? (
                                                        <span><b>Not available until </b>
                                                            {formatDate(quiz.available_from_date)} at {formatTime(quiz.available_from_date)} | </span>
                                                    ) : (
                                                        quiz.available_to_date && new Date(quiz.available_to_date) <= new Date() ? (
                                                            <span><b>Closed</b> | </span>
                                                        ) : (
                                                            <span><b>Available until</b> {formatDate(quiz.available_to_date)} at {formatTime(quiz.available_to_date)} | </span>
                                                        )
                                                    )}
                                                    <b>Due</b> {formatDate(quiz.due_date)} at {formatTime(quiz.due_date)} | {quiz.points} pts | {quiz.question_count} Questions
                                                </div>
                                            </div>

                                            <span className="float-end" style={{ display: "flex", alignItems: "center" }}>
                                                {!quiz.published ? (
                                                    <PiProhibit onClick={() => handleTogglePublishQuiz(quiz._id)} />
                                                ) : (
                                                    <FaCheckCircle className="text-success" onClick={() => handleTogglePublishQuiz(quiz._id)} />
                                                )}
                                                <div className="dropleft d-inline">
                                                    <a className="btn wd-courses-quizzes-icon-link" type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item"
                                                                onClick={() => {
                                                                    setShowDeleteQuizModal(true);
                                                                    dispatch(setQuizItem(quiz));
                                                                }}>
                                                                Delete
                                                            </button>
                                                        </li>

                                                        <li>
                                                            <Link
                                                                className="dropdown-item"
                                                                style={{ "textDecoration": "None", "color": "black" }}
                                                                to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quiz._id}/Details`}
                                                                onClick={() => { dispatch(setQuizItem(quiz)) }}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <button className="dropdown-item" onClick={() => handleTogglePublishQuiz(quiz._id)}>
                                                                {quiz?.published ? "Unpublish" : "Publish"}
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>
                </li>
            </ul>

            <DeleteQuizModal
                show={showDeleteQuizModal}
                onClose={() => setShowDeleteQuizModal(false)}
                onDelete={handleDeleteQuiz} />

        </div >
    );
}

export default Quizzes;