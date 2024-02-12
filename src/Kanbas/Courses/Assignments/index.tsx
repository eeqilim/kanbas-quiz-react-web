import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaPlus, FaSortDown } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { assignments, modules } from "../../Database";
import "./index.css";

function Assignments() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter( (assignment) => assignment.course === courseId );


    function formatDate(inputDate : string) {
        const date = new Date(inputDate);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()-1];
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }

    return (
        <div className="flex-fill me-2 ms-2">
            <div className="d-flex flex-row justify-content-between ps-3 pe-3">
                <div className="w-25">
                    <input className="form-control" type="text" placeholder="Search for Assignments" title="Search by assignment name"></input>
                </div>
                <div>
                    <a className="btn ms-1 border border-dark bg-light"><FaPlus />Group</a>
                    <a className="btn ms-1 red-button border border-dark"><FaPlus />Assignment</a>
                    <a className="btn ms-1 ps-1 pe-1 border border-dark bg-light"><FaEllipsisV /></a>
                </div>
            </div>
            <hr/>

            <ul className="list-group wd-courses-assignments">
                { assignmentList.map( (assignment) => (
                     <li key={assignment._id} className="list-group-item">
                        <div>
                            <FaEllipsisV className="me-3 ms-2"/>
                            <a className="btn me-3 " data-bs-toggle="collapse" href={`#collapse-${assignment.category}-list`} role="button" aria-expanded="false" aria-controls={`collapse-${assignment.category}-list`}>
                                <FaSortDown style={{ verticalAlign: "top" }} />
                            </a>
                            <span className="fw-bold">{ assignment.category }</span>
                            <span className="float-end  ms-2">
                                <div className="rounded-pill wd-courses-assignments-grade-percentage d-inline">{assignment.total_grade_percentage} % of Total</div>
                                <a href="#" className="btn wd-courses-assignments-icon-link ms-1"><FaPlus /></a>
                                <a href="#" className="btn wd-courses-assignments-icon-link ms-1"><FaEllipsisV /></a>
                            </span>
                        </div>

                        <div className="collapse show p-0" id={`collapse-${assignment.category}-list`}>
                            <ul className="listGroup">
                                { assignment.items.map( (item) => (
                                    <li key={item.item_id} className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <FaEllipsisV className="me-2 ms-2"/>
                                            <HiOutlinePencilSquare className="me-3 ms-2 text-success"/>
                                            <div className="flex-fill">
                                                <Link className="fw-bold assignment-list-link text-dark" to={ `/Kanbas/Courses/${courseId}/Assignments/${assignment._id}/${item.item_id}` }>
                                                    {item.item_name}
                                                </Link>
                                                <div>{ 
                                                    item.module === "" ? "Multiple Module" : 
                                                    <Link  className="wd-courses-assignments-minor-text assignment-list-link " to={`/Kanbas/Courses/${courseId}/Modules`}>{(modules.find((module) => module._id === item.module))?.name}</Link> }
                                                </div>
                                                <div className="wd-courses-assignments-minor-text">
                                                    <b>Due</b> {formatDate(item.due_date)}, at {item.due_time} | {item.points} pts
                                                </div>
                                            </div>
                                            <span className="ms-auto">
                                                <FaCheckCircle className="text-success me-1"/>
                                                <a href="#" className="btn"><FaEllipsisV /></a>
                                            </span>
                                        
                                        </div>
                                    </li>
                                ))}
                            </ul>


                        </div>
                     </li>
                ))}
                    

            </ul>
            

        </div>

    )
}

export default Assignments;