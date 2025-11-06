function Login() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userEmailInput, setUserEmailInput] = React.useState("");
    const [userPassInput, setUserPassInput] = React.useState("");
    const [msg, setMsg] = React.useState("");

    function handleLogin() {
        setIsLoading(true);

        var url = "webUser/getByInfo?email=" + encodeURI(userEmailInput) + "&password=" + encodeURI(userPassInput);

        // 3 parameters: url to call, success, and failure 
        ajax_alt(
            url,
            function (obj) {
                console.log("Ajax Success");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    setMsg(<strong><em>{obj.errorMsg}</em></strong>);
                } else {
                    setMsg(
                        <div className="login">
                            <h2>Welcome Web User {obj.webUserId}</h2>
                            <p>Email: {obj.userEmail}</p>
                            <p>Birthday: {obj.birthday}</p>
                            <p>Membership Fee: {obj.membershipFee}</p>
                            <p>User Role: {obj.userRoleId} {obj.userRoleType}</p>
                            <img src={obj.userImage} alt="User Image" />
                        </div>
                    );
                }
                setIsLoading(false);
            },
            function (errorMsg) {
                console.log("AJAX error message: " + errMsg);
                setMsg("ajax failure: " + errorMsg);
                setIsLoading(false);
            }
        );

    }  // function handleLogin

    if (isLoading) {
        return (
            <div>
                <h1>... Loading ....</h1>
            </div>
        );
    }

    return (
        <div className="login">
            <h2>React Find UI</h2>
            <form>
                <label>Email:</label>
                <input value={userEmailInput} onChange={(e) => setUserEmailInput(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={userPassInput} onChange={(e) => setUserPassInput(e.target.value)} />
                <br />
                <button type="button" onClick={handleLogin}>Log In</button>
            </form>
            <div>{msg}</div>
        </div>
    );
}
