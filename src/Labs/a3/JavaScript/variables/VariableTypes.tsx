function VariablesTypes() {
    let numberVariable = 123;
    let floatingPointNumber = 234.345;
    let stringVariable = 'Hello World!';
    let booleanVariable = true; 
    let isNumber = typeof numberVariable;
    let isFloatingPoint = typeof floatingPointNumber;
    let isString = typeof stringVariable;
    let isBoolean = typeof booleanVariable;
    return (
        <div>
            <h2>Variables Types</h2>
            numberVariable = { numberVariable }<br />
            floatingPointNumber = { floatingPointNumber }<br />
            stringVariable = { stringVariable }<br />
            booleanVariable = { booleanVariable + "" }<br />
            isNumber = { isNumber }<br />
            isFloatingPoint = { isFloatingPoint }<br />
            isString = { isString }<br />
            isBoolean = { isBoolean }<br />
        </div>
    )
}
export default VariablesTypes;