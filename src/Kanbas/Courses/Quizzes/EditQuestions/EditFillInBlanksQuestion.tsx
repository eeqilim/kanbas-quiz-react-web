import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import { Dropdown } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router";
import * as client from "./client";

const API_BASE_URL = "http://localhost:4000";

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
  const { quizId, questionId } = useParams(); // Extracting parameters from the route

  const initialState: FillInBlanksQuestionType = {
    questionId: questionId ?? "",
    title: "",
    points: 1,
    questionText: "",
    correctAnswer: "",
    questionType: "B",
    quizId: quizId ?? "",
  };

  const [question, setQuestion] = useState(initialState);
  const [originalQuestion, setOriginalQuestion] = useState(initialState);

  const fetchQuestionData = async () => {
    const questionData = await client.fetchQuestionById(questionId);
    setQuestion(questionData);
    setOriginalQuestion(questionData);
  };

  useEffect(() => {
    fetchQuestionData();
  }, [questionId]);

  const handleCorrectAnswerChange = (e: any) => { question &&
    setQuestion({ ...question, correctAnswer: e.target.value });
  };

  const updateQuestionData = async () => {
    const updatedQuestion = await client.updateQuestion(question);
    console.log("Question updated successfully:", updatedQuestion);
    // setQuestion(updatedQuestion);
  };

  const handleUpdate = () => {
    updateQuestionData();
  };

  const handleCancel = () => {
    setQuestion(originalQuestion);
  };

  return (
    <div className="container-fluid me-3 ms-3">
      {/* Row for Title and Points */}
      <div className="row pt-3">
        <div className="col-4">
          <input
            className="form-control"
            type="text"
            value={ question ? question.title : (originalQuestion?.title || '')}
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
            value={ question ? question.points: (originalQuestion?.points) || '' }
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
            value={ question ? question.questionText: (originalQuestion?.questionText || '')}
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
            value={question ? question.correctAnswer: (originalQuestion?.correctAnswer || '')}
            onChange={handleCorrectAnswerChange}
            placeholder={question ? question.correctAnswer : (originalQuestion?.correctAnswer || '')}
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
