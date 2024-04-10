import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { resetAssignmentState, updateAssignment, setAssignmentState, addAssignment } from "../assignmentsReducer";
import { useState } from "react";


import * as client from "../client"


function AssignmentEditor() {
    const { courseId } = useParams();

    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const modules = useSelector((state: KanbasState) => state.modulesReducer.modules.filter((module) => module.course === courseId));
    const assignmentGroups = useSelector((state: KanbasState) => state.assignmentsReducer.assignments.filter((assignment) => assignment.course === courseId));
    const [assignmentGroupIdState, setAssignmentGroupIdState] = useState(assignment._id === "" ? "" : assignment.assignment_group_id);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const { pathname } = useLocation(); 
    

    const handleAddLesson = () => {
        if (assignmentGroupIdState === "") {
            alert("Please select an assignment group");
            return;
        }
        client.addAssignmentItem(assignmentGroupIdState, assignment)
        .then((newAssignmentItem) => {
            dispatch(addAssignment({ assignmentGroupId: assignmentGroupIdState, assignment: newAssignmentItem }))
        });
    }

    const handleUpdateLesson = () => {
        console.log("hangleUpdateLesson Called")
        client.updateAssignmentItem(assignmentGroupIdState, assignment)
        .then((status) => {
            dispatch(updateAssignment({ assignmentGroupId: assignmentGroupIdState, assignment: assignment }))
        });
    }


    const handleSave = () => {
        console.log("Action: Save");
        if (pathname.includes("Add")) {
            handleAddLesson();
        } else {
            handleUpdateLesson();
        }
        dispatch(resetAssignmentState());
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
                        <input type="text" className="form-control" id="assignment-name" value={assignment.item_name} onChange={(e) => {dispatch(setAssignmentState({ ...assignment, item_name: e.target.value}))}} />
                    </div>
                </div>
                <div className="row mb-3 align-items-center"> 
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-points" className="form-label">Points</label>
                    </div>
                    <div className="col-8">
                        <input type="number" className="form-control w-100" id="assignment-points" value={assignment.points} onChange={(e) => {dispatch(setAssignmentState({ ...assignment, points: parseInt(e.target.value)}))}} />
                    </div>
                </div>
                { pathname.includes("Add") && 
                <div className="row mb-3 align-items-center"> 
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-group" className="form-label mb-0">Assignment Group</label>
                    </div>
                    
                    <div className="col-8">
                        <select className="form-select" id="assignment-group" onChange={
                            (e) => {
                                setAssignmentGroupIdState(e.target.value); 
                                console.log(assignmentGroupIdState)
                            }}>
                            <option value="" selected>Select an Assignment Group</option>
                            {
                                assignmentGroups.map((group, index) => (
                                    <option key={index} value={group._id} 
                                    selected={assignment._id === "" ? false : group._id === assignment.assignment_group_id}>{group.category}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                }
                <div className="row mb-3 align-items-center">
                    <div className="col-2 wd-courses-assignments-edit-input-label text-end">
                        <label htmlFor="assignment-description" className="form-label mb-0">Module</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" id="assignment-module" onChange={
                            (e) => {
                                dispatch(setAssignmentState({ ...assignment, module: e.target.value}))
                            }
                        }>
                            <option value="" selected={true}>Multiple Module</option>
                            {
                                modules.map((module, index) => (
                                    <option key={index} value={module._id} selected={module._id === assignment.module}>{module.name}</option>
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
                                    <input type="text" id="assign-to" className="form-control" aria-describedby="passwordHelpBlock" placeholder="To Be Implemented"/>
                                </div>
                                <div className="wd-courses-assignments-edit-assign-card-input-container row">
                                    <div className="col-6">
                                        <label htmlFor="due_date" className="form-label fw-bold fs-6">Due Date</label>
                                        <div className="input-group">
                                            <input type="date" id="due_date" className="form-control" aria-describedby="passwordHelpBlock" value={new Date(assignment.due_date).toISOString().split('T')[0]} onChange={
                                                (e) => {dispatch(setAssignmentState({ ...assignment, due_date: e.target.value}))}
                                            }/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="due_time" className="form-label fw-bold fs-6">Due Time</label>
                                        <div className="input-group">
                                            <input type="time" id="due_time" className="form-control" aria-describedby="passwordHelpBlock" value={assignment.due_time} onChange={
                                                (e) => {dispatch(setAssignmentState({ ...assignment, due_time: e.target.value}))}
                                            }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="wd-courses-assignments-edit-assign-card-input-container row">
                                    <div className="col-6">
                                        <label htmlFor="availableFromDate" className="form-label fw-bold fs-6">Available From</label>
                                        <div className="input-group">
                                            <input type="date" id="availableFromDate" className="form-control" aria-describedby="passwordHelpBlock" value={new Date(assignment.available_from_date).toISOString().split('T')[0]} onChange={
                                                (e) => {dispatch(setAssignmentState({ ...assignment, available_from_date: e.target.value}))}
                                            }/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="availableUntilDate" className="form-label fw-bold fs-6">Untill</label>
                                        <div className="input-group">
                                            <input type="date" id="availableUntilDate" className="form-control" aria-describedby="passwordHelpBlock" value={new Date(assignment.available_to_date).toISOString().split('T')[0]} onChange={
                                                (e) => {dispatch(setAssignmentState({ ...assignment, available_to_date: e.target.value}))}
                                            }/>
                                        </div>
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





