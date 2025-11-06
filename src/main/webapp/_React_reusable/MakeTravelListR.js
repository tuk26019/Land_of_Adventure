"use strict";

function MakeTravelListR({ travelList = [{}], title = "Untitled Travel List" }) {

    function MakeTravel({ id, destination = "Unknown destination", cost = 0, image = "pics/default.jpg" }) {
        const [destinationState, setDestinationState] = React.useState(destination);
        const [costState, setCostState] = React.useState(cost);
        const [costFactorInput, setCostFactorInput] = React.useState("");
        const [newDestination, setNewDestination] = React.useState("");

        function formatCurrency(numStr) {
            numStr += "";
            numStr = numStr.replace("$", "");
            numStr = numStr.replace(",", "");
            var num = Number(numStr);
            var formattedNum = num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
            return formattedNum;
        }

        function changeDestination() {
            setDestinationState(newDestination);
            setNewDestination(""); // Clear the input field after changing the destination
        }

        function changeCostByFactor() {
            const factor = parseFloat(costFactorInput);
            if (!isNaN(factor)) {
                const newCost = costState * (1 + (factor - 1));
                setCostState(newCost);
            }
            setCostFactorInput(""); // Clear the input after changing the cost
        }

        return (
            <div className="travel">
                <p>
                    Destination: {destinationState}<br />
                    Cost: {formatCurrency(costState)}<br />
                    <img src={image} alt={destination} />
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                    <button onClick={changeDestination} style={{ marginRight: '10px' }}>Change Destination</button>
                    <input value={newDestination} onChange={e => setNewDestination(e.target.value)} placeholder="Enter new destination" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                    <button onClick={changeCostByFactor} style={{ marginRight: '10px' }}>Change Cost By Factor:</button>
                    <input value={costFactorInput} onChange={e => setCostFactorInput(e.target.value)} placeholder="Enter cost factor" />
                </div>
            </div>
        );
    }

    return (
        <div className="travelList">
            <h2>{title}</h2>
            {travelList.map((travel, index) => (
                <MakeTravel
                    key={index}
                    id={travel.id}
                    destination={travel.destination}
                    cost={travel.cost}
                    image={travel.image}
                />
            ))}
        </div>
    );
}