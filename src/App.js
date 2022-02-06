import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./App.css";
import { readData, rank, createColorMap } from "./utils.js";
import BarChartRace from "./BarChartRace.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPause, faPlay, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer.js";

function App() {
  const [frames, setFrames] = useState([]);
  const [colorMap, setColorMap] = useState({});
  const [loading, setLoading] = useState(true);

  library.add(fab, faPause, faPlay, faUndoAlt);

  useEffect(() => {
    const setDataState = async () => {
      const rawData = await readData();
      console.log("data read");

      const groupedByDate = _.groupBy(rawData, "date");
      const thenByCompany = _.map(groupedByDate, (d) => _.groupBy(d, "name"));
      const rankedData = rank(thenByCompany);
      setFrames(rankedData);

      const createdColorMap = await createColorMap();
      setColorMap(createdColorMap);
      setLoading(false);
    };

    setDataState();
  }, []);

 

  return (
    <div className="App" style={{backgroundColor: '#282c34'}} >  
    {/* style={{backgroundColor: '#282c34'}} */}
      <div><h1 className="h1">Top Global Brands from 2000 to 2019 Bar Chart Race</h1></div>

      {!loading ? <BarChartRace frames={frames} colorMap={colorMap}/> : <></>}

      <Footer/>
    </div>
  );
}

export default App;
