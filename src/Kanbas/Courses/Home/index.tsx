import ModuleList from "../Modules/List";
import { useParams } from "react-router-dom";
import "./index.css";

function Home() {
    const { courseId } = useParams();
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
            </div>
        </>
    )
}
export default Home;