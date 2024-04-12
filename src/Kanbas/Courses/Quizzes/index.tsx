import { FaCheckCircle, FaEllipsisV, FaPlus, FaSortDown } from "react-icons/fa";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { PiProhibit } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { quizzes } from "../../Database";

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
    const quizList = quizzes?.filter((quiz: any) => quiz.course === courseId) ?? [];
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
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
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/Add`} className="btn ms-1 red-button border border-dark" ><FaPlus />Quiz</Link>
                    </div>
                    <a className="btn ms-1 ps-1 pe-1 border border-dark bg-light"><FaEllipsisV /></a>
                </div>
            </div>
            <hr />
            <ul className="list-group wd-courses-quizzes">
                {quizList.map((quiz) => (
                    <li key={quiz._id}>
                        <div>
                            <FaEllipsisV className="me-3 ms-2" />
                            <a className="btn me-3 " data-bs-toggle="collapse" href={`#collapse-${quiz.category}-list`} role="button" aria-expanded="false" aria-controls={`collapse-${quiz.category}-list`}>
                                <FaSortDown style={{ verticalAlign: "top" }} />
                            </a>
                            <span className="fw-bold">{quiz.category}</span>
                        </div>
                        <div className="collapse show p-0" id={`collapse-${quiz.category}-list`}>
                            <ul className="listGroup">
                                {quiz.items?.map((item: any) => (
                                    <li key={item._id} className={`list-group-item 
                                    ${item.available !== "No" || item.published !== "No" ? 'wd-courses-quizzes-available-published' : ''}`}>
                                        <div className="d-flex align-items-center">
                                            <FaEllipsisV className="me-2 ms-2" />
                                            {item.available === "No" && item.published === "No" ? (
                                                <HiOutlineRocketLaunch className="me-3 ms-2 text-muted" />
                                            ) : (
                                                < HiOutlineRocketLaunch className="me-3 ms-2 text-success" />
                                            )}
                                            <div className="flex-fill">
                                                <div>
                                                    <Link className="fw-bold quiz-list-link text-dark" to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/${item._id}`}>
                                                        {item.item_name}
                                                    </Link>
                                                </div>
                                                <div className="wd-courses-quizzes-minor-text">
                                                    {item.available_from_date && new Date(item.available_from_date) > new Date() ? (
                                                        <span><b>Not available until </b>
                                                            {formatDate(item.available_from_date)} at {formatTime(item.available_from_date)} | </span>
                                                    ) : (
                                                        item.available_to_date && new Date(item.available_to_date) <= new Date() && (
                                                            <span><b>Closed</b> | </span>
                                                        ))}
                                                    <b>Due</b> {formatDate(item.due_date)} at {formatTime(item.due_date)} | {item.points} pts | {item.question_count} Questions
                                                </div>
                                            </div>
                                            <span className="float-end" style={{ display: "flex", alignItems: "center" }}>
                                                {item.available === "No" && item.published === "No" ? (
                                                    <PiProhibit />
                                                ) : (
                                                    < FaCheckCircle className="text-success" />
                                                )}
                                                <div className="dropleft d-inline">
                                                    <a className="btn wd-courses-quizzes-icon-link" type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></a>
                                                    <ul className="dropdown-menu">
                                                        <li><button className="dropdown-item">Delete</button></li>
                                                        <li><button className="dropdown-item">
                                                            <Link style={{ "textDecoration": "None", "color": "black" }}
                                                                to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/${item.item_id}`}>
                                                                Edit
                                                            </Link>
                                                        </button></li>
                                                        <li><button className="dropdown-item">Publish</button></li>
                                                    </ul>
                                                </div>
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
            <DeleteQuizModal
                show={showDeleteQuizModal}
                onClose={() => setShowDeleteQuizModal(false)}
                onDelete={() => { }} />
        </div>
    )
}

export default Quizzes;