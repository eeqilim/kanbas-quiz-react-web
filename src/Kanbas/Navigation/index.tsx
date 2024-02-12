import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaRegClock, FaTv, FaRegArrowAltCircleRight, FaRegQuestionCircle } from "react-icons/fa";

function KanbasNavigation() {
    const links = [
        { label: "Account",     icon: <FaRegUserCircle              className="fs-3"        id="wd-kanbas-navigation-account-icon"/> },
        { label: "Dashboard",   icon: <FaTachometerAlt              className="fs-3" /> },
        { label: "Courses",     icon: <FaBook                       className="fs-3" /> },
        { label: "Calendar",    icon: <FaRegCalendarAlt             className="fs-3" /> },
        { label: "Inbox",       icon: <FaInbox                      className="fs-3" /> },
        { label: "History",     icon: <FaRegClock                   className="fs-3" /> },
        { label: "Studio",      icon: <FaTv                         className="fs-3" /> },
        { label: "Commons",     icon: <FaRegArrowAltCircleRight     className="fs-3" /> },
        { label: "Help",        icon: <FaRegQuestionCircle          className="fs-3" /> }
    ];

    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li>
                <a href="http://northeastern.edu">
                    <div>
                        <img src="/images/neu-logo-img.jpg" alt="Northeastern University" />
                    </div>
                </a>
            </li>


            { links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> 
                        <div>{link.icon}</div>
                        {link.label} 
                    </Link>
                </li>
            )) }
        
        </ul>    
    );   
}
export default KanbasNavigation;