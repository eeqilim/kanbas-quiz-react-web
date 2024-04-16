import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import { Dropdown } from "react-bootstrap";
// import { Answer, QuestionEditorState } from './index';
import { FaPlus, FaTrash } from "react-icons/fa";

export interface FillInBlanksQuestionType {
  questionId: string;
  title: string;
  points: number;
  questionText: string;
  correctAnswer: string;
  questionType: string; //M for multiple choice, T for true/false, B for fill in the blank
  quizId: string;
}

function EditFillInBlanksQuestion() {
  const initialState: FillInBlanksQuestionType = {
    questionId: "question111",
    title: "",
    points: 1,
    questionText: "",
    correctAnswer: "",
    questionType: "B",
    quizId: "quiz1",
  };
  const [question, setQuestion] =
    useState<FillInBlanksQuestionType>(initialState);

  // Function to handle change in the correct answer
  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion((prevState) => ({
      ...prevState,
      correctAnswer: e.target.value,
    }));
  };

  const handleUpdate = () => {
    // API call to save the current state
    console.log("Saving data...", question);
    // Example: axios.post('/api/update-question', question)
    // .then(response => console.log('Saved successfully'))
    // .catch(error => console.error('Error saving:', error));
  };

  const handleCancel = () => {
    setQuestion(initialState);
  };

  // Fetch and set initial data
  useEffect(() => {
    // Fetch data from API and set it
    // setQuestion(fetchedData);
  }, []);

  return (
    <div className="container-fluid me-3 ms-3">
      {/* Row for Title and Points */}
      <div className="row pt-3">
        <div className="col-4">
          <input
            className="form-control"
            type="text"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
            }
            placeholder="Question Title"
          />
        </div>
        <div className="col-4">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Fill in the Blank
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Multiple choice</Dropdown.Item>
              <Dropdown.Item href="#/action-2">True/False</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Fill in the Blank{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-3 d-inline-flex align-items-center">
          <span className="fs-5 me-2">pts:</span>
          <input
            className="form-control"
            type="number"
            value={question.points}
            onChange={(e) =>
              setQuestion({ ...question, points: parseInt(e.target.value) })
            }
            placeholder="Points"
            style={{ width: "auto" }}
          />
        </div>
      </div>
      <hr />
      <h5 className="text-muted-question">
        Enter your question and multiple answers, then select the one correct
        answer
      </h5>
      <b>Question:</b>
      <div className="row pt-3">
        <div className="col">
          <ReactQuill
            className="custom-quill form-control"
            id="myCustomQuillEditorQuestion"
            value={question.questionText}
            onChange={(value) =>
              setQuestion({ ...question, questionText: value })
            }
            placeholder="Enter your question text here..."
          />
        </div>
      </div>

      <div className="row pt-3">
        <strong>Answers:</strong>
        <div className="input-group mb-2">
          Correct Answer:
          <input
            type="text"
            className="form-control"
            value={question.correctAnswer}
            onChange={handleCorrectAnswerChange}
            placeholder={question.correctAnswer}
          />
        </div>
      </div>

      <div className="row pt-3">
        <div className="col">
          <button className="btn me-2" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleUpdate}
          >
            Update Question
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditFillInBlanksQuestion;
