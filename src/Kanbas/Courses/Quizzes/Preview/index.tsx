import { CAlert } from "@coreui/react";
import { cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { FaPencil } from "react-icons/fa6";
import { SlQuestion } from "react-icons/sl";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FaCaretRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as questionClient from "../questionClient";  
import { setQuestions } from "../quizsReducer";
import { useNavigate } from "react-router-dom";

function Preview() {
  const { courseId, quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizsReducer.quiz)
  const questionList = useSelector((state: KanbasState) => state.quizsReducer.questions);

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    questionClient.fetchQuestionsByQuizId(quizId).then((questions) => {
      dispatch(setQuestions(questions));
  })}, [quizId]);


  const handleAnswerChange = (index: number, answer: string) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[index] = { ...updatedQuestions[index], previewAnswer: answer };
    dispatch(setQuestions(updatedQuestions));
  }

  const handleSubmit = () => {
    console.log("Submit quiz");

    questionList.forEach((question) => {
      questionClient.updateQuestion(question);
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  }


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

      <div>
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
          <div>
            {questionList.map((question, index) => (
              <div key={question._id} className="card" style={{ marginBottom: "20px" }}>
                <div className="card-header" style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                  <span>
                    Question {index + 1}
                  </span>
                  <span>
                    {question.points} pts
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {question.title}
                    <br /><br />
                    <div dangerouslySetInnerHTML={{ __html: question.questionText }} />
                  </p>
                  <hr />
                  <div className="form-check">
                    {question.questionType === "B" && (
                      <div>
                        <div className="d-flex align-items-center mb-3 w-50">
                          <input type="text" className="form-control" placeholder="Enter your answer" value={question.previewAnswer} onChange={(e) => handleAnswerChange(index, e.target.value)} />
                        </div>
                      </div>
                    )}
                    {question.questionType === "M" && (
                      question.possibleAnswers.map((answer, idx) => (
                        <div key={idx}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${question._id}`}
                            id={`answer-${idx}`}
                            checked={question.previewAnswer === answer}
                            onChange={() => handleAnswerChange(index, answer)}
                          />
                          <label className="form-check-label" htmlFor={`answer-${idx}`}>
                            {answer}
                          </label>
                        </div>
                      ))
                    )}
                    {question.questionType === "T" && (
                      <>
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${question._id}`}
                            id={`answer-true`}
                            checked={question.previewAnswer === "True"}
                            onChange={() => handleAnswerChange(index, "True")}
                          />
                          <label className="form-check-label" htmlFor={`answer-true`}>
                            True
                          </label>
                        </div>
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${question._id}`}
                            id={`answer-false`}
                            checked={question.previewAnswer === "False"}
                            onChange={() => handleAnswerChange(index, "False")}
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
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 ms-3 text-end">
        <a href="#" role="button" className="btn btn-light">
          Next <FaCaretRight />
        </a>
      </div>

      <div className="card mt-3 ms-3" style={{ width: "98%", marginBottom: "10%" }}>
        <div className="card-body text-end">
          Quiz saved at {formatTime(new Date())}
          <a role="button" className="btn btn-light" style={{ marginLeft: "10px" }}
          onClick={handleSubmit}>
            Submit Quiz
          </a>
        </div>
      </div>

      <div className="card mt-3 ms-3" style={{ width: "98%" }}>
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
        <h4 className="mt-3 ms-3">Questions</h4>
        {questionList.map((question, index) => (
          <div key={question._id} className="mt-1 ms-4 list-group-item">
            <SlQuestion className="me-1" />
            <span style={{ color: 'red' }}>Question {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;