"use strict";

function MakeTravelList({ travelList = [{}], title = "Travel List" }) {

    function MakeTravel({ destination = "Destination Desired", cost = 0, image = "pics/default.jpg" }) {

        var travelObj = document.createElement("div");

        travelObj.classList.add("travel");
        travelObj.classList.add("travel-list");

        travelObj.innerHTML = `
            <div class='travelInfoClass'></div>
            <img src='${image}' class='travelImage' alt='${destination}' /><br/>
            <button class='destinationButtonClass'>Change Destination to: </button>
            <input class='newDestinationInputClass'/> <br/>
            <button class='costButtonClass'>Change Cost By Factor: </button>
            <input class='costFactorInputClass'/> 
            `;

        var travelInfo = travelObj.getElementsByClassName("travelInfoClass")[0];
        var destinationButton = travelObj.getElementsByClassName("destinationButtonClass")[0];
        var newDestinationInput = travelObj.getElementsByClassName("newDestinationInputClass")[0];
        var costButton = travelObj.getElementsByClassName("costButtonClass")[0];
        var costFactor = travelObj.getElementsByClassName("costFactorInputClass")[0];

        var display = function () {
            travelInfo.innerHTML = `
          <p>
             Destination: ${destination}<br/>
             Cost: ${formatCurrency(cost)}
          </p>
        `;
        };
        display();

        destinationButton.onclick = function () {
            setDestination(newDestinationInput.value);
        };

        costButton.onclick = function () {
            changeCost(costFactor.value);
        };

        function formatCurrency(numStr) {
            numStr += "";
            numStr = numStr.replace("$", "");
            numStr = numStr.replace(",", "");
            var num = Number(numStr);
            var formattedNum = num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
            console.log("formattedNum:" + formattedNum);
            return formattedNum;
        }

        function setDestination(newDestination) {
            destination = newDestination;
            display(); 
        }

        function changeCost(costFactor) {
            if (cost === 0) {
                cost = costFactor; 
            } else {
                cost = cost * costFactor; 
            }
            display(); 
        }

        return travelObj;
    } // MakeTravel

    var travelListComp = document.createElement("div");


    travelListComp.classList.add("container");
    travelListComp.classList.add("travelList");
    travelListComp.innerHTML = `<h2>${title}</h2>`;

    for (var travelObj of travelList) {
        travelListComp.appendChild(MakeTravel(travelObj));
    }

    return travelListComp;
}
