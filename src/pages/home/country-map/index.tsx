import React, { useEffect, useRef } from "react";
import { CountryMapProps } from "./country-map-props";
import { Axios } from "axios";
import { DEFAULT_MAP_OPTIONS, DEFAULT_MAP_STATE, MAP_STYLE, POLYGON_COLORS } from "./country-map-consts";

declare global {
  interface Window {
    ymaps: any;
  }
}

const CountryMap: React.FC<CountryMapProps> = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const fetchCountryGeoJsonData = (): Promise<any> => {
    return Axios.get("/country.json").then((response: any) => response.data);
  };

  useEffect(() => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      if (mapContainerRef.current && !mapRef.current) {
        const map = new window.ymaps.Map(
          mapContainerRef.current,
          DEFAULT_MAP_STATE,
          DEFAULT_MAP_OPTIONS
        );
        map.options.set("maxZoom", DEFAULT_MAP_STATE.maxZoom);
        map.options.set("minZoom", DEFAULT_MAP_STATE.minZoom);
        mapRef.current = map;

        fetchCountryGeoJsonData().then((data) => {
          let features: any[] = [];

          if (data.type === "FeatureCollection") {
            features = data.features;
          } else if (data.type === "GeometryCollection" && Array.isArray(data.geometries)
          ) {
            features = data.geometries.map((geometry: any, index: number) => ({
              geometry,
              properties: { NAME_RU: `Объект ${index + 1}` },
            }));
          }

          features.forEach((feature: any, index: number) => {
            const { geometry, properties } = feature;
            const name = properties?.NAME_RU || properties?.NAME || `Объект ${index + 1}`;
            const color = POLYGON_COLORS[index % POLYGON_COLORS.length];

            const createPolygon = (coordinates: any[][][]) => {
              const transformedCoords = coordinates.map((ring: any[]) =>
                ring.map(([lon, lat]: [number, number]) => [lat, lon])
              );

              const polygon = new window.ymaps.Polygon(
                transformedCoords,
                { hintContent: name },
                {
                  fillColor: `${color.fill}88`,
                  strokeColor: color.border,
                  strokeWidth: 2,
                }
              );

              map.geoObjects.add(polygon);
            };

            if (geometry.type === "Polygon") {
              createPolygon(geometry.coordinates);
            } else if (geometry.type === "MultiPolygon") {
              geometry.coordinates.forEach((coords: any[][]) => {
                createPolygon(coords);
              });
            }
          });
        });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={MAP_STYLE}
    />
  );
};

export default CountryMap;