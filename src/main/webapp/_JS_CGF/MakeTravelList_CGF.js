"use strict";

"use strict";

function MakeTravelList_CGF() {
    var destEle = document.createElement("div");

    var titleElement = document.createElement("h1");
    titleElement.textContent = "Places to Go";
    destEle.appendChild(titleElement);

    var defaultTravelComp = MakeTravelList({});
    destEle.appendChild(defaultTravelComp);

    var MayTravelList = [
        { destination: "Paris", cost: 2000, image: "pics/paris.jpg" },
        { destination: "Tokyo", cost: 3000, image: "pics/tokyo.jpg" },
        { destination: "New York", cost: 2500, image: "pics/new_york.jpg" }
    ];
    var MayTravelComp = MakeTravelList({
        travelList: MayTravelList,
        title: "May Travel"
    });
    destEle.appendChild(MayTravelComp);

    var JulyTravelList = [
        { destination: "London", cost: 1800, image: "pics/london.jpg" },
        { destination: "Sydney", cost: 2800, image: "pics/sydney.jpg" },
        { destination: "Dubai", cost: 3200, image: "pics/dubai.jpg" }
    ];
    var JulyTravelComp = MakeTravelList({
        travelList: JulyTravelList,
        title: "July Travel"
    });
    destEle.appendChild(JulyTravelComp);


    return destEle;
}