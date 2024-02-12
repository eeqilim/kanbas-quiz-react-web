import { Link, useLocation } from "react-router-dom";
import "./index.css";
function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto Videos", "Discussions", "Announcements", "Pages", "Files", "Rubricks", "Outcomes", "Colleborations", "Syllabus", "Settings"];

    const { pathname } = useLocation();

    function removeWhiteSpace(inputString: string): string {
        return inputString.replace(/\s/g, "");
    }

    return (
        <div className="d-none d-md-block ps-2" style={{ position: "sticky", top: "10px" }}>
            <ul className="wd-courses-navigation ms-1">
                {
                    links.map((link, index) => (
                        <li key={ index } className={pathname.includes(removeWhiteSpace(link)) ? "wd-active" : ""}>
                            <Link to={ removeWhiteSpace(link) }>{ link }</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}
export default CourseNavigation;