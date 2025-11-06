const AjaxExperienceTable = () => {

    console.log("AjaxExperienceTable running");

    // Tell React that 'items' (an array of objects) is a state variable 
    // that (when changed) should redisplay this component.
    // Set its initial value to [], an empty array.
    const [items, setItems] = React.useState([]);

    // Tell React that "error" is a state variable that (when changed) 
    // should redisplay this component. Set its initial value to null.
    const [error, setError] = React.useState(null);

    // By having this boolean state variable, we avoid calling the ExperienceTable before  
    // we have the data (from AJAX call) to populate ExprienceTable. 
    const [isLoading, setIsLoading] = React.useState(true);

    // useEffect 2nd parameter is an array of elements that 
    // (if any of those state variables change) should trigger the function specified 
    // as the 1st useEffect parameter. 
    // RUN ONCE PATTERN: If you put [] as 2nd param, it runs the 1st param (fn) once. 
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax_alt(

            //"json/experience.json",
            "experience/getAll",

            function (dbList) {   // success function gets obj from ajax_alt
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    setItems(dbList.experienceList);
                }
                setIsLoading(false);
            },

            function (msg) {       // failure message gets error message from ajax_alt
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);

    function callInsert() {
        window.location.hash = "#/experienceInsert";
    }

    if (isLoading) {
        return <div>... Loading ...</div>;
    }
    return (
        <div>
            {
                error ?
                    <div>Error: {error} </div> :
                    <div className="clickSort">
                        <h3>Experience Lists&nbsp;
                            <img src="icons/insert.png" onClick={callInsert}/>
                        </h3>
                        <ExperienceTable list={items} />
                    </div>
            }
        </div>
    );
}; // class AjaxExperienceTable