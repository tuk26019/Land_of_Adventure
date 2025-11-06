"use strict";

const ExperienceTable = () => {

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
                    const updatedList = dbList.experienceList.map(experience => ({ ...experience }));
                    setDbList(updatedList);
                    setFilteredList(updatedList);
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
        let newList = filterObjList(dbList, filterInputVal);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        setFilteredList(dbList);
    };

    const sortByProp = (propName, sortType) => {
        const sortedList = JSON.parse(JSON.stringify(dbList));
        jsSort(sortedList, propName, sortType);
        setFilteredList(sortedList);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="clickSort">
            <div>
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                <button onClick={() => doFilter(filterInput)}>Search</button>
                <button onClick={clearFilter}>Clear</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                                Edit
                        </th>
                        <th onClick={() => sortByProp("location_visit", "text")}>
                            <img src="icons/sortUpDown16.png" />Location
                        </th>
                        <th className="textAlignCenter">Image Experience</th>
                        <th onClick={() => sortByProp("date_visit", "date")} className="textAlignCenter">
                            <img src="icons/blackSort.png" />Date Visit
                        </th>
                        <th onClick={() => sortByProp("cost", "number")} className="textAlignRight">
                            <img src="icons/whiteSort.png" />Cost
                        </th>
                        <th onClick={() => sortByProp("type_experience", "text")}>
                            <img src="icons/sortUpDown16.png" />Type of Experience
                        </th>
                        <th onClick={() => sortByProp("rating", "number")}>
                            <img src="icons/sortUpDown16.png" />Rating
                        </th>
                        <th onClick={() => sortByProp("user_email", "text")}>
                            <img src="icons/sortUpDown16.png" />Emails
                        </th>
                        <th className="textAlignCenter">User Image</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((listObj) =>
                            <tr key={listObj.experience_id}>
                                <td className="textAlignCenter"><img src="icons/update.png" alt="Update" /></td>
                                <td>{listObj.location_visit}</td>
                                <td className="shadowImage textAlignCenter"><img src={listObj.image_experience} /></td>
                                <td className="textAlignCenter">{listObj.date_visit}</td>
                                <td className="textAlignRight">{listObj.cost}</td>
                                <td className="nowrap">{listObj.type_experience}</td>
                                <td>{listObj.rating}</td>
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
