function add(a: number, b: number) {
    alert(`${a} + ${b} = ${a + b}`);
}

function PassingDataOnEvent() {
    return (
        <div>
            <h2>Passing Data on Event</h2>
            <button onClick={() => add(2, 3)}>Pass 2 and 3 to add()</button>
            
        </div>
    )
}
export default PassingDataOnEvent;