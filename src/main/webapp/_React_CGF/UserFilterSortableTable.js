"use strict";

const UserFilterSortableTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [filteredList, setFilteredList] = React.useState([]);

    React.useEffect(() => {
        ajax_alt(
            "webUser/getAll",
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    setDbList(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
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
        doFilter("");
    };

    const sortByProp = (propName, sortType) => {
        jsSort(dbList, propName, sortType);
        let listCopy = JSON.parse(JSON.stringify(dbList));
        setDbList(listCopy);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="clickSort">
            <h3>Filterable and Sortable User List</h3>
            <div>
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                <button onClick={() => doFilter(filterInput)}>Search</button>
                <button onClick={clearFilter}>Clear</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortByProp("userEmail", "text")}>
                            <img src="icons/sortUpDown16.png" />Email
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => sortByProp("birthday", "date")} className="textAlignCenter">
                            <img src="icons/blackSort.png" />Birthday
                        </th>
                        <th onClick={() => sortByProp("membershipFee", "number")} className="textAlignRight">
                            <img src="icons/whiteSort.png" />Membership Fee
                        </th>
                        <th onClick={() => sortByProp("userRoleType", "text")}>
                            <img src="icons/sortUpDown16.png" />Role
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((listObj) =>
                            <tr key={listObj.webUserId}>
                                <td>{listObj.userEmail}</td>
                                <td className="shadowImage textAlignCenter"><img src={listObj.userImage} /></td>
                                <td className="textAlignCenter">{listObj.birthday}</td>
                                <td className="textAlignRight">{listObj.membershipFee}</td>
                                <td className="nowrap">{listObj.userRoleType}</td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};
