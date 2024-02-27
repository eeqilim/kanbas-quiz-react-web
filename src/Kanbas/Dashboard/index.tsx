import { Link } from "react-router-dom";
import { FaBullhorn, FaPenToSquare, FaRegComments, FaRegFolder } from "react-icons/fa6";
import "./index.css";


export type courseType = {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    term: string;
    image: string;
};


function Dashboard({ courses, course, setCourses, setCourse, addNewCourse, deleteCourse, updateCourse }: { courses: courseType[], course: courseType, setCourses: any, setCourse: any, addNewCourse: any, deleteCourse: any, updateCourse: any }) {
   
    let numberOfCourse = courses.length;

    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <hr/>
            <h3 className="flex-fill">Published Courses ({ numberOfCourse })</h3>  
            <hr/>

            <h5>Add Course</h5>
            <input value={course.name} className="form-control" onChange={(e) => setCourse({ ...course, name: e.target.value })}/>
            <input value={course.number} className="form-control" onChange={(e) => setCourse({ ...course, number: e.target.value })}/>
            <input value={course.startDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, startDate: e.target.value })}/>
            <input value={course.endDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, endDate: e.target.value })}/>
            <button onClick={addNewCourse} className="btn btn-secondary me-2">Add</button>
            <button onClick={updateCourse} className="btn btn-secondary me-2">Update</button>

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">

                    {courses.map((course) => (

                        <div key={ course._id } className="col wd-kanbas-dashboard-card-col">
                         
                            <div className="card h-100">
                                                        
                                <img src={ `/images/${ course.image !== "" ? course.image : "dashboard-card-img.jpg" }` } className="card-img-top img-fluid wd-kanbas-dashboard-card-img" alt="course-card-img"/>

                                <div className="card-body d-flex flex-column ">
                                   
                                    <Link className="card-title" to={ `/Kanbas/Courses/${ course._id }/Home` }>
                                        { course.name }
                                        <button className="btn btn-secondary btn-sm ms-2 me-2" onClick={(e) => { e.preventDefault(); deleteCourse(course._id); }}>Delete</button>
                                        <button className="btn btn-secondary btn-sm" onClick={(e) => { e.preventDefault(); setCourse(course); }}>Edit</button>
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