const AjaxExperience = (url) => {

    console.log("AjaxExperience running");

    // Tell React that 'items' (an array of objects) is a state variable 
    // that (when changed) should redisplay this component.
    // Set its initial value to [], an empty array.
    const [items, setItems] = React.useState([]);

    // Tell React that "error" is a state variable that (when changed) 
    // should redisplay this component. Set its initial value to null.
    const [error, setError] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);

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
                    console.log("in AjaxExperience, here is experience list (on the next line):");
                    console.log(dbList.experienceList);
                    setItems(dbList.experienceList);
                }
                setIsLoading(false); // set isLoading last to prevent premature rendering. 
            },

            // failure function (also anonymous)
            function (msg) {       // failure function gets error message from ajax_alt
                setError(msg);
                setIsLoading(false); // set isLoading last to prevent premature rendering.
            }
        );
    },
        []);

    if (isLoading) {
        console.log("Is Loading...");
        return <div> Loading... </div>
    }

    if (error) {
        console.log("Error...");
        return <div>Error: {error} </div>;
    }

    console.log("items for ExperienceTable on next line");
    console.log(items);
    return (
        <div className="clickSort">
            <h3>
                Experience List
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Experience ID</th>
                        <th className="textAlignCenter">Location</th>
                        <th className="textAlignCenter">Type Experience</th>
                        <th className="textAlignCenter">Image Experience</th>
                        <th className="textAlignRight">Rating</th>
                        <th className="textAlignRight">Cost</th>
                        <th className="textAlignRight">Date Visit</th>
                        <th>Web User ID</th>
                        <th>Emails</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) =>
                            <tr key={item.experience_id}>
                                <td>{item.experience}</td>
                                <td>{item.location_visit}</td>

                                <td className="textAlignCenter">{item.type_experience}</td>
                                <td className="simple textAlignCenter"> <img src={item.image_experience} /></td>
                                <td className="textAlignCenter">{item.rating}</td>
                                <td className="textAlignRight">{item.cost}</td>
                                <td className="textAlignRight">{item.date_visit}</td>
                                <td className="textAlignRight">{item.web_user_id}</td>
                                <td className="textAlignCenter">{item.user_email}</td>
                                <td>{item.errorMsg}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );

}; // function AjaxUsers 


