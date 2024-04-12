import { useParams } from "react-router";
import { quizzes } from "../../../Database";
import { CAlert } from "@coreui/react";
import { cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function Perview(){
    const { quizId } = useParams();
    const quiz = quizzes.find((quiz) => quiz._id === quizId);

    return (
        <div>
            <h1>Quiz Name{quiz?.item_name}</h1>
            <CAlert color="danger" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>This is a preview of the published version of the quiz</div>
            </CAlert>
            <h6>Started: {quiz?.available_from_date}</h6>

            <h2>Quiz Instructions</h2>
            <hr />
            <div className="card">
                <div className="card-header">
                    Question 1
                </div>
                <div className="card-body">
                    {/* <h5 className="card-title">Special title</h5> */}
                    <p className="card-text">An HTML label element can be associated with an HTML input element by settingtheir id attributes to the same value.</p>
                    <p className="card-text">The resulting effect is that when you click on the label text, the input elementreceives focus as if you had click on the input element itself.</p>
                    <hr />
                    
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Default radio
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Default checked radio
                        </label>
                    </div>
                    <a href="#" className="btn btn-light m-3">Next</a>
                </div>

                
            </div>
        </div>
    );
}

export default Perview;