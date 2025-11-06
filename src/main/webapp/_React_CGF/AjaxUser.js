const AjaxUsers = (url) => {

    console.log("AjaxUsers running");

    // Tell React that 'items' (an array of objects) is a state variable 
    // that (when changed) should redisplay this component.
    // Set its initial value to [], an empty array.
    const [items, setItems] = React.useState([]);

    // Tell React that "error" is a state variable that (when changed) 
    // should redisplay this component. Set its initial value to null.
    const [error, setError] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);

    // the user's input that filters the list. 
    const [filterInput, setFilterInput] = React.useState("");

    // this is the filtered list.
    const [filteredList, setFilteredList] = React.useState([]);

    // useEffect 2nd parameter is an array of elements that 
    // (if any of those state variables change) should trigger the function specified 
    // as the 1st useEffect parameter. 
    // RUN ONCE PATTERN: If you put [] as 2nd param, it runs the 1st param (fn) once. 
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax_alt(
            url, // URL for AJAX call to invoke
            //"json/users.json", // URL for AJAX call to invoke
            //"webUser/getAll", // URL for AJAX call to invoke

            // success function (anonymous)
            function (dbList) {   // success function gets obj from ajax_alt
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    console.log("in AjaxUsers, here is web user list (on the next line):");
                    console.log(dbList.webUserList);
                    setItems(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
                }
                setIsLoading(false); // set isLoading last to prevent premature rendering. 
            },

            // failure function (also anonymous)
            function (msg) {       // failure function gets error message from ajax_alt
                setError(msg);
                setIsLoading(false); // set isLoading last to prevent premature rendering.
            }

        );
    }, []);

    function sortByProp(propName, sortType) {
        // sort the user list based on property name and type
        jsSort(filteredList, propName, sortType);
        console.log("Sorted list is below");
        console.log(filteredList);

        // For state variables that are objects or arrays, you have to do 
        // something like this or else React does not think that the state 
        // variable (dbList) has changed. Therefore, React will not re-render 
        // the component.
        let listCopy = JSON.parse(JSON.stringify(filteredList));
        setFilteredList(listCopy);
    }

    const doFilter = (filterInputVal) => {
        let newList = filterObjList(items, filterInputVal);
        console.log("function doFilter. filterInputVal is: " + filterInputVal +
            ". See filtered list on next line:");
        console.log(newList);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    }

    if (isLoading) {
        console.log("Is Loading...");
        return <div> Loading... </div>
    }

    if (error) {
        console.log("Error...");
        return <div>Error: {error} </div>;
    }

    console.log("items for UserTable on next line");
    console.log(items);

    function callInsert() {
        window.location.hash = "#/register";
    }

    return (
        <div className="clickSort">
            <h3>
                Web User List &nbsp;
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp;
                <button onClick={clearFilter}>Clear</button>
                <img src="icons/insert.png" onClick={callInsert}/>
            </h3>
            <table>
                <thead>
                    <tr>
                        <th className = "textAlignLeft" onClick={() => sortByProp("userEmail", "text")} >
                            <img src="icons/sortUpDown16.png" />Email
                        </th>
                        <th className="textAlignCenter">Image</th>

                        <th className = "textAlignRight"onClick={() => sortByProp("birth", "date")} >
                            <img src="icons/sortUpDown16.png" />Birthday
                        </th>
                        <th className="textAlignRight" onClick={() => sortByProp("membershipFee", "number")} >
                            <img src="icons/sortUpDown16.png" />Membership Fee
                        </th>
                        <th onClick={() => sortByProp("userRoleId", "number")} >
                            <img src="icons/sortUpDown16.png" />Role
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((item) =>
                            <tr key={item.webUserId}>
                                <td>
                                <a href={'#/userUpdate/:'+listObj.webUserId}><img src="icons/update.png" 
                                className="clickLink"/></a>
                                </td>
                                <td className="textAlignLeft">{item.userEmail}</td>
                                <td className="shadowImage textAlignCenter"><img src={item.userImage} /></td>
                                <td className="textAlignRight">{item.birthday}</td>
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

}; // function AjaxUsers 