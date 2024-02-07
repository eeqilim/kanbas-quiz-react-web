
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndremovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import JsonStringify from "../json/JsonStringify";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";

function WorkingWithArrays() {
    
    var functionScoped = 2;
    let blockScoped = 5; 
    const constant1 = functionScoped - blockScoped;

    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ['string1', 'string2'];
    
    let variableArray1 = [
        functionScoped, blockScoped, 
        constant1, numberArray1, stringArray1
    ]
    
    return (
        <>
            <h1>Working with Arrays</h1>
            numberArray1 = { numberArray1 }<br />
            stringArray1 = { stringArray1 }<br />
            variableArray1 = { variableArray1 }<br />

            <br />
            <ArrayIndexAndLength />
            
            <br />
            <AddingAndremovingDataToFromArrays />

            <br />
            <ForLoops />
            
            <br />
            <MapFunction />

            <br />
            <JsonStringify />
            
            <br />
            <FindFunction />
            
            <br />
            <FindIndex />

            <br />
            <FilterFunction />
        </>
    )
}

export default WorkingWithArrays;