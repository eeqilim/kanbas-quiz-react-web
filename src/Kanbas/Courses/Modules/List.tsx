import { useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaLink, FaPlus, FaCaretDown, FaRegCheckCircle, FaBootstrap } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { moduleType, moduleLessonType, KanbasState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule } from "./modulesReducer";

function ModuleList() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules).filter((module) => module.course === courseId);
    const module = useSelector((state: KanbasState) => state.modulesReducer.module);

    const [addModuleFormOpen, setAddModuleFormOpen] = useState(false);

    const [lessonState, setLessonState] = useState<moduleLessonType>({
        _id: "L000", 
        name: "",
        url: "",
        indent: 0,
        module: ""
    })

    const addLesson = (lesson: moduleLessonType, module: moduleType) => {
        dispatch(setModule(module));
        dispatch(updateModule({ ...module, lessons: [...module.lessons, { ...lesson, _id: `L${new Date().getTime().toString()}`, module: module._id }] }));    
    }

    const deleteLesson = (lessonId: string, module: moduleType) => {
        dispatch(setModule(module));
        dispatch(updateModule({ ...module, lessons: module.lessons.filter((lesson) => lesson._id !== lessonId) }));
    }

    const updateLesson = (lesson: moduleLessonType, module: moduleType) => {
        dispatch(setModule(module));
        dispatch(updateModule({ ...module, lessons: module.lessons.map((l) => l._id === lesson._id ? lesson : l) }));
    }

    return (
        <>
            {/* TOP Buttons */}
            <ul className="nav nav-pills wd-modules-top-buttons-row justify-content-end">
                <li className="nav-item">
                    <a className="btn wd-modules-top-buttons" href="#">Collapse All</a>
                </li>
                <li className="nav-item">
                    <a className="btn wd-modules-top-buttons" href="#">View Progress</a>
                </li>
                <li className="nav-item">
                    <a className="btn wd-modules-top-buttons" href="#">
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
                    <Button onClick={() => setAddModuleFormOpen(!addModuleFormOpen)} aria-controls="addModuleForm" aria-expanded={addModuleFormOpen} className="btn btn-danger">
                        <span className="wd-modules-button-icon-left">
                            <FaPlus />
                        </span>
                        Module
                    </Button>
                </li>
                <li className="nav-item">
                    <a className="btn wd-modules-top-buttons" href="#">
                        <span>
                            <FaEllipsisV />
                        </span>
                    </a>
                </li>
            </ul>
            <hr />

            {/* AddModule Collapse Form */}
            <Collapse in={addModuleFormOpen}>
                <div className="row mb-3" id="addModuleForm">
                    <div className="col-auto">
                        <input placeholder="New Module Name" value={module.name} onChange={(e) => dispatch(setModule({...module, name: e.target.value}))} className="form-control"/>
                    </div>
                    <div className="col-auto float-end">
                        <Button className="btn btn-danger me-2" onClick={() =>{dispatch(addModule({...module, course: courseId}))}}>Add Module</Button>
                        <Button className="btn btn-secondary" onClick={() => dispatch(updateModule(module))}>Update Module</Button>
                    </div>
                </div>
            </Collapse>

            {/* Module List */}
            <ul className="list-group wd-modules">

                { moduleList.map((module, index) => (
                    <li key={ module._id } className="list-group-item">
                        
                        <div>
                            <FaEllipsisV className="me-2" />{module.name}
                            <div className="float-end top-0">
                                <FaCheckCircle className="text-success" />
                                <a style={{backgroundColor: "gainsboro", color: "black"}} type="button" data-bs-toggle="collapse" href={`#addLessonForm-${module._id}`} className="me-1"><FaPlusCircle className="ms-2" /></a>
                                
                                <div className="dropend d-inline">
                                    <a className="btn p-0 ps-1 pe-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaEllipsisV />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => dispatch(deleteModule(module._id))}>Delete Module</button></li>
                                        <li><button className="dropdown-item" onClick={(e) => {
                                            setAddModuleFormOpen(true);
                                            dispatch(setModule(module));
                                            }}>Edit Module</button></li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        {/* AddLesson Collapse Form */}
                        <div className="collapse " id={`addLessonForm-${module._id}`}>
                            <hr/>
                            <input placeholder="New Lesson Name" value={lessonState.name} onChange={(e) => setLessonState({...lessonState, name: e.target.value})} className="mb-1 form-control"/>

                            <input placeholder="New Lesson URL" value={lessonState.url} onChange={(e) => setLessonState({...lessonState, url: e.target.value})} className="mb-1 form-control"/>
                            
                            <div className="mb-1">
                                <label><input className="me-1" type="checkbox" checked={lessonState.indent === 1 ? true : false} onChange={(e) => setLessonState({...lessonState, indent: e.target.checked ? 1 : 0})}/>Indent</label>
                            </div>
                            <button className="btn btn-danger me-2" onClick={() => { addLesson(lessonState, module) }}>Add Lesson</button>
                            <button className="btn btn-secondary" onClick={() => { updateLesson(lessonState, module)}}>Update Lesson</button>
                        </div>
                        
                        <ul className="list-group">
                            {module.lessons?.map((lesson) => (
                                <li key={ lesson._id } className="list-group-item">
                                    
                                    <FaEllipsisV className="me-2" />
                                    {lesson.url === "" ? null : <FaLink className="text-success wd-modules-link-icon"/>}
                                    <span className={ lesson.url === "" ? `wd-modules-text-indent-${ lesson.indent }` : `wd-modules-link-indent-1`}>
                                        {lesson.url === "" ? lesson.name : <Link className="wd-modules-link" to={lesson.url}>{lesson.name}</Link>}
                                    </span>

                                    <div className="float-end">
                                        <FaCheckCircle className="text-success" />

                                        <div className="dropend d-inline" style={{ minWidth: 'auto', width: 'max-content' }}>
                                            <a className="btn p-0 ps-1 pe-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FaEllipsisV />
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><button className="dropdown-item" onClick={() => deleteLesson(lesson._id, module)}>Delete Lesson</button></li>
                                                <li><button className="dropdown-item" onClick={() => setLessonState(lesson)}>Edit Lesson</button></li>
                                            </ul>
                                        </div>
    
                                    </div>
                                
                                </li>
                            ))}
                        </ul>
                       
                    </li>
                ))}

            </ul>
        </>
    );
}
export default ModuleList;
