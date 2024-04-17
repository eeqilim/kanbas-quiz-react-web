import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../index.css';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
interface Answer {
  id: string;
  text: string;
}

interface QuestionEditorState {
  title: string;
  points: number;
  questionText: string;
  possibleAnswers: Answer[];
  correctAnswer:string;
  questionType:string;
}

export default function MultipleChoiceQuestionEditor() {
  const [state, setState] = useState<QuestionEditorState>({
    title: '',
    points: 1,
    questionText: '',
    possibleAnswers: [{ id: 'a1', text: 'Example anwser 1' },
    { id: 'a2', text: 'Example answer 2' }],
    correctAnswer:'',
    questionType:"M",
  });
  
  const handleAnswerChange = (text:any, index:any) => {
    const newAnswers = [...state.possibleAnswers];
    newAnswers[index].text = text;
    setState({ ...state, possibleAnswers: newAnswers });
  };

  const handleSelectCorrectAnswer = (id:any) => {
    setState({ ...state, correctAnswer: id });
  };

  const handleRemoveAnswer = (index:any) => {
    const newAnswers = [...state.possibleAnswers];
    newAnswers.splice(index, 1);
    setState({ ...state, possibleAnswers: newAnswers });
  };

  return (
    <div className="container-fluid me-3 ms-3">
      {/* Row for Title and Points */}
      <div className="row pt-3">
        <div className="col-4">
          <input
            className="form-control"
            type="text"
            value={state.title}
            onChange={() => {}}
            placeholder="Question Title"
          />
        </div>
        <div className="col-4">
        <Dropdown>
            <Dropdown.Toggle variant="light"  id="dropdown-basic">
             Multiple choice
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Multiple choice</Dropdown.Item>
                <Dropdown.Item href="#/action-2">True/False</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Fill in the Blank </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>

        <div className="col-3 d-inline-flex align-items-center">
          <span className="fs-5 me-2">pts:</span>
          <input
            className="form-control"
            type="number"
            value={state.points}
            onChange={() => {}}
            placeholder="Points"
            style={{ width: "auto" }}
          />   
         </div>
      </div>
      <hr/>
      <h5 className="text-muted-question">Enter your question and multiple answers, then select the one correct answer</h5>
      <b>Question:</b>
      <div className="row pt-3">
        <div className="col">
          <ReactQuill
            className="custom-quill form-control"
            id="myCustomQuillEditorQuestion"
            value={state.questionText}
            onChange={() => {}}
            placeholder="Enter your question text here..."
          />
        </div>
      </div>

     
      <div className="row pt-3">
      <strong>Answers:</strong>
      <div className="col-6 input-group mb-3">
          <span >
          Correct Answer:
          </span>
            <input
                className="form-control mb-3"
                type="text"
                value={state.correctAnswer}
                onChange={(e) => setState({ ...state, correctAnswer: e.target.value })}
                placeholder="3"
            />
            </div>
        {state.possibleAnswers.map((answer, index) => (
        <div key={answer.id} className="input-group mb-3">
          <span >
          Possible Answer:
          </span>
          <div className="input-group-text">
            <input
              type="radio"
              name="correctAnswer"
              checked={state.correctAnswer === answer.id}
              onChange={() => handleSelectCorrectAnswer(answer.id)}
            />
          </div>
          <input
            className="form-control"
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(e.target.value, index)}
            placeholder={`Possible Answer ${index + 1}`}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={() => handleRemoveAnswer(index)}>
          <FaTrash/>
            Remove
          </button>
        </div>
      ))}
        
        </div>
      
        

      <div  style={{ display: 'flex', justifyContent: 'flex-end' }}>
    
        <button
        className="btn btn-custom-red-addquestion"
        type="button"
        style={{ flex: "0 1 auto" }}
        onClick={() => {}}>
        <FaPlus /> Add Another Answer
        </button>
    </div>

      <div className="row pt-3">
        <div className="col">
          <button
            className="btn me-2"
            type="button"
            onClick={() => {}}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {}}
          >
            Update Question
          </button>
        </div>
      </div>
    </div>
  );

}
