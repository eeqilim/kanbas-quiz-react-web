import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestionItem } from "../../quizsReducer";



function FillInTheBlankAnswerEditor() {
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

    const deleteAnswer = (index: number) => {
        const newAnswers = [...questionItemState.possibleAnswers];
        newAnswers.splice(index, 1);
        dispatch(setQuestionItem({ ...questionItemState, possibleAnswers: newAnswers }));
    }

    return (
        <>
            <div>

                {questionItemState.possibleAnswers.map((answer: string, index: number) => (
                    <div className="mb-2">
                        <label className="form-check-label" htmlFor={`flexRadio${index}`}>Possible Answers
                        <input type="text" value={answer} className="form-control" id={`flexRadio${index}`} 
                        onChange={(e) => updateAnswer(index, e.target.value)} /></label>

                        <button className="btn btn-danger ms-2" onClick={() => { deleteAnswer(index) }}>Delete</button>

                    </div>
                ))}

            </div>

            <div className="d-flex justify-content-end">
                <a onClick={addNewAnswer} className="add-answer-link">+ Add Another Answer</a>
            </div>
        </>
    )


}

export default FillInTheBlankAnswerEditor;