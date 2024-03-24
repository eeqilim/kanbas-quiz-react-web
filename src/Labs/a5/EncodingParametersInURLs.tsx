import { useState, useEffect } from "react";
import axios from "axios";


function EncodingParametersInURLs() {
    const [a, setA] = useState(34);
    const [b, setB] = useState(23);

    const [welcome, setWelcome] = useState("original");
    const fetchWelcome = async () => {
        const response = await axios.get("http://localhost:4000/a5/welcome");
        setWelcome(response.data);
    };


    const [result, setResult] = useState(0);
    const fetchSum = async (a: number, b: number) => {
        const response = await axios.get(`http://localhost:4000/a5/add/${a}/${b}`);
        setResult(response.data);
    };
    const fetchSubstract = async (a: number, b: number) => {
        const response = await axios.get(`http://localhost:4000/a5/substract/${a}/${b}`);
        setResult(response.data);
    };

    useEffect(() => {
        fetchWelcome();
    }, []);

    return (
        <div>

            <h3>Encoding Parameters In URLs</h3>

            <h4>Integrating React with APIs</h4>
            <h5>Fetching Welcome</h5>
            <h6>{welcome}</h6>



            <h4>Calculator</h4>
            <input className="" type="number" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
            <input type="number" value={b} onChange={(e) => setB(parseInt(e.target.value))} />  

            <br/>
            <label>Result: <input value={result} type="number" readOnly></input></label>
            
            <h3>Fetch Result</h3>
            <button onClick={() => fetchSum(a, b)} className="btn btn-primary m-1">Add {a} + {b}</button>
            <button onClick={() => fetchSubstract(a, b)} className="btn btn-danger m-1">Substract {a} - {b}</button>



            <h3>Path Parameters</h3>
            <a className="btn btn-primary m-1" href={`http://localhost:4000/a5/add/${a}/${b}`}>Add {a} + {b}</a>
            <a className="btn btn-danger m-1" href={`http://localhost:4000/a5/substract/${a}/${b}`}>Substract {a} - {b}</a>
            <a className="btn btn-warning m-1" href={`http://localhost:4000/a5/multiply/${a}/${b}`}>Multiply {a} * {b}</a>
            <a className="btn btn-info m-1" href={`http://localhost:4000/a5/divide/${a}/${b}`}>Divide {a} / {b}</a>


            <h3>Query Parameters</h3>
            <a className="btn btn-primary m-1" href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>Add {a} + {b}</a>
            <a className="btn btn-danger m-1" href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>Subtract {a} - {b}</a>
            <a className="btn btn-warning m-1" href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>Multiply {a} * {b}</a>
            <a className="btn btn-info m-1" href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>Divide {a} / {b}</a>


        </div>
    );
}

export default EncodingParametersInURLs;
