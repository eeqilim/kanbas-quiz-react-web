function MapFunction () {
    let numberArray1 = [1, 2, 3, 4, 5, 6];
    const square = (a: number) => a * a;

    const squares = numberArray1.map(square);
    const cubs = numberArray1.map(a => a * a * a);

    return (
        <>
            <h4>Map</h4>
            squares = { squares }<br />
            cubs = { cubs }<br />

        </>
    )
}

export default MapFunction;