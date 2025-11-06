function Profile() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [msg, setMsg] = React.useState("");

    React.useEffect(() => {
        ajax_alt("webUser/Profile", function (obj) {
                console.log("Ajax Success");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    setMsg(<strong><em>{obj.errorMsg}</em></strong>);
                } else if (obj.webUserId == '') {
                    setMsg(<strong><em>Web User Not Found.</em></strong>);
                }
                else {
                    setMsg(
                        <div className="login">
                            <h2>Welcome Web User {obj.webUserId} </h2>
                            Email: {obj.userEmail}
                            <br />
                            Birthday: {obj.birthday} <br />
                            MembershipFee: {obj.membershipFee} <br />
                            User Role: {obj.userRoleId} {obj.userRoleType} <br />
                            <p> <img src={obj.userImage} alt="User" /> </p>
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
    },
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
