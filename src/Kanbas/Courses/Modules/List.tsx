import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaLink, FaPlus, FaCaretDown, FaRegCheckCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.course === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);

    return (
        <>
            <ul className="nav nav-pills wd-modules-top-buttons-row justify-content-end">
                <li className="nav-item">
                    <a className="btn" href="#">Collapse All</a>
                </li>
                <li className="nav-item">
                    <a className="btn" href="#">View Progress</a>
                </li>
                <li className="nav-item">
                    <a className="btn" href="#">
                        <span className="wd-modules-button-icon-left">
                            <FaRegCheckCircle className="text-success"/>
                        </span>
                        Publish All
                        <span className="wd-modules-button-icon-right">
                            <FaCaretDown />
                        </span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="btn" id="button-red" href="#">
                        <span className="wd-modules-button-icon-left">
                            <FaPlus />
                        </span>
                        Module
                    </a>
                </li>
                <li className="nav-item">
                    <a className="btn" href="#">
                        <span>
                            <FaEllipsisV />
                        </span>
                    </a>
                </li>
            </ul>


            <hr />



            <ul className="list-group wd-modules">

                { modulesList.map((module) => (
                    <li key={ module._id } className="list-group-item" onClick={() => setSelectedModule(module)}>
                        
                        <div>
                            <FaEllipsisV className="me-2" />{module.name}
                            <span className="float-end">
                                <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                            </span>
                        </div>

                        {selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson) => (
                                    <li key={ lesson._id } className="list-group-item">
                                        
                                        <FaEllipsisV className="me-2" />
                                        {lesson.url === "" ? null : <FaLink className="text-success wd-modules-link-icon"/>}
                                        <span className={ lesson.url === "" ? `wd-modules-text-indent-${ lesson.indent }` : `wd-modules-link-indent-${ lesson.indent }`}>
                                            {lesson.url === "" ? lesson.name : <Link className="wd-modules-link" to={lesson.url}>{lesson.name}</Link>}
                                        </span>

                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}

            </ul>
        </>
    );
}
export default ModuleList;
