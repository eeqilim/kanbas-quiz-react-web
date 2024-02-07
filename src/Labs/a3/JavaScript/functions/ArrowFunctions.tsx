function ArrowFunctions() {
    const substract = (a: number, b: number) =>  a - b;

    const threeMinusOne = substract(3, 1);
    console.log(threeMinusOne);

    return (
        <>
            <h3>New ES6 arrow functions</h3>
            threeMinusOne = { threeMinusOne }<br />
            substract(3, 1) = { substract(3, 1) }<br />
        
        </>
    )
}
export default ArrowFunctions;