function Logout() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [msg, setMsg] = React.useState("");

    React.useEffect(
        () => {
        ajax_alt(
            "webUser/Logout",
            function (obj) {
                console.log("Ajax Success");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    setMsg(<strong><em>{obj.errorMsg}</em></strong>);
                } else {
                    setMsg(
                        <div className = "login">
                            <h2> Please retry the logout process</h2>
                        </div>
                    );
                }
                setIsLoading(false);
            },
            function (errorMsg) {
                console.log("Ajax error encountered: " + errorMsg);
                setIsLoading(false);
            }
        )
    } ,
    []
 );
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                msg
            )}
        </div>
    );
    }