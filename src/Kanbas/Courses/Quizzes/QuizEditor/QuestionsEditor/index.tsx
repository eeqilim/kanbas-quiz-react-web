import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Preview from "../../Preview"; //test1

function QuestionsEditor() {
  return (
    <div className="mt-3 ms-3">
      {/* <Preview /> */}

      <form>
        <div className="card m-3" style={{ width: "95%" }}>
          <div className="card-body">
            {/* TODO: to displays list of questions for this quiz. List is initially empty */}
            To displays list of questions for this quiz. List is initially empty
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <a role="button" href="#" className="btn btn-light">
            <FaPlus className="me-1" />
            New Question
          </a>{" "}
          &nbsp;
          <a role="button" href="#" className="btn btn-light">
            <FaPlus className="me-1" />
            New Question Group
          </a>{" "}
          &nbsp;
          <a role="button" href="#" className="btn btn-light">
            <FaMagnifyingGlass className="me-1" />
            Find Questions
          </a>{" "}
          &nbsp;
        </div>
        <hr />

        <div className="row pb-3">
          <div className="col">
            <div className="form-check d-flex">
              <div className="flex-fill ms-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="notify-user-content-change"
                ></input>
                <label
                  className="form-check-label"
                  htmlFor="notify-user-content-change"
                >
                  Notify users that this content has changed
                </label>
              </div>
              <div className="me-2">
                {/* <Link to={ `/Kanbas/Courses/${courseId}/Assignments` } className="btn wd-courses-assignments-edit-cancel-button me-1 border-light">Cancel</Link> */}
                <button className="btn btn-light">Save & Publish</button> &nbsp;
                <button className="btn btn-light">Cancel</button> &nbsp;
                <button className="btn btn-danger">Save</button> &nbsp;
              </div>
            </div>
            <hr />
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuestionsEditor;
