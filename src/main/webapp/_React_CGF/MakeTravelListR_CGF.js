"use strict";

function MakeTravelListR_CGF() {
    return (
        <div className="container">
            <h1>Places to Go</h1>
            <hr />
            <div className="travel-list">
                <MakeTravelListR title="Unknown Travel List" />
            </div>
            <div className="travel-list">
                <MakeTravelListR
                    travelList={[
                        { id: 1, destination: "New York", cost: 500, image: "pics/new_york.jpg" },
                        { id: 2, destination: "Paris", cost: 700, image: "pics/paris.jpg" },
                        { id: 3, destination: "Tokyo", cost: 1000, image: "pics/tokyo.jpg" }
                    ]}
                    title="First Travel List"
                />
            </div>
            <div className="travel-list">
                <MakeTravelListR
                    travelList={[
                        { id: 1, destination: "London", cost: 400, image: "pics/london.jpg" },
                        { id: 2, destination: "Rome", cost: 600, image: "pics/rome.jpg" },
                        { id: 3, destination: "Sydney", cost: 900, image: "pics/sydney.jpg" }
                    ]}
                    title="Second Travel List"
                />
            </div>
            
        </div>
    );
}