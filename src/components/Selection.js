import { useState } from "react";

export default function Selection({
  text,
  planets,
  handlePlanets,
  spaceships,
  handleSpaceships,
  handleTime,
  selectedPlanets,
  handleSelectedPlanets,
  selectedSpaceships,
  handleSelectedSpaceships
}) {
  let [isSelected, setIsSelected] = useState("");
  let [selectedship, setSelectedship] = useState("");

  let handlePlanetSelection = (e) => {
    let newPlanets = [...selectedPlanets];
    if (isSelected !== "") {
      let removePlanets = newPlanets.filter((planet) => planet !== isSelected);
      newPlanets = [...removePlanets];
    }
    if (e.target.value !== "") {
      newPlanets.push(e.target.value);
      setIsSelected(e.target.value);
      handleSelectedPlanets(newPlanets);
    } else {
      setIsSelected("");
      handleSelectedPlanets(newPlanets);
    }
  };

  let handleShipSelection = (e) => {
    let newShips = [...selectedSpaceships];
    if (selectedship !== "") {
      let removeShips = newShips.filter((ship) => ship !== selectedship);
      newShips = [...removeShips];
    }
    if (e.target.value !== "") {
      let modifyShips = [...spaceships];
      modifyShips.forEach((ship) => {
        if (ship.name === selectedship) {
          ship.total_no = ship.total_no + 1;
        }
        if (ship.name === e.target.value) {
          ship.total_no = ship.total_no - 1;
        }
      });
      newShips.push(e.target.value);
      setSelectedship(e.target.value);
      handleSelectedSpaceships(newShips);
      let curPlanet = planets.find((planet) => planet.name === isSelected);
      let curShip = spaceships.find((ship) => ship.name === e.target.value);
      let time = curPlanet.distance / curShip.speed;
      handleTime((prev) => {
        return prev + time;
      });
    } else {
      setIsSelected("");
      handleSelectedSpaceships(newShips);
    }
  };

  return (
    <div style={{ padding: "16px", fontSize: "12px" }}>
      <div>{text}</div>
      <div>
        <select
          onChange={(e) => {
            handlePlanetSelection(e);
          }}
        >
          <option value="">select</option>
          {planets.map((planet) => {
            return !selectedPlanets.includes(planet.name) ||
              isSelected === planet.name ? (
              <option key={planet.name} value={planet.name}>
                {planet.name}
              </option>
            ) : null;
          })}
        </select>
      </div>
      {isSelected ? (
        <div>
          {spaceships.map((ship) => {
            return (
              <div key={ship.name}>
                <input
                  type="radio"
                  name={text}
                  disabled={
                    planets.find((planet) => planet.name === isSelected)
                      .distance > ship.max_distance ||
                    (!ship.total_no && selectedship !== ship.name)
                  }
                  value={ship.name}
                  onChange={(e) => {
                    handleShipSelection(e);
                  }}
                />
                <label htmlfor="age1">
                  {ship.name}({ship.total_no})
                </label>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
