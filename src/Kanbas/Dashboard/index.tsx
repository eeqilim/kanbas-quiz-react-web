import { Link } from "react-router-dom";
import { FaBullhorn, FaPenToSquare, FaRegComments, FaRegFolder } from "react-icons/fa6";
import "./index.css";
import { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import { FaPlus } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";

export type courseType = {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    term: string;
    image: string;
};


function Dashboard({ courses, course, setCourses, setCourse, addNewCourse, deleteCourse, updateCourse, resetCourse }: { courses: courseType[], course: courseType, setCourses: any, setCourse: any, addNewCourse: any, deleteCourse: any, updateCourse: any, resetCourse: any }) {
   
    let numberOfCourse = courses.length;
    const [addCourseFormCollapse, setAddCourseFormCollapse] = useState(false);

    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <hr/>
            <div>
                <div className="h3 d-inline">Published Courses ({ numberOfCourse })</div>  
                <div className="float-end">
                    <button onClick={() => { resetCourse(); setAddCourseFormCollapse(!addCourseFormCollapse)}} aria-expanded={addCourseFormCollapse} className="btn btn-danger"><FaPlus /> Course</button>
                </div>
            </div>
            <hr/>
            
            {/* Add Course Form Collapse */}
            <Collapse in={addCourseFormCollapse}>
                <div id="addCourseCollapseForm">
                    <div className="fw-bold h4 mb-3">Add Course</div>
                    
                        <div className="mb-3 row">
                            <label htmlFor="addCourseForm-name" className="col-md-2 col-12 col-form-label">Course Name</label>
                            <div className="col-md-10 col-12">
                                <input value={course.name} className="form-control" id="addCourseForm-name" onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder="New Course Name"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="addCourseForm-number" className="col-md-2 col-12 col-form-label">Course Number</label>
                            <div className="col-md-10 col-12">
                                <input value={course.number} className="form-control" onChange={(e) => setCourse({ ...course, number: e.target.value })} placeholder="New Course Number"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="addCourseForm-startDate" className="col-md-2 col-12 col-form-label">Start Date</label>
                            <div className="col-md-10 col-12">
                                <input value={course.startDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, startDate: e.target.value })}/>
                            </div>
                        </div>
                        <div className="mb-3 row"> 
                            <label htmlFor="addCourseForm-endDate" className="col-md-2 col-12 col-form-label">End Date</label>
                            <div className="col-md-10 col-12">
                                <input value={course.endDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, endDate: e.target.value })}/>
                            </div>
                        </div>
                        
                        <div className="col mt-2">
                            <button onClick={addNewCourse} className="btn btn-danger me-2">Add</button>
                            <button onClick={updateCourse} className="btn btn-secondary me-2">Update</button>
                        </div>
                    
                </div>
            </Collapse>

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">

                    {courses.map((course) => (

                        <div key={ course._id } className="col wd-kanbas-dashboard-card-col">
                         
                            <div className="card h-100">
                                <div style={{ position: "relative"}}>    
                                    <img src={ `/images/${ course.image !== "" ? course.image : "dashboard-card-img.jpg" }` } className="card-img-top img-fluid wd-kanbas-dashboard-card-img" alt="course-card-img"/>
                                   
                                    <div className="dropstart d-inline"  style={{position:"absolute", top:"5px", right:"5px"}}>
                                        <a type="button" className="btn btn-danger p-1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FaEllipsisVertical />
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" onClick={(e) => { e.preventDefault(); deleteCourse(course._id); }}>Delete</button></li>
                                            <li><button className="dropdown-item" onClick={(e) => { e.preventDefault(); setCourse(course); setAddCourseFormCollapse(true)}}>Edit</button></li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="card-body d-flex flex-column ">
                                   
                                    <Link className="card-title" to={ `/Kanbas/Courses/${ course._id }/Home` }>
                                        { course.name }
                                    </Link>
                                    

                                    <p className="card-text">{ course.number }</p>
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