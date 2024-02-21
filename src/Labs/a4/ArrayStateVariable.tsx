import { useState } from "react";
function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };

    return (
        <div>
            <h2>Array State Variable</h2>
            <button onClick={addElement} className="btn btn-success">Add Element</button>
            <ul className="list-group">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <span className="me-2">{item}</span>
                        <button onClick={() => deleteElement(index)} className="btn btn-danger">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
export default ArrayStateVariable;