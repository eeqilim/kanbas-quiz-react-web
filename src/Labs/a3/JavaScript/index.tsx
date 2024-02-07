import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariablesTypes from "./variables/VariableTypes";
import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import TenaryOperator from "./conditionals/TernaryOperator";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House";
import Spreading from "./json/Spreading";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./json/FunctionDestructing";


function JavaScript() {
    console.log("Hello World!");

    return (
        <div>
            <h1>JavaScript</h1>
            <VariablesAndConstants />
            <br /><br />
            <VariablesTypes />
            <br /><br />
            <BooleanVariables />
            <br /><br />
            <IfElse />
            <br /><br />
            <TenaryOperator />
            <br /><br />
            <WorkingWithFunctions />
            <br /><br />
            <WorkingWithArrays />
            <br /><br />
            <TemplateLiterals />
            <br /><br />
            <House />
            <br /><br />
            <Spreading />
            <br /><br />   
            <Destructing />
            <br /><br />
            <FunctionDestructing />
            <br /><br />


        </div>
    );
}

export default JavaScript;





