


function QuizDetailsEditor() {
  return (
    <div className="mt-3 ms-3">

        <form>
            <div className="mb-3">
                <label htmlFor="quizTitle" className="from-label mb-1">Quiz Title:</label>
                <div className="col-sm-8">
                    <input type="text" value="Unnamed Quiz" className="form-control" id="quizTitle" />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="quizInstructions" className="from-label mb-1">Quiz Instructions:</label>
                <textarea className="form-control" id="quizInstructions" rows={3}></textarea>
            </div>

            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="quizType" className="form-label mb-0">Quiz Type</label>
                </div>
                <div className="col-sm-4">
                    <select className="form-select" id="quizType">
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 row align-items-center">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="assignmentGroup" className="form-label mb-0">Assignment Group</label>
                </div>
                <div className="col-sm-4">
                    <select className="form-select" id="assignmentGroup">
                        <option>ToBeImplementedForDynamicRendering</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </select>
                </div>
            </div>

        </form>
        





    </div>
  );
}

export default QuizDetailsEditor;