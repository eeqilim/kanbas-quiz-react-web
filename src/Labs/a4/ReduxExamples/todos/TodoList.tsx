import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

import { useSelector } from 'react-redux';
import { LabState, todoType } from '../../../store';


function TodoList() {
    const  { todos } = useSelector((state: LabState) => state.todosReducer);
    return (
        <div>
            <h2>Todo List</h2>
            <ul className="list-group">
                <TodoForm />
                {todos.map((todo: todoType) => (
                    <TodoItem todo={todo} />
                ))}
            </ul>
        </div>
    );
}
export default TodoList;