const TodoItem = ( { todo }: { todo: {title: string, status: string, done: boolean} }) => {

    return (
        <li className="list-group-item">
            <input type="checkbox" className="me-2" defaultChecked={todo.done} />
            {todo.title} ({todo.status})
        </li>
    )
}

export default TodoItem;