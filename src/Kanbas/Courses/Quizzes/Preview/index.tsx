import { useParams } from "react-router";
import { quizzes } from "../../../Database";
import { CAlert } from "@coreui/react";
import { cilPencil, cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Answer, QuestionEditorState } from "../EditQuestions";
import QuestionsEditor from "../QuizEditor/QuestionsEditor";

function Perview(){
    const { quizId } = useParams();
    const quiz = quizzes.find((quiz) => quiz._id === quizId);
    // assuming that the one quiz has mulitple questions, array of questions
    // const questions = quiz?.questions ?? [];
    

    return (
        <div>
            <h1>Quiz Name{quiz?.item_name}</h1>
            <CAlert color="danger" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>This is a preview of the published version of the quiz</div>
            </CAlert>
            <h6>Started: {quiz?.available_from_date}</h6>

            <h2>Quiz Instructions</h2>
            <hr />
            <div>
                <div className="card">
                    <div className="card-header" style={{fontWeight: "bold"}}>
                        Question 1
                    </div>
                    <div className="card-body">
                        {/* <h5 className="card-title">Special title</h5> */}
                        <p className="card-text">An HTML label element can be associated with an HTML input element by settingtheir id attributes to the same value.</p>
                        <p className="card-text">The resulting effect is that when you click on the label text, the input elementreceives focus as if you had click on the input element itself.</p>
                        <hr />
                        
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                False
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-3 ms-3 text-end">
                    <a href="#" role="button" className="btn btn-light">Next</a>
                </div>

                <div className="card mt-3 ms-3" style={{width: "98%"}}>
                    <div className="card-body text-end">
                        {/* TODO: to displays list of questions for this quiz. List is initially empty */}
                        Quiz saved at {new Date().toLocaleTimeString()}
                        <a href="#" role="button" className="btn btn-light">Submit Quiz</a>
                    </div>
                </div>

                <div className="card mt-3 ms-3" style={{width: "98%"}}>
                    <a href="#" role="button" className="btn btn-light" style={{ textAlign: "left"}}>
                        <FontAwesomeIcon icon={faPencilAlt} className="me-2"/>Keep Editing This Quiz
                    </a>
                </div>

                <div>
                    <h4 className="mt-3 ms-3">Questions</h4>
                    <ul className="list-group list-group-flush mt-4 ms-4">
                        {/* {quiz.map((question:any) => (
                            <li key={question.id} className="list-group-item">{question.title}</li>
                        ))} */}
                        <li className="list-group-item"><FontAwesomeIcon icon={faQuestion} className="me-1"/>Question 1</li>
                        <li className="list-group-item"><FontAwesomeIcon icon={faQuestion} className="me-1"/>Question 2</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Perview;