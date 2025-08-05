import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import { useThresholds } from "../context/ThresholdContext";
import axios from "axios";

interface OpenMeteoResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

const getColor = (value: number, thresholds: { min: number; max: number }) => {
  if (value < thresholds.min) return "red";
  if (value >= thresholds.min && value < thresholds.max) return "blue";
  return "green";
};

const DrawControl: React.FC = () => {
  const map = useMap();
  const { thresholds, time } = useThresholds();
  const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const temperatureMap = useRef<Map<L.Layer, number>>(new Map());

  useEffect(() => {
    map.addLayer(drawnItems.current);

    const drawControl = new (L.Control as any).Draw({
      edit: {
        featureGroup: drawnItems.current,
        remove: true,
      },
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: "#e1e100",
            message: "Intersections not allowed!",
          },
          shapeOptions: {
            color: "#97009c",
          },
          minPoints: 3,
          maxPoints: 12,
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    }) as any;
    map.addControl(drawControl);

    map.on("draw:created", async (e: L.LeafletEvent) => {
      const layer = (e as any).layer;
      if (layer instanceof L.Polygon) {
        const centroid = layer.getBounds().getCenter();
        try {
          const response = await axios.get<OpenMeteoResponse>(
            `https://api.open-meteo.com/v1/forecast?latitude=${centroid.lat}&longitude=${centroid.lng}&hourly=temperature_2m`
          );
          const hourIndex = time.getHours();
          const temperatures = response.data.hourly.temperature_2m;
          const times = response.data.hourly.time.map((t) =>
            new Date(t).getHours()
          );
          const temperature =
            temperatures[times.indexOf(hourIndex)] || temperatures[0];
          console.log(
            "Temperature fetched for hour",
            hourIndex,
            ":",
            temperature
          );
          temperatureMap.current.set(layer, temperature);
          layer.setStyle({
            fillColor: getColor(temperature, thresholds),
            fillOpacity: 0.5,
          });
        } catch (error: any) {
          console.error("API Error:", error.message || error.toString());
          layer.setStyle({ fillColor: "gray", fillOpacity: 0.5 });
        }
        drawnItems.current.addLayer(layer);
      }
    });

    const updateColors = () => {
      drawnItems.current.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          const temperature = temperatureMap.current.get(layer);
          if (temperature !== undefined) {
            layer.setStyle({
              fillColor: getColor(temperature, thresholds),
              fillOpacity: 0.5,
            });
          }
        }
      });
    };
    updateColors();

    const thresholdChangeHandler = () => updateColors();
    window.addEventListener("thresholds:change", thresholdChangeHandler);

    return () => {
      map.removeControl(drawControl);
      window.removeEventListener("thresholds:change", thresholdChangeHandler);
    };
  }, [map, thresholds, time]);

  return null;
};

const MapComponent: React.FC = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DrawControl />
    </MapContainer>
  );
};

export default MapComponent;
