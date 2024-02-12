import {Link} from "react-router-dom";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import TopHiddenKanbasNavigation from "./Navigation/TopHiddenKanbasNavigation";

function Kanbas() {
    return(
        <>
        <div className="d-none d-md-block">
            <KanbasNavigation />
        </div>

        <div className="d-flex">

            <div className="d-none d-md-block" style={{ flex: "0 0 84px" }}></div>
  
            <div className="flex-fill">

                
                <TopHiddenKanbasNavigation />




                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="Account" element={<h1>Account</h1>} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="Courses/:courseId/*" element={<Courses />} />
                </Routes>
            </div>
        </div>
        
        
        </>
    )
}
export default Kanbas;