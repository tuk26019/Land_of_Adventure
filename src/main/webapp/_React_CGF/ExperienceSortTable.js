"use strict";

const ExperienceSortTable = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [filteredList, setFilteredList] = React.useState([]);

    React.useEffect(() => {
        ajax_alt(
            "experience/getAll",
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    const uniqueEmails = [...new Set(dbList.experienceList.map(item => item.user_email))];
                    const uniqueList = dbList.experienceList.filter(item => uniqueEmails.includes(item.user_email));
                    setDbList(uniqueList);
                    setFilteredList(uniqueList);
                }
                setIsLoading(false);
            },
            function (msg) {
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);

    const doFilter = (filterInputVal) => {
        const newList = filterObjList(dbList, filterInputVal);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    }

    function callInsert() {
        window.location.hash = "#/experienceInsert";
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
    function deleteExperience(experienceObj) {
        console.log("To delete experience " + experienceObj.user_email + "?");
    
        if (window.confirm("Do you really want to delete " + experienceObj.user_email + "? ")) {
            const updatedList = filteredList.filter(item => item.experience_id !== experienceObj.experience_id);
            setFilteredList(updatedList);
    
            // Here you can make the API call to delete the experience.
            // If the deletion is successful, you can leave a message or handle it as needed.
            // For now, let's log a message.
            console.log("Experience deleted successfully.");
        }
    } // deleteUser

    if (isLoading) {
        return <div> Loading... </div>
    }

    if (error) {
        return <div>Error: {error} </div>;
    }

    return (
        <div className="clickSort">
            <h3>Experience List&nbsp;
                <img src="icons/insert.png" onClick={callInsert} style={{ width: '20px', height: '20px' }} />
                <br />
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp;
                <button onClick={clearFilter}>Clear</button>
            </h3>
            <table>
                <thead>
                    <tr>
                        <th className="textAlignCenter">Delete</th>
                        <th className="textAlignCenter">Edit</th>
                        <th onClick={() => sortByProp("experience_id", "number")} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" />Experience ID
                        </th>
                        <th onClick={() => sortByProp("location_visit", "text")} >
                            <img src="icons/sortUpDown16.png" />Location Visit
                        </th>
                        <th onClick={() => sortByProp("type_experience", "text")} className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Experience Type
                        </th>
                        <th className="textAlignCenter">Experience Image</th>
                        <th onClick={() => sortByProp("rating", "number")} className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Rating
                        </th>
                        <th onClick={() => sortByProp("cost", "number")} className="textAlignRight" >
                            <img src="icons/whiteSort.png" /> Cost
                        </th>
                        <th onClick={() => sortByProp("date_visit", "date")} className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Date Visit
                        </th>
                        <th onClick={() => sortByProp("user_email", "text")} className="textAlignLeft" >
                            <img src="icons/sortUpDown16.png" />Email
                        </th>
                        <th className="textAlignCenter">User Image</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((listObj) =>
                            <tr key={listObj.experience_id}>
                                <td className="textAlignCenter" onClick={() => deleteExperience(listObj)}>
                                    <img src="icons/delete.png" />
                                </td>
                                <td>
                                    <a href={'#/experienceUpdate/:' + listObj.experience_id}><img src="icons/update.png" className="clickLink" /></a>
                                </td>
                                <td className="textAlignRight">{listObj.experience_id}</td>
                                <td>{listObj.location_visit}</td>
                                <td>{listObj.type_experience}</td>
                                <td className="shadowImage textAlignCenter"><img src={listObj.image_experience} /></td>
                                <td className="textAlignRight">{listObj.rating}</td>
                                <td className="textAlignRight">{listObj.cost}</td>
                                <td className="textAlignCenter">{listObj.date_visit}</td>
                                <td>{listObj.user_email}</td>
                                <td className="shadowImage textAlignCenter"><img src={listObj.user_image} /></td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};