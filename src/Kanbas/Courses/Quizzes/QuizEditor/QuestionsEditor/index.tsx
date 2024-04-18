import { FaPlus, FaSortDown, FaEllipsisV } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Preview from "../../Preview"; //test1


import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { useEffect, useState } from "react";

import Collapse from "react-bootstrap/Collapse";
import { resetQuestionItemState, setQuestionItem, setQuestions, setQuestionToDefaultMultipleChoice, setQuestionToDefaultFillInTheBlank, setQuestionToDefaultTrueFalse } from "../../quizsReducer";
import ReactQuill from "react-quill";

import { useParams } from "react-router-dom";
import * as questionClient from "../../questionClient"; 

import "./index.css";
import { Button, Modal } from "react-bootstrap";

import MultipleChoiceAnswerEditor from "./MultipleChoiceAnswerEditor";
import TrueAndFalseQuestionEditor from "./TrueAndFalseQuestionEditor";
import FillInTheBlankAnswerEditor from "./FillInTheBlankAnswerEditor";

interface Props {
  quizType: string;
}
function QuizTypeTextRender({ quizType }: Props) {
  switch (quizType) {
    case "M":
      return <p>Enter your question and multiple answers, then select the one correct answer.</p>
    case "T":
      return <p>Enter your question text, then select it True or False is the correcr answer.</p>
    case "B":
      return <><p>Enter your question text, then defind all possible correct answers for the blank.</p><p>Students will see the question followed by a small text box to type their answer.</p></>
    default:
      return null;
  }
}


function DeleteQuizModal({ show, onClose, onDelete }: { show: boolean, onClose: () => void, onDelete: () => void }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this question?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { onClose() }}>Cancel</Button>
        <Button variant="danger" onClick={() => { onDelete() }}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}



function QuestionsEditor() {

  const dispatch = useDispatch();
  const { action } = useParams();

  const questionsState = useSelector((state: KanbasState) => state.quizsReducer.questions);
  const questionItemState = useSelector((state: KanbasState) => state.quizsReducer.question);


  const [addQuestionFormOpen, setAddQuestionFormOpen] = useState(false);

  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);


  const handleUpdateOrSaveQuestion = () => {
    if (action === "Add") {
      console.log("action === Add in handleUpdateOrSaveQuestion")
      if (questionItemState._id === "") {
        console.log("add question in handleUpdateOrSaveQuestion")
        const newQuestion = { ...questionItemState, _id: questionsState.length };
        dispatch(setQuestions([...questionsState, newQuestion]));
      } else {
        console.log("update question in handleUpdateOrSaveQuestion")
        dispatch(setQuestions(questionsState.map((q) => q._id === questionItemState._id ? questionItemState : q)));
      }
    } else {
      console.log("action === quizId in handleUpdateOrSaveQuestion")
      if (questionItemState._id === "") {
        // add question
        console.log(questionItemState);
        questionClient.createQuestion(action, questionItemState).then((question) => {
          dispatch(setQuestions([...questionsState, question]));
        })
      } else {
        // update question
        console.log("In handleUpdateOrSaveQuestion");
        console.log(questionItemState);
        questionClient.updateQuestion(questionItemState).then((status) => {
          dispatch(setQuestions(questionsState.map((q) => q._id === questionItemState._id ? questionItemState : q)));
        })
      }
    }
  };



  const handleDeleteQuestion = async () => {
    const response = await questionClient.deleteQuestion(questionItemState._id);
    if (response.acknowledged) {
      const newQuestions = questionsState.filter((question) => question._id !== questionItemState._id);
      dispatch(setQuestions(newQuestions));
    } else {
      alert("Failed to delete the quiz");
      return;
    }
    setShowDeleteQuestionModal(false);
    dispatch(resetQuestionItemState());
  }

  useEffect(() => {
    dispatch(setQuestionItem(questionItemState));
  }, [questionItemState, dispatch])

  return (
    <div className="mt-3 ms-3">
    
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
          <a role="button" className="btn btn-light me-2"
          onClick={() => {
            dispatch(resetQuestionItemState());
            dispatch(setQuestionToDefaultMultipleChoice());
            setAddQuestionFormOpen(true);
          }}>
            <FaPlus className="me-1" />
            New Question
          </a>
          <a role="button" href="#" className="btn btn-light me-2">
            <FaPlus className="me-1" />
            New Question Group
          </a>
          <a role="button" href="#" className="btn btn-light me-2">
            <FaMagnifyingGlass className="me-1" />
            Find Questions
          </a>
          
        </div>


        <Collapse in={addQuestionFormOpen} unmountOnExit>
          <div className="card mb-2 mt-2">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div className="row align-items-center">
                <div className="col">
                  <input type="text" className="form-control" value={questionItemState.title} placeholder="Question Title" onChange={(e) => {dispatch(setQuestionItem({ ...questionItemState, title: e.target.value }))}}/>
                </div>
                <div className="col">
                  <select className="form-select" value={questionItemState.questionType} onChange={(e) => {
                    if (e.target.value === "M") {
                      dispatch(setQuestionToDefaultMultipleChoice());
                    } else if (e.target.value === "T") {
                      dispatch(setQuestionToDefaultTrueFalse());
                    } else if (e.target.value === "B") {
                      dispatch(setQuestionToDefaultFillInTheBlank());
                    }
                  }}>
                    <option value="M">Multiple Choice</option>
                    <option value="T">True/False</option>
                    <option value="B">Fill in the Blank</option>
                  </select>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="questionPoints" className="form-label mt-2">pts:</label>
                <input type="number" className="form-control" id="questionPoints" value={questionItemState.points} onChange={(e) => {dispatch(setQuestionItem({ ...questionItemState, points: parseInt(e.target.value) }))}}/>
              </div>
            </div>

            <div className="card-body">
              <QuizTypeTextRender quizType={questionItemState.questionType} />
              
              <h4>Question:</h4>
              <ReactQuill value={questionItemState.questionText} onChange={(value) => {dispatch(setQuestionItem({ ...questionItemState, questionText: value }))}} />
              <br/>
              <h4>Answers:</h4>
              
              {questionItemState.questionType === "M" ? <MultipleChoiceAnswerEditor /> : null}
              {questionItemState.questionType === "T" ? <TrueAndFalseQuestionEditor /> : null}
              {questionItemState.questionType === "B" ? <FillInTheBlankAnswerEditor /> : null}

              <br/>
              <a className="btn btn-secondary me-2" onClick={() => {setAddQuestionFormOpen(false)}}>Cancel</a>

              
              <a className="btn btn-danger" onClick={() => { setAddQuestionFormOpen(false); handleUpdateOrSaveQuestion() }}>
                {questionItemState._id === "" ? `Add Question` : `Update Question` }
              </a>
              
            </div>
          </div>
        </Collapse>



        <div className="list-group wd-courses-quizzes">
          <li className="list-group-item">
            <div>
              <a className="btn" data-bs-toggle="collapse" href="#collapse-Quiz-List">
                <FaSortDown style={{ verticalAlign: "top" }} />
              </a>
              <span className="fw-bold">Quiz Questions</span>
            </div>
              
            <div className="p-0 collapse show" id="collapse-Quiz-List">

              {questionsState.length === 0 ? (
                <div className="wd-courses-no-quizzes list-group-item text-muted ">
                  <br />
                  No Questions Available.
                  <br />
                  Click + Question button to add question.
                  <br /><br />
                </div>
              ) : (
                <div>
                  {questionsState.map((question, index) => (
                    <li key={index} className="d-flex align-items-center justify-content-between list-group-item">
                      {question.title}
                      <div className="dropleft d-inline">
                        <a className="btn wd-courses-quizzes-icon-link" type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></a>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item"
                              onClick={() => {
                                setShowDeleteQuestionModal(true);
                                dispatch(setQuestionItem(question));
                              }}>
                              Delete
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={() => { dispatch(setQuestionItem(question)); setAddQuestionFormOpen(true); }}>Edit</button>
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </li>
        </div>
                    
        <DeleteQuizModal
        show={showDeleteQuestionModal}
        onClose={() => setShowDeleteQuestionModal(false)}
        onDelete={handleDeleteQuestion} />
        

    </div>
  );
}

export default QuestionsEditor;
