import { useState, useEffect } from "react";
import Selection from "./Selection";
import { useNavigate } from "react-router-dom";
export default function Mission({ handleResult, handleTimeTaken }) {
  const URL_FOR_PLANETS = "https://findfalcone.geektrust.com/planets";
  const URL_FOR_SPACESHIPS = "https://findfalcone.geektrust.com/vehicles";
  const URL_RESULTS = "https://findfalcone.geektrust.com/find";
  const URL_TOKEN = "https://findfalcone.geektrust.com/token";

  let [planets, setPlanets] = useState([]);
  let [spaceships, setSpaceships] = useState([]);
  let [selectedPlanets, setSelectedPlanets] = useState([]);
  let [selectedSpaceships, setSelectedSpaceships] = useState([]);
  let [timetaken, setTimeTaken] = useState(0);
  let history = useNavigate();

  useEffect(() => {
    let fetchPlanets = async () => {
      let response = await fetch(URL_FOR_PLANETS);
      let plantesData = await response.json();
      setPlanets(plantesData);
    };
    let fetchSpaceships = async () => {
      let response = await fetch(URL_FOR_SPACESHIPS);
      let spaceshipsData = await response.json();
      setSpaceships(spaceshipsData);
    };

    fetchPlanets();
    fetchSpaceships();
  }, []);

  let handleSubmit = async () => {
    let responseToken = await fetch(URL_TOKEN, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    });
    let dataToken = await responseToken.json();
    let token = dataToken.token;
    let obj = {
      token: token,
      planet_names: selectedPlanets,
      vehicle_names: selectedSpaceships
    };
    let resp = await fetch(URL_RESULTS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });

    let data = await resp.json();
    handleResult(data);
    handleTimeTaken(timetaken);
    history("/results");
  };

  return (
    <>
      <h5 style={{ textAlign: "center" }}>
        Search planets you want to search in:
      </h5>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Selection
          text="Destination 1"
          planets={planets}
          handlePlanets={setPlanets}
          spaceships={spaceships}
          handleSpaceships={setSpaceships}
          handleTime={setTimeTaken}
          selectedPlanets={selectedPlanets}
          handleSelectedPlanets={setSelectedPlanets}
          selectedSpaceships={selectedSpaceships}
          handleSelectedSpaceships={setSelectedSpaceships}
        />

        <Selection
          text="Destination 2"
          planets={planets}
          handlePlanets={setPlanets}
          spaceships={spaceships}
          handleSpaceships={setSpaceships}
          handleTime={setTimeTaken}
          selectedPlanets={selectedPlanets}
          handleSelectedPlanets={setSelectedPlanets}
          selectedSpaceships={selectedSpaceships}
          handleSelectedSpaceships={setSelectedSpaceships}
        />

        <Selection
          text="Destination 3"
          planets={planets}
          handlePlanets={setPlanets}
          spaceships={spaceships}
          handleSpaceships={setSpaceships}
          handleTime={setTimeTaken}
          selectedPlanets={selectedPlanets}
          handleSelectedPlanets={setSelectedPlanets}
          selectedSpaceships={selectedSpaceships}
          handleSelectedSpaceships={setSelectedSpaceships}
        />

        <Selection
          text="Destination 4"
          planets={planets}
          handlePlanets={setPlanets}
          spaceships={spaceships}
          handleSpaceships={setSpaceships}
          handleTime={setTimeTaken}
          selectedPlanets={selectedPlanets}
          handleSelectedPlanets={setSelectedPlanets}
          selectedSpaceships={selectedSpaceships}
          handleSelectedSpaceships={setSelectedSpaceships}
        />
        <h2>Time Taken : {timetaken}</h2>
      </div>
      <div className="button">
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Find Falcone!
        </button>
      </div>
    </>
  );
}
