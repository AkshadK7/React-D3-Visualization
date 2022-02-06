import React, { useState } from "react";
import useInterval from "@use-it/interval";
import { svgCanvas } from "./utils.js";
import _ from "lodash";
import moment from "moment";
import Bars from "./Bars.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";

const BarChartRace = ({ frames, colorMap }) => {
  const delay = 1000;
  const [isRunning, setIsRunning] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(frames[0]);
  const [currentFrameNumber, setCurrentFrameNumber] = useState(0);
  const initialYear = parseInt(
    moment(_.get(_.first(_.values(_.first(frames))), "date"))
      .add(1, "day")
      .format("YYYY"),
    10
  );
  const [currentYear, setCurrentYear] = useState(initialYear);
  const initialMax = _.maxBy(_.values(frames[0]), "value");
  const [domainMax, setDomainMax] = useState(initialMax.value);

  useInterval(
    () => {
      if (currentFrameNumber >= frames.length - 1) {
        setIsRunning(false);
      } else {
        setCurrentYear(currentYear + 1);
        setCurrentFrame(frames[currentFrameNumber + 1]);
        setCurrentFrameNumber(currentFrameNumber + 1);
        const max = _.maxBy(_.values(frames[currentFrameNumber + 1]), "value");
        setDomainMax(max.value);
      }
    },
    isRunning ? delay : null
  );

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  const restartAnimation = () => {
    setCurrentFrame(frames[0]);
    setCurrentFrameNumber(0);
    setCurrentYear(initialYear);
    setDomainMax(initialMax.value);
    setIsRunning(false);
  };

  return (
    <div>
      <div className="buttons" >
        <span style={{border: '3px solid rgba(0, 0, 0, 0.05)', backgroundColor: 'silver'}}>
        <IconButton color="secondary" onClick={() => toggleAnimation()}>
          {isRunning ? (
            <FontAwesomeIcon icon="pause"></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon="play"></FontAwesomeIcon>
          )}
        </IconButton>
        <IconButton color="primary" onClick={() => restartAnimation()}>
          <FontAwesomeIcon icon="undo-alt"></FontAwesomeIcon>
        </IconButton>
        </span>
      </div>
      <h2><span style={{border: '3px solid rgba(0, 0, 0, 0.05)', backgroundColor: 'silver'}}>{currentYear}</span></h2>
      <h3>&#60;Developed by Akshad Kolhatkar/&#62;</h3>
      <svg 
        width={svgCanvas.width}
        height={svgCanvas.height}
        style={{ backgroundColor: "#D3D3D3" }}
      >
        <Bars
          currentFrame={currentFrame}
          domainMax={domainMax}
          colorMap={colorMap}
        />
        
      </svg>
    </div>
    
  );
};

export default BarChartRace;
