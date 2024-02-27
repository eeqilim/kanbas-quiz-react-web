import ModuleList from "../Modules/List";
import { useParams, Link } from "react-router-dom";
import "./index.css";
import db from "../../Database";
import { FaExclamationCircle } from "react-icons/fa";

function Home() {
    const { courseId } = useParams();
    const getAssignmentList = () => {
        const result = [];
        const assignmentList = db.assignments.filter( (assignment) => assignment.course === courseId );
        for (let i=0; i<assignmentList.length; i++) {
            for (let j=0; j<assignmentList[i].items.length; j++) {
                result.push(assignmentList[i].items[j]);
            }
        }
        return result;
    }
    const assignmentList = getAssignmentList();

    function formatDate(inputDate : string) {
        const date = new Date(inputDate);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()-1];
        const day = date.getDate();
        const formattedDate = `${month} ${day}`;
        return formattedDate;
    }

    return (
        <>
        
            <div className="flex-fill me-2 ms-2">
                <ModuleList />
            </div>

            <div className="flex-grow-0 me-2 d-none d-lg-block" style={{width: "250px"}}>

                    <div className="course-status-section">
                        <h5>Course Status</h5>
            
                        <div className="d-flex wd-home-sameline-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-ban" aria-hidden="true"></i>
                                Unpublish
                            </a>
                            <a className="btn flex-grow-1" id="green-button" href="#">
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                                Published
                            </a>
                        </div>
                        
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                Import Existing Content
                            </a>
                        </div>
            
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                                Import from Commons
                            </a>
                        </div>
            
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-bullseye" aria-hidden="true"></i>
                                Choose Home Page
                            </a>
                        </div>
            
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                View Course Stream
                            </a>
                        </div>
            
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-bullhorn" aria-hidden="true"></i>
                                New Announcement
                            </a>
                        </div>
            
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                New Analytics
                            </a>
                        </div>
            
                        <div className="d-flex wd-home-long-button-container">
                            <a className="btn flex-grow-1" href="#">
                                <i className="fa fa-bell-o" aria-hidden="true"></i>
                                View Course Notifications
                            </a>
                        </div>
                
                    </div>


                    <div className="todo-section">
                        <h5>To Do</h5>
                        <hr/>

                        
                        {
                            assignmentList.map((assignment, index) => (
                                
                                <div key={index} className="d-flex to-do-element-container mt-3">
                                    <div className="to-do-section-icon-container">
                                        <FaExclamationCircle /> 
                                    </div>
                                    <div className="to-do-section-text-container">
                                        <Link to={ `/Kanbas/Courses/${ courseId }/Assignments/${ assignment.item_id }` } className="red-links">{ assignment.item_name }</Link>
                                        <p>{`${ assignment.points } points • ${ formatDate(assignment.due_date) } at ${ assignment.due_time }`}</p>
                                    </div>
                                </div>
                            ))
                        }
                    

                    </div>

            </div>
        </>
    )
}
export default Home;