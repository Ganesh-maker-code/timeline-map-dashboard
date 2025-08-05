import React from "react";
import { useThresholds } from "../context/ThresholdContext";
import Slider from "react-slider";

const Sidebar: React.FC = () => {
  const { thresholds, setThresholds, time, setTime } = useThresholds();

  const handleUpdate = () => {
    setThresholds({ ...thresholds });
    window.dispatchEvent(new Event("thresholds:change"));
  };

  const handleTimeChange = (value: number) => {
    const newTime = new Date(time);
    newTime.setHours(value);
    newTime.setMinutes(0);
    newTime.setSeconds(0);
    setTime(newTime);
    window.dispatchEvent(new Event("thresholds:change"));
  };

  return (
    <div style={{ width: "200px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Data Source</h3>
      <select>
        <option value="Open-Meteo">Open-Meteo</option>
      </select>
      <h3>Thresholds</h3>
      <input
        type="number"
        value={thresholds.min}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setThresholds({ ...thresholds, min: +e.target.value })
        }
      />
      <input
        type="number"
        value={thresholds.max}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setThresholds({ ...thresholds, max: +e.target.value })
        }
      />
      <button onClick={handleUpdate}>Update Colors</button>
      <h3>Timeline (Hour of Day)</h3>
      <p>Selected Time: {time.toLocaleTimeString()}</p>
      <Slider
        min={0}
        max={23}
        value={time.getHours()}
        onChange={handleTimeChange}
        renderThumb={(props: React.HTMLAttributes<HTMLDivElement>) => (
          <div {...props} />
        )}
        renderTrack={(props: React.HTMLAttributes<HTMLDivElement>) => (
          <div {...props} style={{ height: "6px", backgroundColor: "#ccc" }} />
        )}
      />
    </div>
  );
};

export default Sidebar;
