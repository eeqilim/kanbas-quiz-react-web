import db from '../../Database';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FaUpload, FaDownload, FaCog, FaFilter, FaSearch } from "react-icons/fa";

import './index.css';

function Grades() {
    const { courseId } = useParams();
    const assignmentGroupList = db.assignments.filter( (assignment) => assignment.course === courseId );
    const getAssignmentList = () => {
        const result = [];
        for (let i=0; i<assignmentGroupList.length; i++) {
            for (let j=0; j<assignmentGroupList[i].items.length; j++) {
                result.push(assignmentGroupList[i].items[j]);
            }
        }
        return result;
    }
    
    const enrollmentsList = db.enrollments.filter( (enrollment) => enrollment.course === courseId );
    const assignmentList = getAssignmentList();
    return (
        <div className="flex-fill me-2 ms-2 container-fluid">
            
            <div className="row mt-3">
                <div className="col d-flex justify-content-end"> 
                    <div className="d-inline ms-2">
                        <a className="btn bg-light border-dark"><FaUpload className='me-1'/>Import</a>
                    </div>
                    <div className="btn-group d-inline ms-2">
                        <button className="btn dropdown-toggle bg-light border-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> 
                            <FaDownload className='me-1'/>
                            Export
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <div className="d-inline ms-2">
                        <a className="btn border-black bg-light"><FaCog /></a>
                    </div>
                </div>
            </div>



            <div className="row mt-3">
                <div className="col">
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="search-student-name" className="form-label"><h3>Student Names</h3></label>
        
                                <div className="input-group">
                                    
                                    <span className="input-group-text search-prepend-magnifying-glass border-end-0">
                                        <FaSearch />
                                    </span>
        
                                    <input className="form-control" type="text" id="search-student-name" placeholder="Search Students" title="Search by student name"/>
                                
                                </div>
        
                            </div>
        
                            <div className="col">
                                <label htmlFor="search-assignment-name" className="form-label"><h3>Assignment Names</h3></label>
        
                                <div className="input-group">
                                    
                                    <span className="input-group-text search-prepend-magnifying-glass border-end-0">
                                        <FaSearch />
                                    </span>
        
                                    <input className="form-control" type="text" id="search-assignment-name" placeholder="Search Assignments" title="Search by student name"/>
                                
                                </div>
                            </div>
                        
                        </div>  
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-4">
                    <button className="btn border-dark bg-light"><FaFilter className='me-1' />Apply Filters</button>
                </div> 
            </div>


            
            
            <div className="row mt-3">
                <div className="col" style={{ width:"1px" }}>
                    {/* TABLE */}
                    <Table responsive className='table table-bordered grading-table table-striped' style={{tableLayout: "fixed"}}>

                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="text-start student-name-col text-nowrap">Stuednt Name</th>
                                    { assignmentList.map( (assignment) => (
                                        <th scope="col" key={assignment.item_id} className="text-center grade-data-column">
                                            <div className="text-nowrap">{ assignment.item_name }</div>
                                            <div className="minor-table-text text-nowrap">Out of { assignment.points }</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                { enrollmentsList.map( (enrollment, index) => {
                                    const user = db.users.find( (user) => user._id === enrollment.user );
                                    return (
                                        <tr key={index}>
                                            <td className="text-nowrap">{user?.firstName} {user?.lastName}</td>
                                            {assignmentList.map( (assignment, index) => {
                                                const grade = db.grades.find( (grade) => grade.student === enrollment.user && grade.assignment === assignment.item_id);
                                                return (<td key={index} className="text-center">
                                                            {grade?.grade || ""}
                                                        </td>);})}
                                        </tr>
                                    );
                                })}
                            </tbody>

                            
                    </Table>


                </div>
            </div>


        </div>
    )
}

export default Grades;
