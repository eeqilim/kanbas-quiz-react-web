
function ES5Functions() {

    function add(a: number, b: number) {
        return a + b;
    }

    const twoPlusFour = add(2, 4);
    console.log(twoPlusFour);

    return (
        <>
            <h2>Functions</h2>
            <h3>Lagacy ES5 functions</h3>
            twoPlusFour = { twoPlusFour }<br />
            add(2, 4) = { add(2, 4) }<br />
        </>
    )
}

export default ES5Functions;