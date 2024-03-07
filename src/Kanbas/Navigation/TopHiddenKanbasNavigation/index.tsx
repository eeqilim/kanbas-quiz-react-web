import { useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaCaretDown, FaRegUserCircle, FaTachometerAlt, FaBook, FaRegCalendarAlt, FaInbox, FaRegClock, FaTv, FaRegArrowAltCircleRight, FaRegQuestionCircle, FaHome, FaPuzzlePiece, FaBullhorn, FaRegComments, FaBookOpen, FaUsers, FaRegFolder, FaRegNewspaper, FaRocket } from "react-icons/fa";
import { FaBars, FaPenToSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";
import db from "../../Database";

function TopHiddenKanbasNavigation() {
    const links = [
        { label: "Account",     icon: <FaRegUserCircle              className="fs-3" /> },
        { label: "Dashboard",   icon: <FaTachometerAlt              className="fs-3" /> },
        { label: "Courses",     icon: <FaBook                       className="fs-3" /> },
        { label: "Calendar",    icon: <FaRegCalendarAlt             className="fs-3" /> },
        { label: "Inbox",       icon: <FaInbox                      className="fs-3" /> },
        { label: "History",     icon: <FaRegClock                   className="fs-3" /> },
        { label: "Studio",      icon: <FaTv                         className="fs-3" /> },
        { label: "Commons",     icon: <FaRegArrowAltCircleRight     className="fs-3" /> },
        { label: "Help",        icon: <FaRegQuestionCircle          className="fs-3" /> }
    ];
    const courseLinks = [
        { label: "Home", icon: <FaHome /> },
        { label: "Modules", icon: <FaPuzzlePiece /> },
        { label: "Announcements", icon: <FaBullhorn /> },
        { label: "Assignments", icon: <FaPenToSquare /> },
        { label: "Discussions", icon: <FaRegComments /> },
        { label: "Grades", icon: <FaBookOpen /> },
        { label: "People", icon: <FaUsers /> },
        { label: "Files", icon: <FaRegFolder /> },
        { label: "Syllabus", icon: <FaRegNewspaper /> },
        { label: "Quizzes", icon: <FaRocket />}
    ];

    const { pathname } = useLocation();
    const pathList = pathname.split("/");

    

    const renderTopName = () => {
        if (pathList.length === 5) {
            const courseName = db.courses.find( (course) => course._id === pathList[3] )?.name;
            return (
                <>
                    <p className="m-0">{ courseName }</p>
                    <p className="m-0">{ pathList[4] }</p>
                </>
            );
        } else if (pathList.length === 3) {
            return (
                <>
                    <p className="m-0">{ pathList[2]}</p>
                </>
            );
        }
    }

  return (
    <>
    <div className="container-fluid d-block d-md-none top-hidden-nav-container m-0 pb-3 pt-3">
        <div className="row align-items-center">
            <div className="col text-start">
                <a className="btn" data-bs-toggle="collapse" href="#wd-kanbas-navigation-top-hidden-collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <FaBars />
                </a>
            </div>
            <div className="col text-center">
                
                {renderTopName()}
                
            </div>
            <div className="col text-end">
                <a className="btn me-1" href="#">
                    <FaGraduationCap />
                </a>
                { pathList.length === 5 &&
                <a className="btn" data-bs-toggle="collapse" href="#wd-kanbas-course-navigation-top-hidden-collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <FaCaretDown />
                </a>
                }
            </div>
        </div>
    </div>

    <div className="collapse" id="wd-kanbas-navigation-top-hidden-collapse">
        <div className="container-fluid d-block d-md-none fs-4 ms-2 me-2">

            { links.map( (link, index) => (
                <div key={index} className="row mt-2">
                    <div className="col">
                        <Link to={`/Kanbas/${link.label}`} className="red-links">
                            <div>{link.icon} {link.label}</div>
                            
                        </Link>
                    </div>
                </div>
            ))}

        </div>
    </div>
    <div className="collapse" id="wd-kanbas-course-navigation-top-hidden-collapse">
        <div className="container-fluid d-block d-md-none fs-6 me-2">
        { pathList.length === 5 &&
            courseLinks.map( (link, index) => (
                <div key={index} className="row mt-1">
                    <div className="col">
                        <Link to={`/Kanbas/Courses/${pathList[3]}/${link.label}`} className="red-links">
                            <div>{link.icon} {link.label}</div>
                        </Link>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
    </>
  );
}
export default TopHiddenKanbasNavigation;