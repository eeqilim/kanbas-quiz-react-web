import { useParams, Link, useNavigate } from "react-router-dom";
import "./index.css";

import { useState } from "react";

import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { resetQuizesState, resetQuizItemState, setQuizzes, setQuizItem } from "../../quizsReducer";



function QuizDetailsEditor() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const quizItem = useSelector((state: KanbasState) => state.quizsReducer.quiz)

 

    
    const handleOptionChange = (event: any) => {
        const { name, value, checked, type } = event.target;
        dispatch(setQuizItem({
            ...quizItem,
            [name]: type === 'checkbox' ? checked : value
        }));
    };



  return (
    <div className="mt-3 ms-3">

        <form>
            <div className="mb-3">
                <label htmlFor="quizTitle" className="from-label mb-1">Quiz Title:</label>
                <div className="col-sm-8">
                    <input type="text" value={quizItem.item_name} placeholder="Enter Quiz Name" className="form-control" id="quizTitle" onChange={(e) => dispatch(setQuizItem({ ...quizItem, item_name: e.target.value }))} />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="quizInstructions" className="from-label mb-1">Quiz Instructions:</label>
                <ReactQuill value={quizItem.instructions} onChange={ (value) => dispatch(setQuizItem({ ...quizItem, instructions: value }))} />
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
            <div className="mb-4 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="assignmentGroup" className="form-label mb-0">Assignment Group</label>
                </div>
                <div className="col-sm-4">
                    <select className="form-select" id="assignmentGroup">
                        <option>Quizzes</option>
                        <option>Exams</option>
                        <option>Assignments</option>
                        <option>Project</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end"></div>
                <div className="col-sm-9">
                    <div className="options-container">
                        <strong className="mb-2">Options</strong>

                        <div className="option-item">
                            <input 
                                type="checkbox" 
                                name="shuffle" 
                                id="shuffle" 
                                checked={quizItem.shuffle} 
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="shuffle">Shuffle Answers</label>
                        </div>

                        <div className="option-item">
                            <label>Time Limit</label>
                            <input 
                                type="number" 
                                name="time_limit" 
                                value={quizItem.time_limit} 
                                onChange={handleOptionChange}
                            /> Minutes
                        </div>
                        <div className="option-item">
                            <div className="checkbox-wrapper">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="multiple_attempts" 
                                        checked={quizItem.multiple_attempts}
                                        onChange={handleOptionChange}
                                    /> Allow Multiple Attempts
                                </label>
                            </div>
                        </div>
                
                        <div className="option-item">
                            <div className="checkbox-wrapper">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="show_ans" 
                                        checked={quizItem.show_ans} 
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
                                        name="one_question_at_a_time" 
                                        checked={quizItem.one_question_at_a_time} 
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
                            <label htmlFor="access_code">Access Code</label>
                            <input 
                                type="text" 
                                id="access_code" 
                                name="access_code"
                                placeholder="Enter access code" 
                                value={quizItem.access_code} 
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
                                    name="webcam_required" 
                                    checked={quizItem.webcam_required}
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
                                    name="lock_questions_after_answering" 
                                    checked={quizItem.lock_questions_after_answering}
                                    onChange={handleOptionChange}
                                /> 
                                Lock Questions After Answering
                            </label>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>


            <div className="mb-3 row align-items-start">
                <div className="col-sm-3 text-sm-end">
                    <p className="form-label">Assign</p>
                </div>
                <div className="col-sm-8 col-lg-6">
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
                                        <input 
                                            type="date" id="due_date" className="form-control" 
                                            value={quizItem.due_date} onChange={(e) => {dispatch(setQuizItem({...quizItem, due_date: e.target.value}))}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wd-courses-quizzes-edit-assign-card-input-container row">
                                <div className="col-6">
                                    <label htmlFor="availableFromDate" className="form-label fw-bold fs-6">Available From</label>
                                    <div className="input-group">
                                        <input 
                                            type="date" id="availableFromDate" className="form-control" 
                                            value={quizItem.available_from_date} onChange={(e) => dispatch(setQuizItem({ ...quizItem, available_from_date: e.target.value }))}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="availableUntilDate" className="form-label fw-bold fs-6">Until</label>
                                    <div className="input-group">
                                        <input 
                                            type="date" id="availableUntilDate" className="form-control" 
                                            value={quizItem.available_to_date} onChange={(e) => dispatch(setQuizItem({ ...quizItem, available_to_date: e.target.value }))}/>
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