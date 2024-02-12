import { Link } from "react-router-dom";
import { courses } from "../Database";
import { FaBullhorn, FaPenToSquare, FaRegComments, FaRegFolder } from "react-icons/fa6";
import "./index.css";

function Dashboard() {
    let numberOfCourse = courses.length;

    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <hr/>
            <h3>Published Courses ({ numberOfCourse })</h3>  
            <hr/>

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">

                    {courses.map((course) => (

                        <div key={ course._id } className="col wd-kanbas-dashboard-card-col">
                         
                            <div className="card h-100">

                                <img src={ `/images/${ course.image !== "" ? course.image : "dashboard-card-img.jpg" }` } className="card-img-top img-fluid wd-kanbas-dashboard-card-img"/>

                                <div className="card-body d-flex flex-column ">
                                   
                                    <Link className="card-title" to={ `/Kanbas/Courses/${ course._id }/Home` }>
                                        { course.name }
                                    </Link>

                                    <p className="card-text">{ course._id }</p>
                                    <p className="card-text"><small className="text-muted">{ course.term }</small></p>
                                    
                                    <div className="row mt-auto pt-1">
                                        <div className="col-3">
                                            <Link to={ `/Kanbas/Courses/${ course._id }/Announcements` } className="btn btn-outline-secondary border-0">
                                                <FaBullhorn />
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to={ `/Kanbas/Courses/${ course._id }/Assignments` } className="btn btn-outline-secondary border-0">
                                                <FaPenToSquare />
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to={ `/Kanbas/Courses/${ course._id }/Discussions` } className="btn btn-outline-secondary border-0">
                                                <FaRegComments />
                                            </Link>
                                        </div>
                                        <div className="col-3">    
                                            <Link to={ `/Kanbas/Courses/${ course._id }/Files` } className="btn btn-outline-secondary border-0">
                                                <FaRegFolder />
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}
export default Dashboard;