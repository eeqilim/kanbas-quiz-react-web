import { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithObejcts() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment";

    const [module, setModule] = useState({
        id: "1", name: "module1", description: "NodeJS", course: "CS5610",
    });

    const fetchAssignment = async () => {
        const respons = await axios.get(ASSIGNMENT_URL);
        setAssignment(respons.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };

    useEffect(() => {
        fetchAssignment();
    }, []);



    return (
        <div>
            <h2>Working With Objects</h2>

            <h3>Modifying Properties</h3>
            
            <input type="text" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}/>
            <button className="btn btn-primary" onClick={updateTitle}>Update Title to: {assignment.title}</button>
            <button className="btn btn-secondary" onClick={fetchAssignment}>Fetch Assignment</button>
       



            
            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary m-1" href="http://localhost:4000/a5/assignment">Get Asssignment</a>

            <a className="btn btn-secondary m-1" href="http://localhost:4000/a5/assignment/title">Get Asssignment Title</a>
            <a className="btn btn-secondary m-1" href="http://localhost:4000/a5/assignment/description">Get Asssignment Decription</a>


            <h4>Modifying Properties</h4>
            <input type="text" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`} className="btn btn-primary m-1">Update Title</a>

            <br/>
            <input type="number" value={assignment.score} onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
            <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`} className="btn btn-secondary m-1">Update Score</a>

            <br/>
            <label className="me-1">
                Completed 
                <input type="checkbox" checked={assignment.completed} onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
            </label>
            
            <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`} className="btn btn-secondary m-1">Update Completed</a>



            <br/><br/><br/><br/>
            <h4>Module</h4>
            <a href={"http://localhost:4000/a5/module"} className="btn btn-primary m-1">Get Module</a>
            <a href={"http://localhost:4000/a5/module/name"} className="btn btn-secondary m-1">Get Module Name</a>
            <br/>
            
            <input type="text" value={module.name} onChange={(e) => setModule({ ...module, name: e.target.value})}/>
            <a href={`http://localhost:4000/a5/module/name/${module.name}`} className="btn btn-primary m-1">Update Module Name</a>

            <br/>
            <input type="text" value={module.description} onChange={(e) => setModule({ ...module, description: e.target.value})}/>
            <a href={`http://localhost:4000/a5/module/description/${module.description}`} className="btn btn-secondary m-1">Update Module Description</a>

        </div>
    )
}

export default WorkingWithObejcts;