"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const Watch = () => {
  const [milliseconds, setMilliseconds] = useState(60000);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null); // Ref for interval

  const minutes = Math.floor(milliseconds / (60 * 100));
  const seconds = Math.floor((milliseconds % (60 * 100)) / 100);
  const mils = milliseconds % 100;

  // Start interval when the watch is running
  useEffect(() => {
    if (running && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setMilliseconds((prev) => prev - 1);
      }, 10);
    }

    // Cleanup interval on stop
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  // Lap function
  const handleLap = () => {
    const lapTime = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}:${mils < 10 ? "0" : ""}${mils}`;
    setLaps([...laps, lapTime]);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="mb-4 text-4xl">
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}:{mils < 10 && "0"}
        {mils}
      </h1>
      <div className="flex gap-3 mb-4">
        <Button onClick={handleLap}>Lap</Button>
        <Button onClick={() => setRunning(false)}>Pause</Button>
        <Button onClick={() => setRunning(true)}>Start</Button>
        <Button
          onClick={() => {
            setMilliseconds(60000);
            setRunning(false);
            setLaps([]);
          }}
        >
          Reset
        </Button>
      </div>
      <div>
        {laps.length > 0 && (
          <ul className="mt-4">
            {laps.map((lap, index) => (
              <li key={index} className="text-lg">
                Lap {index + 1}: {lap}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Watch;
