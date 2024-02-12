import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments, modules } from "../../../Database";
import { FaCircleCheck } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import "./index.css";

function AssignmentEditor() {
    const { assignmentGroupId, assignmentId, courseId } = useParams();

    console.log (assignmentId)
    const assignmentGroup = assignments.filter((assignment) => assignment.course === courseId);

    const assignment = assignments.find( (assignment) => assignment._id === assignmentGroupId );
    const item = assignment?.items.find( (item) => item.item_id === assignmentId );
    const module = modules.filter( (module) => module.course === courseId)
    const navigate = useNavigate();


    console.log(assignment)
    console.log(item)

    const handleSave = () => {
        console.log("Action: Save");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    
    return (
        <div className="container-fluid me-3 ms-3">

            <div className="row pt-3">
                <div className="col text-end">
                    <div className="text-success fs-5 me-3 d-inline">
                        <FaCircleCheck className="me-1"/><span className="fw-bold">Published</span> 
                    </div>
                
                    <div className="d-inline">
                        <a className="btn border border-dark bg-light"><FaEllipsisV /></a>
                    </div>
                </div>
            </div>

            <hr/>

            <form>
                <div className="row mb-3 align-items-center">
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-name" className="form-label">Assignment Name</label>
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" id="assignment-name" defaultValue={item?.item_name} />
                    </div>
                </div>
                <div className="row mb-3 align-items-center"> 
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-points" className="form-label">Points</label>
                    </div>
                    <div className="col-8">
                        <input type="number" className="form-control w-100" id="assignment-points" defaultValue={item?.points} />
                    </div>
                </div>
                <div className="row mb-3 align-items-center"> 
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-group" className="form-label mb-0">Assignment Group</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" id="assignment-group">
                            {
                                assignmentGroup.map((group, index) => (
                                    <option key={index} value={group._id} selected={group._id === item?.item_id.split(".")[0]}>{group.category}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-display-grade" className="form-label mb-0">Display Grade as</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" id="assignment-display-grade">
                            <option value="Percentage" selected>Percentage</option>
                            <option value="Letter">Letter</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                    </div>
                    <div className="col-8">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Do not count this assignment towards the final grade
                            </label>
                        </div>
                    </div>      
                </div>
                
                {/* CARD IN THE LOWER PART OF THE FORM */}
                <div className="row mb-3 align-items-center">
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end align-self-start">
                        <label className="form-label mb-0">Assign</label>
                    </div>
                    
                    <div className="col-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="wd-courses-assignments-edit-assign-card-input-container">
                                    <label htmlFor="assign-to" className="form-label fw-bold fs-5">Assign to</label>
                                    <input type="text" id="assign-to" className="form-control" aria-describedby="passwordHelpBlock"></input>
                                </div>
                                <div className="wd-courses-assignments-edit-assign-card-input-container">
                                    <label htmlFor="due_date" className="form-label fw-bold fs-6">Due Date</label>
                                    <div className="input-group">
                                        <input type="date" id="due_date" className="form-control" aria-describedby="passwordHelpBlock" value={item?.due_date}></input>
                                    </div>
                                </div>
                                <div className="wd-courses-assignments-edit-assign-card-input-container">
                                    <label htmlFor="due_time" className="form-label fw-bold fs-6">Due Time</label>
                                    <div className="input-group">
                                        <input type="time" id="due_time" className="form-control" aria-describedby="passwordHelpBlock" value={item?.due_time}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row pb-3">
                    <div className="col">
                        <div className="form-check d-flex">
                            <div className="flex-fill ms-2">
                                <input className="form-check-input" type="checkbox" value="" id="notify-user-content-change"></input>
                                <label className="form-check-label" htmlFor="notify-user-content-change">
                                    Notify users that this content has changed
                                </label>
                            </div>
                            <div className="me-2">
                                <Link to={ `/Kanbas/Courses/${courseId}/Assignments` } className="btn wd-courses-assignments-edit-cancel-button me-1 border-light">Cancel</Link>
                                <button onClick={handleSave} className="btn btn-danger">Save</button>
                            </div>
                        </div>
                    </div>
                </div>   

            </form>

        </div>

    )

}
export default AssignmentEditor;





