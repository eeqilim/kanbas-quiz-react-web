import { useParams, Link, useNavigate } from "react-router-dom";
import "./index.css";

import { useEffect, useState } from "react";

import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { resetQuizesState, resetQuizItemState, setQuizzes, setQuizItem } from "../../quizsReducer";

import * as quizClient from "../../quizClient";


function QuizDetailsEditor() {

    // Base on how the URL is defined. If the action == "Add", then we are adding a new quiz.
    // When Editing an existing quiz, the action would be the quiz _id field. 
    const { courseId, action } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quizItem = useSelector((state: KanbasState) => state.quizsReducer.quiz)
    const quizzes = useSelector((state: KanbasState) => state.quizsReducer.quizes)


    // handles some change in the form but not all, Take close look at the onChange events of the fields
    const handleOptionChange = (event: any) => {
        const { name, value, checked, type } = event.target;
        dispatch(setQuizItem({
            ...quizItem,
            [name]: type === 'checkbox' ? checked : value
        }));
        console.log(quizItem)
    };


    const handleSave = async (publish: boolean) => {
        const newQuiz = { ...quizItem, published: publish };

        if (publish) {
            dispatch(setQuizItem(newQuiz));
            console.log('Publishing Quiz')
            console.log(quizItem)
        }

        if (action === "Add") {
            handleAddQuiz();
        } else {
            handleUpdateQuiz();
        }
        dispatch(resetQuizItemState());
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };



    const handleAddQuiz = () => {
        console.log('Add Quiz Called')
        
        quizClient.addQuiz(courseId, quizItem)
        .then((newQuiz) => {
            dispatch(setQuizzes([...quizzes, newQuiz]));
        })
    };

    const handleUpdateQuiz = () => {
        console.log('Update Quiz Called')

        quizClient.updateQuiz(quizItem._id, quizItem)
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
                    <select className="form-select" id="quizType" value={quizItem.quiz_type}
                    onChange={(e) => dispatch(setQuizItem({ ...quizItem, quiz_type: e.target.value })) }>
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                </div>
            </div>
            <div className="mb-4 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="assignmentGroup" className="form-label mb-0">Assignment Group</label>
                </div>
                <div className="col-sm-4">
                    <select className="form-select" id="assignmentGroup" value={quizItem.group}
                    onChange={(e) => dispatch(setQuizItem({ ...quizItem, group: e.target.value }))}>
                        <option value="QUIZZES">Quizzes</option>
                        <option value="EXAMS">Exams</option>
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="PROJECTS">Project</option>
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
                                    />Allow Multiple Attempts
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
                                            value={new Date(quizItem.due_date).toISOString().split("T")[0]} onChange={(e) => {dispatch(setQuizItem({...quizItem, due_date: e.target.value}))}}
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
                                            value={new Date(quizItem.available_from_date).toISOString().split("T")[0]} onChange={(e) => dispatch(setQuizItem({ ...quizItem, available_from_date: e.target.value }))}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="availableUntilDate" className="form-label fw-bold fs-6">Until</label>
                                    <div className="input-group">
                                        <input 
                                            type="date" id="availableUntilDate" className="form-control" 
                                            value={new Date(quizItem.available_to_date).toISOString().split("T")[0]} onChange={(e) => dispatch(setQuizItem({ ...quizItem, available_to_date: e.target.value }))}/>
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
            
        </form>
        





    </div>
  );
}

export default QuizDetailsEditor;