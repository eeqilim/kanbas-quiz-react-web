import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestionItem, setQuestionToDefaultMultipleChoice } from "../../quizsReducer";

import "./index.css";

function MultipleChoiceAnswerEditor() {
  
    const questionItemState = useSelector((state: KanbasState) => state.quizsReducer.question);
    
    const quizItemState = useSelector((state: KanbasState) => state.quizsReducer.quiz);
    const dispatch = useDispatch();
  
    const addNewAnswer = () => {
      dispatch(setQuestionItem({ ...questionItemState, possibleAnswers: [...questionItemState.possibleAnswers, ""] }));
    }
  
    const updateAnswer = (index: number, newValue: string) => {
      const newAnswers = [...questionItemState.possibleAnswers];
      newAnswers[index] = newValue;
      dispatch(setQuestionItem({ ...questionItemState, possibleAnswers: newAnswers }));
    }
  
    const deleteAnswer = (index: number) => {
      const newAnswers = [...questionItemState.possibleAnswers];
      newAnswers.splice(index, 1);
      dispatch(setQuestionItem({ ...questionItemState, possibleAnswers: newAnswers }));
    }
    const setCorrectAnswer = (index: number) => {
      dispatch(setQuestionItem({ ...questionItemState, correctAnswer: questionItemState.possibleAnswers[index] }));
    }
    
    const [correctAnswerIdx, setCorrectAnswerIdx] = useState(0);


    useEffect(() => {
      if (questionItemState._id === "") {
        dispatch(setQuestionToDefaultMultipleChoice())
      }
    }, [questionItemState, dispatch])

    useEffect(() => {
        const idx = questionItemState.possibleAnswers.findIndex((answer) => answer === questionItemState.correctAnswer);
        setCorrectAnswerIdx(idx);
    }, [questionItemState])
  
    return (
      <div className="form-check">
        
        { questionItemState.possibleAnswers.map((answer: string, index: number) => (
          <div className="mb-2">
            
            <input className="form-check-input" type="radio" name="flexRadio" id={`flexRadio${index}`} 
            checked={correctAnswerIdx === index} 
            onChange={() => { setCorrectAnswerIdx(index); setCorrectAnswer(index) }}/>
  
            <label className="form-check-label" htmlFor={`flexRadio${index}`}>
              { correctAnswerIdx === index ? `Correct Answer` : `Possible Answer` }
            </label>
            
            <input type="text" value={answer} onChange={(e) => updateAnswer(index, e.target.value)}/>
  
            <button className="btn btn-danger ms-2" onClick={() => {deleteAnswer(index)}}>Delete</button>
          
          </div>
        ))}
  
        <div className="d-flex justify-content-end">
          <a onClick={addNewAnswer} className="add-answer-link">+ Add Another Answer</a>
        </div>
  
      </div>
    )
  }
  export default MultipleChoiceAnswerEditor;