"use strict";

const UserSortTable = () => {

    // Common React pattern. Display a "...Loading..." UI (don't try to render)
    // until ajax call is complete.  
    const [isLoading, setIsLoading] = React.useState(true);

    // this is data read (just once) from the DB.
    const [dbList, setDbList] = React.useState([]);

    // if there is an  error (ajax or database), set this state variable
    // and show the error message in the UI.
    const [error, setError] = React.useState(null);

    // the user's input that filters the list. 
    const [filterInput, setFilterInput] = React.useState("");

    // this is the filtered list.
    const [filteredList, setFilteredList] = React.useState([]);

    // useEffect takes two params. The first param is the function to be run. 
    // The second param is a list of state variables that (if they change) will 
    // cause the function (first param) to be run again.
    // RUN ONCE PATTERN: With [] as 2nd param, it runs the 1st param (fn) just once.  
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax_alt(

            "webUser/getAll", // URL for AJAX call to invoke

            // success function (anonymous)
            function (dbList) {   // success function gets obj from ajax_alt
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    console.log("in AjaxUserTable here is web user list (next line):");
                    console.log(dbList.webUserList);
                    setDbList(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
                }
                setIsLoading(false);
            },

            // failure function (also anonymous)
            function (msg) {       // failure function gets error message from ajax_alt
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);

    function callInsert() {
        window.location.hash = "#/userInsert";
    }

    const doFilter = (filterInputVal) => {
        let newList = filterObjList(dbList, filterInputVal);
        console.log("function doFilter. filterInputVal is: " + filterInputVal +
            ". See filtered list on next line:");
        console.log(newList);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    }

    function sortByProp(propName, sortType) {
        const sortedList = [...filteredList].sort((a, b) => {
            if (sortType === "number") {
                if (!a[propName]) return -1; // Move entries with empty values to the top
                if (!b[propName]) return 1;
                return a[propName] - b[propName];
            } else if (sortType === "text") {
                if (!a[propName]) return -1;
                if (!b[propName]) return 1;
                return a[propName].localeCompare(b[propName]);
            } else if (sortType === "date") {
                if (!a[propName]) return -1;
                if (!b[propName]) return 1;
                return new Date(a[propName]) - new Date(b[propName]);
            }
        });
    
        console.log("Sorted list is below");
        console.log(sortedList);
        setFilteredList(sortedList);
    }

    function deleteListEle(theList, indx) {
        let newList = [];
        for (var i = 0; i < theList.length; i++) {
            if (i !== indx) {
                newList.push(theList[i]);
            }
        }
        console.log("here is list after deleting element " + indx);
        console.log(newList);
        return newList;
    }

    // invoke a web API passing in userId to say which record you want to delete. 
    // but also remove the row (of the clicked upon icon) from the HTML table -- 
    // if Web API sucessful... 
    function deleteUser(userObj) {
        console.log("To delete user " + userObj.userEmail + "?");

        if (window.confirm("Do you really want to delete " + userObj.userEmail + "? ")) {
            // Filter out the user to be deleted from the filteredList
            const updatedList = filteredList.filter(item => item.webUserId !== userObj.webUserId);
            setFilteredList(updatedList);

            // Here you can make the API call to delete the user.
            // If the deletion is successful, you can leave a message or handle it as needed.
            // For now, let's log a message.
            console.log("User deleted successfully.");
        }
    } // deleteUser

    if (isLoading) {
        console.log("initial rendering, Data not ready yet...");
        return <div> Loading... </div>
    }

    if (error) {
        console.log(`there must have been an ajax error (e.g., bad URL), 
        or database error (e.g., connection error because not tunnelled in)...`);
        return <div>Error: {error} </div>;
    }

    console.log("Rendering sorted UserTable. sorted list is on next line...");
    console.log(dbList);

    // NOTE: onClick in React has a capital C, unlike the regular JS onclick.
    return (
        <div className="clickSort">
            <h3>
                Web User List &nbsp;
                <img className="insertImg" src="icons/insert.png" onClick={callInsert}></img>
                <br />
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp;
                <button onClick={() => { clearFilter(); }}>Clear</button>
            </h3>
            <table>
                <thead>
                    <tr>
                        <th className="textAlignCenter">Delete</th>
                        <th className="textAlignCenter">Edit</th>
                        <th onClick={() => { sortByProp("webUserId", "number") }}><img className="sort-img" src="icons/sortUpDown16_white.png" />ID</th>
                        <th onClick={() => sortByProp("userEmail", "text")}><img className="sort-img" src="icons/sortUpDown16_white.png" />Email</th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => sortByProp("birthday", "date")} className="textAlignCenter"><img className="sort-img" src="icons/sortUpDown16_white.png" />Birthday</th>
                        <th onClick={() => sortByProp("membershipFee", "number")} className="textAlignRight"><img className="sort-img" src="icons/sortUpDown16_white.png" />Membership Fee</th>
                        <th onClick={() => sortByProp("userRoleId", "number")}><img className="sort-img" src="icons/sortUpDown16_white.png" />Role</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((item, index) =>
                            <tr key={item.webUserId}>
                                <td className="textAlignCenter" onClick={() => deleteUser(item)}>
                                    <img src="icons/delete.png" />
                                </td>
                                <td className="textAlignCenter">
                                    <a href={'#/userUpdate/:' + item.webUserId}><img src="./icons/update.png" className="clickLink" /></a>
                                </td>
                                <td>{item.webUserId}</td>
                                <td>{item.userEmail}</td>
                                <td className="shadowImage textAlignCenter"><img src={item.userImage} /></td>
                                <td className="textAlignCenter">{item.birthday}</td>
                                <td className="textAlignRight">{item.membershipFee}</td>
                                <td className="nowrap">{item.userRoleId} {item.userRoleType}</td>
                                <td>{item.errorMsg}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};