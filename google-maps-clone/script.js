const MAP_ELEMENT_ID = "map"
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoid2ViZGV2c2ltcGxpZmllZCIsImEiOiJja2dyYTRqbW0weWl1MnJxaWF2dGR0ZHMwIn0.lU-OINCILi52P5N98qMbtA"

navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
  enableHighAccuracy: true
})

function locationSuccess(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function locationError() {
  setupMap([-2.24, 53.48])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: MAP_ELEMENT_ID,
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })

  map.addControl(new mapboxgl.NavigationControl())

  map.addControl(
    new MapboxDirections({ accessToken: MAPBOX_ACCESS_TOKEN }),
    "top-left"
  )

  return map
}
