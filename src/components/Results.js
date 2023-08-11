import { Link } from "react-router-dom";

export default function Results({ result, time }) {
  let display = "";
  if (result.status === "success") {
    display = (
      <div>
        <h4>
          Success! Congratulations on Finding Falcone King Shan is mighty
          Pleased
        </h4>
        <div>Time Taken : {time}</div>
        <div>Planet Found: {result.planet_name}</div>
      </div>
    );
  } else {
    display = <div>Failed</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {display}
      <Link to="/">
        <button>Start Again</button>
      </Link>
    </div>
  );
}
