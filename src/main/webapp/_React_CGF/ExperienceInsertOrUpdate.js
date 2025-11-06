"use strict";

const ExperienceInsertOrUpdate = (props) => {

    var action = "insert";
    var id = "";
    var url = props.location.pathname;
    console.log("url that invoked ExperienceInsertOrUpdate is " + url);
    if (url.search(":") > -1) {
        const url_list = url.split(":");
        id = url_list[url_list.length - 1];
        console.log("to update id " + id);
        action = "update";
    } else {
        console.log("to insert");
    }

    const [experienceData, setExperienceData] = React.useState({
        "experience_id": "",
        "location_visit": "",
        "type_experience": "",
        "image_experience": "",
        "rating": "",
        "cost": "",
        "date_visit": "",
        "web_user_id": "",
        "errorMsg": ""
    });

    const [experienceList, setExperienceList] = React.useState([]);
    const [errorObj, setErrorObj] = React.useState({
        "experience_id": "",
        "location_visit": "",
        "type_experience": "",
        "image_experience": "",
        "rating": "",
        "cost": "",
        "date_visit": "",
        "web_user_id": "",
        "errorMsg": ""
    });

    const [submitCount, setSubmitCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    const encodeExperienceInput = () => {
        var experienceInputObj = {
            "experience_id": experienceData.experience_id,
            "location_visit": experienceData.location_visit,
            "type_experience": experienceData.type_experience,
            "image_experience": experienceData.image_experience,
            "rating": experienceData.rating,
            "cost": experienceData.cost,
            "date_visit": experienceData.date_visit,
            "web_user_id": experienceData.web_user_id
        };
        return encodeURI(JSON.stringify(experienceInputObj));
    };

    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    React.useEffect(() => {
        console.log("AJAX call for user list");
        ajax_alt("experience/getAll",
            function (obj) {
                console.log("experience/getAll Ajax success");
                if (obj.dbError.length > 0) {
                    setErrorObj(setProp(errorObj, "userEmail", obj.dbError));
                } else {
                    // Filter out duplicates based on user_email
                    const uniqueExperienceList = obj.experienceList.filter((value, index, self) =>
                        self.findIndex(t => t.user_email === value.user_email) === index
                    );

                    // Sort the unique list
                    uniqueExperienceList.sort(function (a, b) {
                        if (a.user_email > b.user_email) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                    console.log('sorted user list on next line');
                    console.log(obj.experienceList);
                    setExperienceList(obj.experienceList);
                    setExperienceData(setProp(experienceData, "experience_id", obj.experienceList[0].experience_id));
                    console.log("set initial experience id for experience to be " + obj.experienceList[0].experience_id);
                    if (action === "update") {
                        console.log("Now getting experience record " + id + " for the update");
                        ajax_alt("experience/getById?experience_id=" + id,
                            function (obj) {
                                if (obj.errorMsg.length > 0) {
                                    console.log("DB error trying to get the experience record for udpate");
                                    setErrorObj(setProp(errorObj, "errorMsg", obj.errorMsg));
                                } else {
                                    console.log("got the experience record for update (on next line)");
                                    console.log(obj);
                                    setExperienceData(obj);
                                }
                            },
                            function (ajaxErrorMsg) {
                                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                            }
                        );
                    }
                }
            },
            function (ajaxErrorMsg) {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
            }
        );
        setIsLoading(false);
    }, []);

    React.useEffect(() => {
        console.log("SubmitCount has changed, value is " + submitCount);
        if (submitCount > 0) {
            ajax_alt("experience/" + action + "?jsonData=" + encodeExperienceInput(),
                function (obj) {
                    console.log("These are the error messages (next line)");
                    console.log(obj);
                    if (obj.errorMsg.length === 0) {
                        obj.errorMsg = "Record Saved !";
                    }
                    setErrorObj(obj);
                },
                function (ajaxErrorMsg) {
                    setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                }
            );
        }
    }, [submitCount]);

    const validate = () => {
        console.log("Validate, should kick off AJAX call");
        let isValid = true;

        // Check if Location Visit is filled out
        if (experienceData.location_visit.trim() === "") {
            setErrorObj(setProp(errorObj, "location_visit", "Location Visit is required"));
            isValid = false;
        }

        // Check if Experience Type is filled out
        if (experienceData.type_experience.trim() === "") {
            setErrorObj(setProp(errorObj, "type_experience", "Experience Type is required"));
            isValid = false;
        }

        // If both fields are filled out, proceed with the submission
        if (isValid) {
            setSubmitCount(submitCount + 1);
        }
    };

    if (isLoading) {
        return <div> ... Loading ... </div>;
    }

    return (
        <div>
            <h2>New Experiences</h2>
            <table className="insertArea">
                <tbody>
                    <tr>
                        <td>Experience Id</td>
                        <td>
                            {action === "insert" ? (
                                <input value="" disabled />
                            ) : (
                                <input value={experienceData.experience_id} disabled />
                            )}
                        </td>
                        <td className="error">
                            {errorObj.experience_id}
                        </td>
                    </tr>
                    <tr>
                        <td>Location Visit</td>
                        <td>
                            <input value={experienceData.location_visit} onChange={e => setExperienceData(setProp(experienceData, "location_visit", e.target.value))} />
                        </td>
                        <td className="error">
                            {errorObj.location_visit}
                        </td>
                    </tr>
                    <tr>
                        <td>Experience Type</td>
                        <td>
                            <input value={experienceData.type_experience} onChange={e => setExperienceData(setProp(experienceData, "type_experience", e.target.value))} />
                        </td>
                        <td className="error">
                            {errorObj.type_experience}
                        </td>
                    </tr>
                    <tr>
                        <td>Experience Image URL</td>
                        <td>
                            <input value={experienceData.image_experience} onChange={e => setExperienceData(setProp(experienceData, "image_experience", e.target.value))} />
                        </td>
                        <td className="error">
                            {errorObj.image_experience}
                        </td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td>
                            <input value={experienceData.rating} onChange={e => setExperienceData(setProp(experienceData, "rating", e.target.value))} />
                        </td>
                        <td className="error">
                            {errorObj.rating}
                        </td>
                    </tr>
                    <tr>
                        <td>Cost</td>
                        <td>
                            <input value={experienceData.cost} onChange={e => setExperienceData(setProp(experienceData, "cost", e.target.value))} />
                        </td>
                        <td className="error">
                            {errorObj.cost}
                        </td>
                    </tr>
                    <tr>
                        <td>Date Visit</td>
                        <td>
                            <input value={experienceData.date_visit} onChange=
                                {e => setExperienceData(setProp(experienceData, "date_visit", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.date_visit}
                        </td>
                    </tr>
                    <tr>
                        <td>User Email</td>
                        <td>
                            <select onChange={e => setExperienceData(setProp(experienceData, "web_user_id", e.target.value))} value={experienceData.web_user_id}>
                                {
                                    experienceList.map((experience, index) => {
                                        // Check if the current email already exists in previous items
                                        const isDuplicate = experienceList.slice(0, index).some(prevExp => prevExp.user_email === experience.user_email);
                                        // Render the option only if it's not a duplicate
                                        if (!isDuplicate) {
                                            return (
                                                <option key={experience.web_user_id} value={experience.web_user_id}>
                                                    {experience.user_email}
                                                </option>
                                            );
                                        }
                                        return null; // Skip rendering if it's a duplicate
                                    })
                                }
                            </select>
                        </td>
                        <td className="error">
                            {errorObj.user_email}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <button type="button" onClick={validate}>Save</button>
                        </td>
                        <td className="error" colSpan="2">
                            <br />
                            {errorObj.errorMsg}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
