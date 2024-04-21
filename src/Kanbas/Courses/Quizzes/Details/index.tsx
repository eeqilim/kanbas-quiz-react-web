import { Link, useParams } from "react-router-dom";
import { FaCircleCheck, FaPencil } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { PiProhibit } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as quizClient from "../quizClient";
import { setQuizItem } from "../quizsReducer";
import { useEffect } from "react";

function QuizDetails() {
    const { courseId, quizId } = useParams();
    const quiz = useSelector((state: KanbasState) => state.quizsReducer.quiz)
    const dispatch = useDispatch();
    const handleTogglePublishQuiz = async (quizId: string) => {
        const response = await quizClient.togglePublishQuiz(quizId);
        if (response.acknowledged) {
            const updatedQuiz = { ...quiz, published: !quiz.published };
            dispatch(setQuizItem(updatedQuiz));
            return updatedQuiz;
        }
    };
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

    useEffect(() => {
        quizClient.findQuiz(quizId).then((quiz) => {
            dispatch(setQuizItem(quiz));
        });
    }, [quizId]);


    return (
        <div className="container-fluid me-3 ms-3">
            <div className="row pt-3">
                <div className="col text-end">
                    <div className="fs-5 me-1 d-inline">
                        {quiz.published ? (
                            <button type="button" className="btn btn-success" onClick={() => handleTogglePublishQuiz(quiz._id)}>
                                <FaCircleCheck className="me-1" /> Published
                            </button>
                        ) : (
                            <button type="button" className="btn border bg-light me-1" onClick={() => handleTogglePublishQuiz(quiz._id)}>
                                <PiProhibit className="me-1" /> Unpublished
                            </button>
                        )}
                    </div>
                    <div className="d-inline">
                        <Link className="btn border bg-light me-1"
                            to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`}
                            onClick={() => { dispatch(setQuizItem(quiz)) }}>Preview</Link>
                    </div>
                    <div className="d-inline">
                        <Link className="btn border bg-light me-1"
                            to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quiz._id}/Details`}
                            onClick={() => { dispatch(setQuizItem(quiz)) }}>
                            <FaPencil style={{ transform: "scaleX(-1)" }} /> Edit
                        </Link>
                    </div>

                    <div className="d-inline">
                        <a className="btn border bg-light me-1"><FaEllipsisV /></a>
                    </div>
                </div>
            </div>
            <hr />
            <h1>{quiz?.item_name}</h1>
            <br />
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Quiz Type</b></div>
                <div className="col-sm-5">{quiz?.quiz_type}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Points</b></div>
                <div className="col-sm-5">{quiz?.points}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Assignment Group</b></div>
                <div className="col-sm-5">{quiz?.group}</div></div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Shuffle Answers</b></div>
                <div className="col-sm-5">{quiz?.shuffle ? "Yes" : "No"}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Time Limit</b></div>
                <div className="col-sm-5">{quiz?.time_limit} Minutes</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Multiple Attempts</b></div>
                <div className="col-sm-5">{quiz?.multiple_attempts ? "Yes" : "No"}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Show Correct Answers</b></div>
                <div className="col-sm-5">{quiz?.show_ans ? "Immediately" : "No"}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Access Code</b></div>
                <div className="col-sm-5">{quiz?.access_code}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>One Question at a Time</b></div>
                <div className="col-sm-5">{quiz?.one_question_at_a_time ? "Yes" : "No"}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Webcam Required</b></div>
                <div className="col-sm-5">{quiz?.webcam_required ? "Yes" : "No"}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Lock Questions After Answering</b></div>
                <div className="col-sm-5">{quiz?.lock_questions_after_answering ? "Yes" : "No"}</div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-3"><b>Due</b></div>
                <div className="col d-md-none">{quiz?.due_date && (
                    <>{formatDate(quiz.due_date)} at {formatTime(quiz.due_date)}</>)}
                    <br /><br />
                </div>
                <div className="col-md-2"><b>For</b></div>
                <div className="col d-md-none">{quiz?.assign_to}</div>
                <br /><br />
                <div className="col-md-4"><b>Available from</b></div>
                <div className="col d-md-none">{quiz?.due_date && (
                    <>{formatDate(quiz.available_from_date)} at {formatTime(quiz.available_from_date)}</>
                )}
                </div>
                <br /><br />
                <div className="col-md-3"><b>Until</b></div>
                <div className="col d-md-none">{quiz?.due_date && (
                    <>{formatDate(quiz.available_to_date)} at {formatTime(quiz.available_to_date)}</>
                )}
                </div>
                <br /><br />
                <hr className="d-none d-md-block" />
            </div>
            <div className="row">
                <div className="col-md-3 d-none d-md-block">
                    {quiz?.due_date && (
                        <>{formatDate(quiz.due_date)} at {formatTime(quiz.due_date)}</>
                    )}
                </div>
                <div className="col-md-2 d-none d-md-block">{quiz?.assign_to}</div>
                <div className="col-md-4 d-none d-md-block">{quiz?.due_date && (
                    <>{formatDate(quiz.available_from_date)} at {formatTime(quiz.available_from_date)}</>
                )}
                </div>
                <div className="col-md-3 d-none d-md-block">{quiz?.due_date && (
                    <>{formatDate(quiz.available_to_date)} at {formatTime(quiz.available_to_date)}</>
                )}
                </div>
                <br /><br />
                <hr className="d-none d-md-block" />
            </div>
        </div >
    );
}

export default QuizDetails;