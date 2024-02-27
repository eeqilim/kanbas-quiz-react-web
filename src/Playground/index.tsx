import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';   
import { useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';


function Mnb({d = ["c"]}) {
    const a = ["b", 1];
    const e = [...a, ...d, ...a]
    return (
        <div>
            <p>{e}</p>
        </div>
    )
}


function Playground() {

    return (
        <div>
            <h1>Playground</h1>
            <Mnb d={["a"]} />
        </div>
    )
}
export default Playground;