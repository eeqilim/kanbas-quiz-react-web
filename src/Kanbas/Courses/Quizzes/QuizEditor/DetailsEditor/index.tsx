import { useNavigate, useParams, Link} from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import "./index.css";

import { useState } from "react";
import { quizzes } from "../../../../Database";

function QuizDetailsEditor() {
    const { courseId } = useParams();

    const [quizOptions, setQuizOptions] = useState({
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: false,
        accessCode: '',
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: Date, 
        availableDate: Date, 
        untilDate: Date, 
      })

    const today = new Date().toISOString().split('T')[0];
    const handleOptionChange = (event: any) => {
        const { name, value, checked, type } = event.target;
        setQuizOptions({
            ...quizOptions,
            [name]: type === 'checkbox' ? checked : value
        });
    };

  return (
    <div className="mt-3 ms-3">

        <form>
            <div className="mb-3">
                <label htmlFor="quizTitle" className="from-label mb-1">Quiz Title:</label>
                <div className="col-sm-8">
                    <input type="text" value="Unnamed Quiz" className="form-control" id="quizTitle" />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="quizInstructions" className="from-label mb-1">Quiz Instructions:</label>
                <textarea className="form-control" id="quizInstructions" rows={3}></textarea>
            </div>

            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="quizType" className="form-label mb-0">Quiz Type</label>
                </div>
                <div className="col-sm-4">
                    <select className="form-select" id="quizType">
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="assignmentGroup" className="form-label mb-0">Assignment Group</label>
                </div>
                <div className="col-sm-4">
                    <select className="form-select" id="assignmentGroup">
                        <option>ToBeImplementedForDynamicRendering</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end"></div>
                <div className="col-sm-9">
                <div className="options-container">
                    <strong>Options</strong>
                    <div className="option-item">
                    <input 
                        type="checkbox" 
                        name="shuffleAnswers" 
                        id="shuffleAnswers" 
                        checked={quizOptions.shuffleAnswers} 
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="shuffleAnswers">Shuffle Answers</label>
                    </div>

                    <div className="option-item">
                    <label>Time Limit</label>
                        <input 
                            type="number" 
                            name="timeLimit" 
                            value={quizOptions.timeLimit} 
                            onChange={handleOptionChange}
                        /> Minutes
                    </div>
                    <div className="option-item">
                    <div className="checkbox-wrapper">
                        <label>
                        <input 
                            type="checkbox" 
                            name="multiple_attempts" 
                            checked={quizOptions.multipleAttempts}
                            onChange={handleOptionChange}
                            /> 
                            Allow Multiple Attempts
                            </label>
                        </div>
                    </div>
                
                    <div className="option-item">
                        <div className="checkbox-wrapper">
                        <label>
                            <input 
                                type="checkbox" 
                                name="showCorrectAnswers" 
                                checked={quizOptions.showCorrectAnswers} 
                                onChange={handleOptionChange}
                            /> Let Students See Their Quiz Responses (Incorrect Questions Will Be Marked in Student Feedback)
                        </label>
                        </div>
                    </div>


                        <div className="option-item">
                        <div className="checkbox-wrapper">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="oneQuestionAtATime" 
                                    checked={quizOptions.oneQuestionAtATime} 
                                    onChange={handleOptionChange}
                                /> Show one question at a time
                            </label>
                            </div>
                        </div>
                        </div>
                    <br/>

                    <div className="options-container">
                        <strong>Quiz Restrictions</strong>
                    </div>
                    <div className="option-item">
                    <div className="checkbox-wrapper">
                            <label htmlFor="accessCode">Access Code</label>
                            <input 
                                type="text" 
                                id="accessCode" 
                                name="accessCode"
                                placeholder="Enter access code" 
                                value={quizOptions.accessCode} 
                                onChange={handleOptionChange}
                                className="form-control"
                            />
                            </div>
                        </div>

                        <div className="option-item">
                        <div className="checkbox-wrapper">
                        <label>
                        <input 
                            type="checkbox" 
                            name="multiple_attempts" 
                            checked={quizOptions.webcamRequired}
                            onChange={handleOptionChange}
                            /> 
                            Webcam Required
                            </label>
                        </div>
                    </div>

                    <div className="option-item">
                        <div className="checkbox-wrapper">
                        <label>
                        <input 
                            type="checkbox" 
                            name="multiple_attempts" 
                            checked={quizOptions.lockQuestionsAfterAnswering}
                            onChange={handleOptionChange}
                            /> 
                            Lock Questions After Answering
                            </label>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>


            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <p className="form-label">Assign</p>
                </div>
                <div className="col-sm-9">
                    <div className="card">
                        <div className="card-body">
                            <div className="wd-courses-quizzes-edit-assign-card-input-container">
                                <label htmlFor="assign-to" className="form-label fw-bold fs-5">Assign to</label>
                                <input type="text" id="assign-to" className="form-control" aria-describedby="passwordHelpBlock" placeholder="Everyone"/>
                            </div>
                            <div className="wd-courses-quizzes-edit-assign-card-input-container row">
                                <div className="col-6">
                                    <label htmlFor="due_date" className="form-label fw-bold fs-6">Due Date</label>
                                    <div className="input-group">
                                        <input type="date" id="due_date" className="form-control" aria-describedby="passwordHelpBlock" value={today}/>
                                    </div>
                                </div>
                            </div>
                            <div className="wd-courses-quizzes-edit-assign-card-input-container row">
                                <div className="col-6">
                                    <label htmlFor="availableFromDate" className="form-label fw-bold fs-6">Available From</label>
                                    <div className="input-group">
                                        <input type="date" id="availableFromDate" className="form-control" aria-describedby="passwordHelpBlock" value={today}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="availableUntilDate" className="form-label fw-bold fs-6">Until</label>
                                    <div className="input-group">
                                        <input type="date" id="availableUntilDate" className="form-control" aria-describedby="passwordHelpBlock" value={today}/>
                                    </div>
                                </div>
                            </div>
                            <div className="wd-courses-s-edit-assign-card-input-container row">
                                <div className="add-container">
                                    <button className="add-button">+ Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



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
                            <Link to={ `/Kanbas/Courses/${courseId}/Quizzes` } className="btn wd-courses-quizzes-edit-cancel-button me-1 border-light">Save & Publish</Link>
                            <button className="btn btn-danger">Save</button>
                        </div>
                    </div>
                </div>
            </div>   
            
        </form>
        





    </div>
  );
}

export default QuizDetailsEditor;