import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestionItem } from "../../quizsReducer";



function TrueAndFalseQuestionEditor() {


    const questionItemState = useSelector((state: KanbasState) => state.quizsReducer.question);
    const quizItemState = useSelector((state: KanbasState) => state.quizsReducer.quiz);
    const dispatch = useDispatch();

    

    return (
        <>

        <div className="form-check mb-2">
            <input className="form-check-input" type="radio" name="true" id="true-option" 
            checked={questionItemState.correctAnswer === "True"} 
            onChange={() => { dispatch(setQuestionItem({ ...questionItemState, correctAnswer: "True" })) }}/>
            <label className="form-check-label" htmlFor="true-option">True</label>
        </div>
        
        <div className="form-check mb-2">
            <input className="form-check-input" type="radio" name="false" id="false-option" 
            checked={questionItemState.correctAnswer === "False"} 
            onChange={() => { dispatch(setQuestionItem({ ...questionItemState, correctAnswer: "False" }))}}/>
            <label className="form-check-label" htmlFor="false-option">False</label>
        </div>
        
        </>
  );
}

export default TrueAndFalseQuestionEditor;