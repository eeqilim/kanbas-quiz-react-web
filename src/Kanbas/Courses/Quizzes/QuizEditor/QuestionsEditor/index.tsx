import { FaEllipsisV, FaPlus, FaSortDown } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Preview from "../../Preview"; //test1


import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { useEffect, useState } from "react";

import Collapse from "react-bootstrap/Collapse";
import { resetQuestionItemState, setQuestionItem } from "../../quizsReducer";
import ReactQuill from "react-quill";

import "./index.css";

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


function MultipleChoiceAnswerEditor() {

  const questionItemState = useSelector((state: KanbasState) => state.quizsReducer.question);
  const dispatch = useDispatch();

  const addNewAnswer = () => {
    dispatch(setQuestionItem({ ...questionItemState, possibleAnswers: [...questionItemState.possibleAnswers, ""] }));
  }

  const updateAnswer = (index: number, newValue: string) => {
    const newAnswers = [...questionItemState.possibleAnswers];
    newAnswers[index] = newValue;
    dispatch(setQuestionItem({ ...questionItemState, possibleAnswers: newAnswers }));
  }
  const [correctAnswerIdx, setCorrectAnswerIdx] = useState(0);

  useEffect(() => {
    if (questionItemState.possibleAnswers.length === 0) {
      addNewAnswer();
    } else {
      setCorrectAnswerIdx(questionItemState.possibleAnswers.indexOf(questionItemState.correctAnswer));
    }
  }, [])

  return (
    <div className="form-check">

      {questionItemState.possibleAnswers.map((answer: string, index: number) => (
        <div className="mb-2">

          <input className="form-check-input" type="radio" name="flexRadio" id={`flexRadio${index}`} checked={correctAnswerIdx === index} onChange={() => setCorrectAnswerIdx(index)} />
          <label className="form-check-label" htmlFor={`flexRadio${index}`}>
            {correctAnswerIdx === index ? `Correct Answer` : `Possible Answer`}
          </label>
          <input type="text" value={answer} onChange={(e) => updateAnswer(index, e.target.value)} />

        </div>
      ))}

      <div className="d-flex justify-content-end">
        <a onClick={addNewAnswer} className="add-answer-link">+ Add Another Answer</a>
      </div>

    </div>
  )
}




function QuestionsEditor() {

  const dispatch = useDispatch();

  const questionsState = useSelector((state: KanbasState) => state.quizsReducer.questions);
  const questionItemState = useSelector((state: KanbasState) => state.quizsReducer.question);

  const [addQuestionFormOpen, setAddQuestionFormOpen] = useState(false);

  useEffect(() => {
    dispatch(setQuestionItem(questionItemState));
  }, [questionItemState, dispatch])

  return (
    <div className="mt-3 ms-3">
      {/* <Preview /> */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <a role="button" className="btn btn-light"
          onClick={() => {
            dispatch(resetQuestionItemState());
            setAddQuestionFormOpen(true);
          }}>
          <FaPlus className="me-1" />
          New Question
        </a>
        &nbsp;
        <a role="button" href="#" className="btn btn-light">
          <FaPlus className="me-1" />
          New Question Group
        </a>
        &nbsp;
        <a role="button" href="#" className="btn btn-light">
          <FaMagnifyingGlass className="me-1" />
          Find Questions
        </a>
        &nbsp;
      </div>


      <Collapse in={addQuestionFormOpen}>
        <div className="card mb-2 mt-2">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <input type="text" className="form-control" value={questionItemState.title} placeholder="Question Title" onChange={(e) => { dispatch(setQuestionItem({ ...questionItemState, title: e.target.value })) }} />
              </div>
              <div className="col">
                <select className="form-select" value={questionItemState.questionType} onChange={(e) => { dispatch(setQuestionItem({ ...questionItemState, questionType: e.target.value })) }}>
                  <option value="M">Multiple Choice</option>
                  <option value="T">True/False</option>
                  <option value="B">Fill in the Blank</option>
                </select>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label htmlFor="questionPoints" className="form-label mt-2">pts:</label>
              <input type="number" className="form-control" id="questionPoints" value={questionItemState.points} onChange={(e) => { dispatch(setQuestionItem({ ...questionItemState, points: e.target.value })) }} />
            </div>
          </div>

          <div className="card-body">
            <QuizTypeTextRender quizType={questionItemState.questionType} />

            <h4>Question:</h4>
            <ReactQuill value={questionItemState.questionText} onChange={(value) => { dispatch(setQuestionItem({ ...questionItemState, questionText: value })) }} />
            <br />
            <h4>Answers:</h4>
            {questionItemState.questionType === "M" ? <MultipleChoiceAnswerEditor /> : null}

            <br />
            <a className="btn btn-secondary me-2">Cancel</a>
            <a className="btn btn-danger">Save Question</a>
          </div>
        </div>
      </Collapse>
      
      <br />

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
                {questionsState.map((question) => (
                  <div className="d-flex align-items-center justify-content-between list-group-item">
                    {question.title}
                    <div className="dropleft d-inline">
                      <a className="btn wd-courses-quizzes-icon-link" type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></a>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item">Delete</button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => { dispatch(setQuestionItem(question)); setAddQuestionFormOpen(true); }}>Edit</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </li>
      </div>
    </div>
  );
}

export default QuestionsEditor;
