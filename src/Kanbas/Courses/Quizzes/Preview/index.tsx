import { CAlert } from "@coreui/react";
import { cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { FaPencil } from "react-icons/fa6";
import { SlQuestion } from "react-icons/sl";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FaCaretRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as questionClient from "../questionClient";
import { setQuestions } from "../quizsReducer";
import { useNavigate } from "react-router-dom";

function Preview() {
  const { courseId, quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizsReducer.quiz)
  const questionList = useSelector((state: KanbasState) => state.quizsReducer.questions);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    questionClient.fetchQuestionsByQuizId(quizId).then((questions) => {
      dispatch(setQuestions(questions));
    })
  }, [quizId, dispatch]);


  const handleAnswerChange = (answer: string) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[currentQuestionIndex] = { ...updatedQuestions[currentQuestionIndex], previewAnswer: answer };
    dispatch(setQuestions(updatedQuestions));
  }

  const handleSubmit = () => {
    console.log("Submit quiz");

    questionList.forEach((question) => {
      questionClient.updateQuestion(question);
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  }

  const navigateToNextQuestion = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  };

  const handleQuestionClick = (index: number) => {
    if (currentQuestionIndex !== index) {
      setCurrentQuestionIndex(index);
    }
  }

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const currentQuestion = questionList[currentQuestionIndex];

  return (
    <div className="container-fluid" style={{ marginTop: "20px", marginLeft: "25px", marginRight: "20px" }}>
      <h1>{quiz?.item_name}</h1>
      <CAlert color="danger" className="d-flex align-items-center">
        <CIcon
          icon={cilWarning}
          className="flex-shrink-0 me-2"
          width={24}
          height={24}
        />
        <div>This is a preview of the published version of the quiz</div>
      </CAlert>
      <div>
        Started: {formatDate(quiz.available_from_date)} at {formatTime(quiz.available_from_date)}
      </div>

      <h2>Quiz Instructions</h2>
      <hr />

      {questionList.length === 0 ? (
        <div className="card text-muted" style={{ marginBottom: "20px" }}>
          <div className="text-center">
            <br />
            No questions available.
            <br />
            Click "Keep Editing This Quiz" button to edit quiz.
            <br /><br />
          </div>
        </div>
      ) : (
        <div key={currentQuestion._id} className="card" style={{ marginBottom: "20px" }}>
          <div className="card-header" style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
            <span>
              Question {currentQuestionIndex + 1}
            </span>
            <span>
              {currentQuestion.points} pts
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">
              {currentQuestion.title}
              <br /><br />
              <div dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }} />
            </p>
            <hr />
            <div className="form-check">
              {currentQuestion.questionType === "B" && (
                <div className="d-flex align-items-center mb-3 w-50">
                  <input type="text" className="form-control" placeholder="Enter your answer" value={currentQuestion.previewAnswer}
                    onChange={(e) => handleAnswerChange(e.target.value)} />
                </div>
              )}
              {currentQuestion.questionType === "M" && (
                currentQuestion.possibleAnswers.map((answer, idx) => (
                  <div key={idx}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestion._id}`}
                      id={`answer-${idx}`}
                      checked={currentQuestion.previewAnswer === answer}
                      onChange={() => handleAnswerChange(answer)}
                    />
                    <label className="form-check-label" htmlFor={`answer-${idx}`}>
                      {answer}
                    </label>
                  </div>
                ))
              )}
              {currentQuestion.questionType === "T" && (
                <>
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestion._id}`}
                      id={`answer-true`}
                      checked={currentQuestion.previewAnswer === "True"}
                      onChange={() => handleAnswerChange("True")}
                    />
                    <label className="form-check-label" htmlFor={`answer-true`}>
                      True
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestion._id}`}
                      id={`answer-false`}
                      checked={currentQuestion.previewAnswer === "False"}
                      onChange={() => handleAnswerChange("False")}
                    />
                    <label className="form-check-label" htmlFor={`answer-false`}>
                      False
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 ms-3 text-end">
        {currentQuestionIndex < questionList.length - 1 ? (
          <button className="btn btn-light" onClick={navigateToNextQuestion}>
            Next <FaCaretRight />
          </button>
        ) : ""}
      </div>

      <div className="card mt-3" style={{ marginBottom: "10%" }}>
        <div className="card-body text-end">
          Quiz saved at {formatTime(new Date())}
          <a role="button" className="btn btn-light" style={{ marginLeft: "10px" }}
            onClick={handleSubmit}>
            Submit Quiz
          </a>
        </div>
      </div>

      <div className="card mt-3">
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
          role="button"
          className="btn btn-light"
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
        >
          <FaPencil style={{ marginRight: "5px" }} />
          <span>Keep Editing This Quiz</span>
        </Link>

      </div>
      <br />

      <div>
        <h4 className="mt-3">Questions</h4>
        {questionList.map((question, index) => (
          <div key={question._id} className="mt-1 ms-4 list-group-item" onClick={() => handleQuestionClick(index)}>
            <SlQuestion className="me-1" />
            {index !== currentQuestionIndex ? (
              <span style={{ color: 'firebrick' }}>Question {index + 1}</span>
            ) : (
              <b><span style={{ color: 'firebrick' }}>Question {index + 1}</span></b>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;