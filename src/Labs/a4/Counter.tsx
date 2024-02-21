import { useState } from 'react';
function Counter() {
    const [count, setCount] = useState(7);
    console.log(count);
    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => { setCount(count + 1) }} className="btn btn-primary">Up</button>
            <button onClick={() => { setCount(count - 1) }} className="btn btn-primary">Down</button>
        </div>
    )
}
export default Counter;