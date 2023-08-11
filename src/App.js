import "./styles.css";
import Header from "./components/Header";
import Mission from "./components/Mission";
import Footer from "./components/Footer";
import Results from "./components/Results";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
export default function App() {
  let [resultData, setResultData] = useState({});
  let [time, setTime] = useState(0);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/results"
          element={<Results result={resultData} time={time} />}
        />
        <Route
          path="/"
          element={
            <Mission handleResult={setResultData} handleTimeTaken={setTime} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
