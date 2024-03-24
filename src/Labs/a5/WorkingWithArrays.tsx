import { useEffect, useState } from 'react';
import axios from 'axios';

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";

    const [todo, setTodo] = useState<any>({
        id: 1,
        title: "NodeJS Assignment", 
        description: "Create a NJodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const removeTodo = async (todo: {id: number, title: string, description: string, due: string, completed: boolean}) => {
        const response = await axios.get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };


    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos(response.data);
    };


    const deleteTodo = async (todo: any) => {
        try {
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t: any) => t.id !== todo.id));
        } catch(error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

    const updateTodo = async () => {
        try {
            const response = await axios.put(`${API}/${todo.id}`, todo);
            setTodos(todos.map((t: any) => t.id === todo.id ? todo : t));
            setTodo({});
        } catch(error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };



    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <div>
            <hr/>
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a href={API} className="btn btn-primary m-1">Get Todos</a>


            <br/><br/>
            <h4>Retreving an Item from an Array by ID</h4>
            <input type="number" value={todo.id} onChange={
                (e) => setTodo({ ...todo, id: parseInt(e.target.value) })
            }/>
            <a href={`${API}/${todo.id}`} className="btn btn-primary m-1">Get Todo by ID</a>

            <br/><br/>
            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`} className='btn btn-primary'>Get Completed Todos</a>

            <br/><br/>
            <h4>Creating new Items in an Array</h4>
            <a href={`${API}/create`} className="btn btn-primary m-1">Create Todo</a>


            <br/><br/>
            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`} className='btn btn-primary'>Delete Todo with ID = {todo.id}</a>


            <br/><br/>
            <h2>Updating an Item in an Array</h2>
            <input type="number" value={todo.id} onChange={
                (e) => setTodo({ ...todo, id: parseInt(e.target.value) })
            }/>
            <br/>
            <input type="text" value={todo.title} onChange={
                (e) => setTodo({ ...todo, title: e.target.value })
            }/>
            <a href={`${API}/${todo.id}/title/${todo.title}`} className='btn btn-primary'>Update Title to {todo.id}</a>
            
            <br/>
            <input type="text" value={todo.description} onChange={
                (e) => setTodo({ ...todo, description: e.target.value })
            }/>
            <a href={`${API}/${todo.id}/description/${todo.description}`} className='btn btn-primary'>Update Description to {todo.id}</a>

            <br/>
            <label>Completed
            <input type="checkbox" checked={todo.completed} onChange={
                (e) => setTodo({ ...todo, completed: e.target.checked })
            }/></label>
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} className='btn btn-primary'>Update Completed to {todo.id}</a> 

            <br/><br/><br/>
            
            
            <input value={todo.id} readOnly type="number" />
            <br/>
            <input value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} type="text" />
            <br/>
            <textarea value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
            <br/>
            <input value={todo.due} type="date" onChange={(e) => setTodo({ ...todo, due: e.target.value })} />
            <br/>
            <label>
                <input checked={todo.completed} type="checkbox" onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} />
                Completed
            </label>

            <br/>
            <button onClick={postTodo} className='btn btn-warning'>Post Todo</button>

            <br/>
            <button className="btn btn-primary" onClick={createTodo}>Create Todo</button>
            <br/>
            <button className="btn btn-success" onClick={updateTodo}>Update Todo</button>

            { errorMessage && 
                <div className="alert alert-danger mb-2 bt-2">
                    {errorMessage}
                </div>    
            }

            <ul className="list-group">
                { todos.map((todo: any) => (
                    <li key={todo.id} className="list-group-item">
                        <input checked={todo.completed} type="checkbox" readOnly/>

                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>

                        <button className="btn btn-danger ms-2 float-end"onClick={() => deleteTodo(todo)} >Remove</button>

                        <button onClick={() => fetchTodoById(todo.id)} className="btn btn-warning ms-2 float-end">Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WorkingWithArrays;