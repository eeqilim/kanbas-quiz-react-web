function TenaryOperator() {
  let loggedIn = true;

  return (
    <div>
        <h2>Logged In</h2>
        { loggedIn ? <p>Welcome</p> : <p>Please log in</p>}
    </div>
  )
}
export default TenaryOperator;