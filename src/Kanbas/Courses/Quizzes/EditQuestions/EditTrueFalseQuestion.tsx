import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import { Dropdown } from "react-bootstrap";
import { Answer, QuestionEditorState } from "./index";
import { FaPlus, FaTrash } from "react-icons/fa";

function EditTrueFalseQuestion() {
  const initialState: QuestionEditorState = {
    questionId: "question111",
    title: "",
    points: 1,
    questionText: "",
    correctAnswer: "", //"true" or "false"
    questionType: "T",
    possibleAnswers: [
      { answerId: "a1", text: "true", questionId: "question111" },
      { answerId: "a2", text: "false", questionId: "question111" },
    ],
    quizId: "quiz1",
  };

  const [question, setQuestion] = useState<QuestionEditorState>(initialState);

  const handleAnswerChange = (text: any, index: any) => {
    const newAnswers = [...question.possibleAnswers];
    newAnswers[index].text = text;
    setQuestion({ ...question, possibleAnswers: newAnswers });
  };

  const handleSelectCorrectAnswer = (id: any) => {
    setQuestion({ ...question, correctAnswer: id });
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
              True/False
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
            onChange={(newQuestionText) =>
              setQuestion({ ...question, questionText: newQuestionText })
            }
            placeholder="Enter your question text here..."
          />
        </div>
      </div>

      <div className="row pt-3">
        <strong>Answers:</strong>
        <div className="col-6 input-group mb-3">
          <span>Correct Answer:</span>
          <input
            className="form-control mb-3"
            type="text"
            value={question.correctAnswer}
            placeholder="Click to select correct answer"
          />
        </div>
        {question.possibleAnswers.map((answer, index) => (
          <div key={answer.answerId} className="input-group mb-3">
            <span>Possible Answer:</span>
            <div className="input-group-text">
              <input
                type="radio"
                name="correctAnswer"
                checked={question.correctAnswer === answer.text}
                onChange={() => handleSelectCorrectAnswer(answer.text)}
              />
            </div>
            <input
              className="form-control"
              type="text"
              value={answer.text}
              onChange={(e) => handleAnswerChange(e.target.value, index)}
              placeholder={`Possible Answer ${index + 1}`}
            />
          </div>
        ))}
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
export default EditTrueFalseQuestion;
