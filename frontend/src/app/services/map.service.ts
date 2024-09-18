import { Injectable } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class MapService {
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";
  lat = 36.962247;
  lng = 10.05027;

  zoom = 12;
  geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Iheb Haji",
          speciality: "Psychologist",
        },
        geometry: {
          type: "Point",
          coordinates: [10.171506, 36.863115],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Amal Mdeini",
          speciality: "biologist",
        },
        geometry: {
          type: "Point",
          coordinates: [10.148879, 36.83251],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Manel Feki",
          speciality: "Psychologist",
        },
        geometry: {
          type: "Point",
          coordinates: [10.119312, 37.056887],
        },
      },
    ],
  };
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    // Add markers to the map.
    for (const marker of this.geojson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");

      el.className = "marker";
      // el.style.backgroundImage = `url(https://placekitten.com/g/${100}/${100}/)`;
      // el.style.width = `${100}px`;
      // el.style.height = `${100}px`;
      // el.style.backgroundSize = "100%";

      // el.addEventListener("click", () => {
      //   window.alert(marker.properties.message);
      // });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${marker.properties.name}</h3><p>${marker.properties.speciality}</p>`
            )
        )
        .addTo(this.map);
    }
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  getDoctorMap() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: this.zoom,
      center: [10.171506, 36.863115],
    });
    const el = document.createElement("div");
    el.className = "marker";
    const marker = {
      type: "Feature",
      properties: {
        name: "Iheb Haji",
        speciality: "Psychologist",
      },
      geometry: {
        type: "Point",
        coordinates: [10.171506, 36.863115],
      },
    };
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${marker.properties.name}</h3><p>${marker.properties.speciality}</p>`
        )
      )
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
