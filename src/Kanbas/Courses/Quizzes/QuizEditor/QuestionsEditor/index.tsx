import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Preview from "../../Preview"; //test1


import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { useEffect, useState } from "react";

import Collapse from "react-bootstrap/Collapse";
import { resetQuestionItemState, setQuestionItem, setCorrectAnswerIdx, resetCorrectAnswerIdx, setQuestions } from "../../quizsReducer";
import ReactQuill from "react-quill";

import { useParams } from "react-router-dom";
import * as questionClient from "../../questionClient"; 

import "./index.css";

import MultipleChoiceAnswerEditor from "./MultipleChoiceAnswerEditor";
import TrueAndFalseQuestionEditor from "./TrueAndFalseQuestionEditor";

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





function QuestionsEditor() {

  const dispatch = useDispatch();
  const { action } = useParams();

  const questionsState = useSelector((state: KanbasState) => state.quizsReducer.questions);
  const questionItemState = useSelector((state: KanbasState) => state.quizsReducer.question);
  const correctAnswerIdx = useSelector((state: KanbasState) => state.quizsReducer.correctAnswerIdx);

  const [addQuestionFormOpen, setAddQuestionFormOpen] = useState(false);

  


  const handleUpdateOrSaveQuestion = () => {
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
  };

  const handleDeleteQuestion = (questionId: string) => {
    questionClient.deleteQuestion(questionId).then(() => {
      dispatch(setQuestions(questionsState.filter((question) => question._id !== questionId)));
    })
  }

  useEffect(() => {
    dispatch(setQuestionItem(questionItemState));
  }, [questionItemState, dispatch])

  return (
    <div className="mt-3 ms-3">
      {/* <Preview /> */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <a role="button" className="btn btn-light me-2"
          onClick={() => {
            if(questionItemState._id !== "") dispatch(resetQuestionItemState());
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
                  <select className="form-select" value={questionItemState.questionType} onChange={(e) => {dispatch(setQuestionItem({ ...questionItemState, questionType: e.target.value }))}}>
                    <option value="M">Multiple Choice</option>
                    <option value="T">True/False</option>
                    <option value="B">Fill in the Blank</option>
                  </select>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="questionPoints" className="form-label mt-2">pts:</label>
                <input type="number" className="form-control" id="questionPoints" value={questionItemState.points} onChange={(e) => {dispatch(setQuestionItem({ ...questionItemState, points: e.target.value }))}}/>
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

              <br/>
              <a className="btn btn-secondary me-2" onClick={() => {setAddQuestionFormOpen(false)}}>Cancel</a>

              
              <a className="btn btn-danger" onClick={() => { setAddQuestionFormOpen(false); handleUpdateOrSaveQuestion() }}>
                {questionItemState._id === "" ? `Add Question` : `Update Question` }
              </a>
              
            </div>
          </div>
        </Collapse>



      
        <div className="card m-3" style={{ width: "95%" }}>
          <div className="card-body">
            {/* TODO: to displays list of questions for this quiz. List is initially empty */}
            To displays list of questions for this quiz. List is initially empty
          </div>

          <ul>
            {questionsState.map((question) => (
              <li key={question.title}>
                  {question.title}

                  <button onClick={() => {dispatch(setQuestionItem(question)); setAddQuestionFormOpen(true);}}>Edit</button>
                  <button onClick={() => {handleDeleteQuestion(question._id)}}>Delete</button>
              </li>
            ))}
          </ul>

        </div>

        

        

    </div>
  );
}

export default QuestionsEditor;
