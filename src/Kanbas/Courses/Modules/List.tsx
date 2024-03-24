import { useState, useEffect, useRef } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaLink, FaPlus, FaCaretDown, FaRegCheckCircle, FaBootstrap } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { moduleType, moduleLessonType, KanbasState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, deleteModule, updateModule, setModule, resetModuleState } from "./modulesReducer";

import * as client from "./client";

function ModuleList() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        client.findModulesForCourse(courseId).then((modules) => dispatch(setModules(modules)));
    }, [courseId]);

    
    
    const moduleListState = useSelector((state: KanbasState) => state.modulesReducer.modules);
    const moduleState = useSelector((state: KanbasState) => state.modulesReducer.module);

    const [addModuleFormOpen, setAddModuleFormOpen] = useState(false);
    const [addLessonFormOpen, setAddLessonFormOpen] = useState(false);
    const addLessonFormRef = useRef<HTMLDivElement>(null);

    const goToAddLessonForm = () => {
        setAddModuleFormOpen(false);
        setAddLessonFormOpen(true);
        if (addLessonFormRef.current) {
            addLessonFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const [lessonState, setLessonState] = useState<moduleLessonType>({
        _id: "",
        name: "",
        url: "",
        indent: 0,
        module: "",
    })

    const handleAddModule = () => {
        client.createModule(courseId, moduleState).then((module) => { dispatch(addModule(module)) });
    }
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {dispatch(deleteModule(moduleId))});
    }
    const handleUpdateModule = async () => {
        const status = await client.updateModule(moduleState);
        dispatch(updateModule(moduleState));
    }




    const addLesson = (lesson: moduleLessonType, module: moduleType) => {
        client.createLesson(module._id, lesson)
        .then((newLesson) => {
            dispatch(updateModule({ ...module, lessons: [...module.lessons, newLesson] }));
        });
    }
    const deleteLesson = (lessonId: string, module: moduleType) => {
        client.deleteLesson(module._id, lessonId) 
        .then ((status) => {
            dispatch(updateModule({ ...module, lessons: module.lessons.filter((lesson) => lesson._id !== lessonId) }));
        });
        
    }
    const updateLesson = async (lesson: moduleLessonType, module: moduleType) => {
        const status = await client.updateLesson(module._id, lessonState)
        dispatch(updateModule({ ...module, lessons: module.lessons.map((l) => l._id === lesson._id ? lesson : l) }));
    }
    const resetLessonState = () => {
        setLessonState({
            _id: "",
            name: "",
            url: "",
            indent: 0,
            module: "",
        })
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
                    <Button onClick={() => {setAddModuleFormOpen(true); dispatch(resetModuleState())}} aria-controls="addModuleForm" aria-expanded={addModuleFormOpen} className="btn btn-danger">
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
                        <input placeholder="New Module Name" value={moduleState.name} onChange={(e) => dispatch(setModule({...moduleState, name: e.target.value}))} className="form-control"/>
                    </div>
                    <div className="col-auto float-end">
                        <Button className="btn btn-danger me-2" onClick={() => {handleAddModule(); setAddModuleFormOpen(false)} }>Add Module</Button>
                        <Button className="btn btn-secondary" onClick={() => {handleUpdateModule(); setAddModuleFormOpen(false)}}>Update Module</Button>
                    </div>
                </div>
            </Collapse>

            {/* AddLesson Collapse Form */}
            <Collapse in={addLessonFormOpen}>
                <div className="mb-2 pt-2" ref={addLessonFormRef}>
                <input placeholder="New Lesson Name" value={lessonState.name} onChange={(e) => setLessonState({...lessonState, name: e.target.value})} className="mb-1 form-control"/>

                <input placeholder="New Lesson URL" value={lessonState.url} onChange={(e) => setLessonState({...lessonState, url: e.target.value})} className="mb-1 form-control"/>
                
                <div className="mb-1">
                    <label><input className="me-1" type="checkbox" checked={lessonState.indent === 1 ? true : false} onChange={(e) => setLessonState({...lessonState, indent: e.target.checked ? 1 : 0})}/>Indent</label>
                </div>
                <button className="btn btn-danger me-2" onClick={() => { addLesson(lessonState, moduleState); setAddLessonFormOpen(false) }}>Add Lesson</button>
                <button className="btn btn-secondary" onClick={() => { updateLesson(lessonState, moduleState); setAddLessonFormOpen(false) }}>Update Lesson</button>
                </div>
            </Collapse>



            {/* Module List */}
            <ul className="list-group wd-modules">

                { moduleListState.map((module, index) => (
                    <li key={ module._id } className="list-group-item">
                        
                        <div>
                            <FaEllipsisV className="me-2" />{module.name}
                            <div className="float-end top-0">
                                <FaCheckCircle className="text-success" />
                                <a onClick={() => {dispatch(setModule(module)); resetLessonState(); goToAddLessonForm()}} style={{backgroundColor: "gainsboro", color: "black"}} type="button" data-bs-toggle="collapse" className="me-1">
                                    <FaPlusCircle className="ms-2" />
                                </a>
                                
                                <div className="dropend d-inline">
                                    <a className="btn p-0 ps-1 pe-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaEllipsisV />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => handleDeleteModule(module._id)}>Delete Module</button></li>
                                        <li><button className="dropdown-item" onClick={(e) => {
                                            setAddModuleFormOpen(true);
                                            dispatch(setModule(module));
                                            }}>Edit Module</button></li>
                                    </ul>
                                </div>
                                
                            </div>
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
                                                <li><button className="dropdown-item" onClick={() => {dispatch(setModule(module)); setLessonState(lesson); goToAddLessonForm()}}>Edit Lesson</button></li>
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
