import React from "react";
import { CountryMapOptions } from "./country-map-options";
import { CountryMapState } from "./country-map-state";

export const DEFAULT_MAP_STATE: CountryMapState = {
    center: [55.751574, 37.573856],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
    controls: [],
    type: "yandex#map",
};

export const DEFAULT_MAP_OPTIONS: CountryMapOptions = {
    suppressMapOpenBlock: true,
    autoFitToViewport: true,
};

export const MAP_STYLE: React.CSSProperties = {
    minWidth: "200px",
    minHeight: "400px",
    width: "100%",
    height: "100%",
}

export const POLYGON_COLORS: any = [
    { border: "#d32f2f", fill: "#ffcdd2" },
    { border: "#1976d2", fill: "#bbdefb" },
    { border: "#388e3c", fill: "#c8e6c9" },
    { border: "#fbc02d", fill: "#fff9c4" },
    { border: "#7b1fa2", fill: "#e1bee7" },
    { border: "#f57c00", fill: "#ffe0b2" },
    { border: "#00796b", fill: "#b2dfdb" },
    { border: "#c0ca33", fill: "#f0f4c3" },
];