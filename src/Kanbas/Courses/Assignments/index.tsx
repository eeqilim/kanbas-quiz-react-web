import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaPlus, FaSortDown } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import "./index.css";   
import { useEffect, useState } from "react";
import { Collapse, Button, Modal } from "react-bootstrap";
import { setAssignments, addAssignmentGroup, setAssignmentGroupState, deleteAssignmentGroup, updateAssignmentGroup, setAssignmentState, deleteAssignment, resetAssignmentState, resetAssignmentGroupState } from "./assignmentsReducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";



import * as client from "./client";


function DeleteAssignmentModal({ show, onClose, onDelete }: { show: boolean, onClose: () => void, onDelete: () => void}) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this assignment?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {onClose()}}>Cancel</Button>
                <Button variant="danger" onClick={() => {onDelete()}}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}


function Assignments() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        client.findAssignmentsForCourse(courseId).then((assignments) => dispatch(setAssignments(assignments)));
        
    }, [courseId]);


    const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignmentGroupState = useSelector((state: KanbasState) => state.assignmentsReducer.assignmentGroup);
    const assignmentState = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const [assignmentGroupFormCollapse, setAssignmentGroupFormCollapse] = useState(false);
    const modules = useSelector((state: KanbasState) => state.modulesReducer.modules);

    function formatDate(inputDate : string) {
        const date = new Date(inputDate);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()-1];
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }

    const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] = useState(false);

    const handleDeleteAssignment = () => {
        client.deleteAssignmentItem(assignmentGroupState._id, assignmentState._id)
        dispatch(deleteAssignment({assignmentGroupId: assignmentGroupState._id, assignmentId: assignmentState._id}));
        setShowDeleteAssignmentModal(false);
        dispatch(resetAssignmentGroupState());
        dispatch(resetAssignmentState());
    }


    const handleAddAssignmentGroup = () => {
        if (assignmentGroupState.category === "" || assignmentGroupState.total_grade_percentage > 100 || assignmentGroupState.total_grade_percentage < 0) {
            return;
        }
        client.createAssignmentGroup(courseId, assignmentGroupState)
        .then((newAssignmentGroup) => {
            dispatch(addAssignmentGroup(newAssignmentGroup)); 
            dispatch(resetAssignmentGroupState());
        });
    }
    const handleDeleteAssignmentGroup = (assignmentId: string) => {
        client.deleteAssignmentGroup(assignmentId)
        .then((status) => {
            dispatch(deleteAssignmentGroup(assignmentId))
        });
    }
    const handleUpdateAssignmentGroup = async () => {
        if (assignmentGroupState.category === "" || assignmentGroupState.total_grade_percentage > 100 || assignmentGroupState.total_grade_percentage < 0) {
            return;
        }
        const status = await client.updateAssignmentGroup(assignmentGroupState);
        dispatch(updateAssignmentGroup(assignmentGroupState));
        dispatch(resetAssignmentGroupState());
    }





    return (
        <div className="flex-fill me-2 ms-2 mt-2">
            <div className="d-flex flex-row justify-content-between ps-3 pe-3">
                <div className="w-25">
                    <input className="form-control" type="text" placeholder="Search for Assignments" title="Search by assignment name"></input>
                </div>
                <div>
                    <Button className="ms-1 border border-dark bg-light text-dark" onClick={() => setAssignmentGroupFormCollapse(!assignmentGroupFormCollapse)}><FaPlus />Group</Button>
                    <div className="d-inline" onClick={() => dispatch(resetAssignmentState())}>
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments/Add`} className="btn ms-1 red-button border border-dark" ><FaPlus />Assignment</Link>
                    </div>
                    <a className="btn ms-1 ps-1 pe-1 border border-dark bg-light"><FaEllipsisV /></a>
                    
                </div>
            </div>
            <hr/>

            {/* Add Assignment Group Form Collapse */}
            <Collapse in={assignmentGroupFormCollapse}> 
                <div className="row mb-3">
                    <div className="col-3">
                        <input placeholder="Assignment Group" className="form-control"
                        value={assignmentGroupState.category}
                        onChange={(e) => dispatch(setAssignmentGroupState({ ...assignmentGroupState, category: e.target.value }))}/>
                    </div>
                    <div className="col-3">
                        <input type="number" min="0" max="100" placeholder="Total Grade Percentage" className="form-control" 
                        value={assignmentGroupState.total_grade_percentage === 0 ? "" : assignmentGroupState.total_grade_percentage}
                        onChange={(e) => dispatch(setAssignmentGroupState({ ...assignmentGroupState, total_grade_percentage: parseInt(e.target.value)}))}/>
                    </div>
                    <div className="col-auto">
                        <Button className="btn btn-danger me-2" onClick={() => {handleAddAssignmentGroup(); setAssignmentGroupFormCollapse(false)}}>Add</Button>
                        <Button className="btn btn-secondary" onClick={() => {handleUpdateAssignmentGroup(); setAssignmentGroupFormCollapse(false)}}>Update</Button>
                    </div>
                </div>
            </Collapse>

            <ul className="list-group wd-courses-assignments">
                { assignmentList.filter((assignment) => assignment.course === courseId).map( (assignment) => (
                     <li key={assignment._id} className="list-group-item">
                        <div>
                            <FaEllipsisV className="me-3 ms-2"/>
                            <a className="btn me-3 " data-bs-toggle="collapse" href={`#collapse-${assignment.category}-list`} role="button" aria-expanded="false" aria-controls={`collapse-${assignment.category}-list`}>
                                <FaSortDown style={{ verticalAlign: "top" }} />
                            </a>
                            <span className="fw-bold">{ assignment.category }</span>
                            <span className="float-end  ms-2">
                                <div className="rounded-pill wd-courses-assignments-grade-percentage d-inline">{assignment.total_grade_percentage} % of Total</div>
                                <a className="btn wd-courses-assignments-icon-link"><FaPlus /></a>

                                <div className="dropleft d-inline">
                                    <a className="btn wd-courses-assignments-icon-link" type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => {
                                            if (assignment.items.length > 0) { alert("Cannot delete assignment group with assignments"); return; };
                                            handleDeleteAssignmentGroup(assignment._id);
                                        }}>Delete Assignment Group</button></li>
                                        <li><button className="dropdown-item" onClick={() => {
                                            setAssignmentGroupFormCollapse(true);
                                            dispatch(setAssignmentGroupState(assignment));
                                        }}>Edit Assignment Group</button></li>
                                    </ul>
                                </div>
                                
                            </span>
                        </div>

                        <div className="collapse show p-0" id={`collapse-${assignment.category}-list`}>
                            <ul className="listGroup">
                                { assignment.items?.map( (item) => (
                                    <li key={item._id} className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <FaEllipsisV className="me-2 ms-2"/>
                                            <HiOutlinePencilSquare className="me-3 ms-2 text-success"/>
                                            <div className="flex-fill">
                                                <div onClick={() => {dispatch(setAssignmentState(item)); console.log(item)}}>
                                                    <Link className="fw-bold assignment-list-link text-dark" to={ `/Kanbas/Courses/${courseId}/Assignments/${assignment._id}/${item._id}` }>
                                                        {item.item_name}
                                                    </Link>
                                                </div>
                                                <div>
                                                    { 
                                                        <Link  className="wd-courses-assignments-minor-text assignment-list-link " to={`/Kanbas/Courses/${courseId}/Modules`}>
                                                            {item.module === "" ? "Multiple Module" : (modules.find((module) => module._id === item.module))?.name}
                                                        </Link> 
                                                    }
                                                </div>
                                                <div className="wd-courses-assignments-minor-text">
                                                    <b>Due</b> {formatDate(item.due_date)}, at {item.due_time} | {item.points} pts
                                                </div>
                                            </div>
                                            <span className="ms-auto">
                                                <FaCheckCircle className="text-success me-1"/>
                                                <div className="dropleft d-inline">
                                                    <a className="btn wd-courses-assignments-icon-link" type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></a>
                                                    <ul className="dropdown-menu">
                                                        <li><button className="dropdown-item" 
                                                            onClick={() => {
                                                                setShowDeleteAssignmentModal(true);
                                                                dispatch(setAssignmentGroupState(assignment));
                                                                dispatch(setAssignmentState(item));
                                                            }}>Delete Assignment</button></li>
                                                        <li><button className="dropdown-item" onClick={() => {dispatch(setAssignmentState(item))}}>
                                                            <Link style={{"textDecoration": "None", "color": "black"}} to={ `/Kanbas/Courses/${courseId}/Assignments/${assignment._id}/${item._id}` }>
                                                                Edit Assignment
                                                            </Link>
                                                        </button></li>
                                                    </ul>
                                                </div>
                                            </span>
                                        
                                        </div>
                                    </li>
                                ))}
                            </ul>


                        </div>
                     </li>
                ))}
                    

            </ul>
            
            <DeleteAssignmentModal
            show={showDeleteAssignmentModal}
            onClose={() => setShowDeleteAssignmentModal(false)}
            onDelete={handleDeleteAssignment}/>
        </div>  

        


    )
}

export default Assignments;