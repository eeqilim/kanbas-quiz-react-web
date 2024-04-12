import { useParams } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { quizzes } from "../../../Database";

function QuizDetails() {
    const { quizId } = useParams();
    const quiz = quizzes.find((quiz) => quiz._id === quizId);
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
    return (
        <div className="container-fluid me-3 ms-3">
            <div className="row pt-3">
                <div className="col text-end">
                    <div className="text-success fs-5 me-1 d-inline">
                        <button type="button" className="btn btn-success">
                            <FaCircleCheck className="me-1" /> Published
                        </button>
                    </div>
                    <div className="d-inline">
                        <a className="btn border bg-light me-1">Perview</a>
                    </div>
                    <div className="d-inline">
                        <a className="btn border bg-light me-1"><FaPencil style={{ transform: "scaleX(-1)" }} /> Edit</a>
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
                <div className="col-sm-5">{quiz?.item_name}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Points</b></div>
                <div className="col-sm-5">{quiz?.points}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Assignment Group</b></div>
                <div className="col-sm-5">{quiz?.group}</div></div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Shuffle Answer</b></div>
                <div className="col-sm-5">{quiz?.shuffle}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Time Limit</b></div>
                <div className="col-sm-5">{quiz?.time_limit}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Multiple Attempts</b></div>
                <div className="col-sm-5">{quiz?.multiple_attempts}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>View Responses</b></div>
                <div className="col-sm-5">{quiz?.reponses}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Show Correct Answer</b></div>
                <div className="col-sm-5">{quiz?.show_ans}</div></div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>One Question at a Time</b></div>
                <div className="col-sm-5">{quiz?.one_q_per_time}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Require Respondus LockDown Browser</b></div>
                <div className="col-sm-5">{quiz?.lockdown_browser}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Required to View Quiz Results</b></div>
                <div className="col-sm-5">{quiz?.view_results}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Webcam Required</b></div>
                <div className="col-sm-5">{quiz?.webcam}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-5 text-sm-end mb-2 mb-sm-0"><b>Lock Questions After Answering</b></div>
                <div className="col-sm-5">{quiz?.lock_questions}</div>
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
        </div>
    );
}

export default QuizDetails;