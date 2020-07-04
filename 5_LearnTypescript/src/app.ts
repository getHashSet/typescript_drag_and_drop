// Code goes here!
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
import axios from "axios";
const GOOGLE_API_KEY: string = "nope";
// declare var google: any; // global variable

type GoolgeGeocodingSchema = {
  status: "OK" | "ZERO_RESULT";
  results: { geometry: { location: { lat: number; lng: number } } }[]; // add auto complete if you know the schema.
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to Google API
  axios
    .get<GoolgeGeocodingSchema>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((data) => {
      if (data.data.status !== "OK") {
        throw Error("Could not fetch locaiton.");
      }
      const coordinates = data.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 8,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      throw Error(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
