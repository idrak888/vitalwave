import React from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 42.984924,
  lng: -81.245277
};

const markers = [
    {lat: 42.98, lng: -81.245},
    {lat: 42.95, lng: -81.3},
    {lat: 42.93, lng: -81.31},
    {lat: 42.90, lng: -81.4},
    {lat: 42.96, lng: -81.25},
]

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'VitalWave',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={() => {}}
        onUnmount={onUnmount}
      >
        {
            props.results ? props.results.map(doc => {
                return (
                    <InfoWindow
                        position={{lat: parseFloat(doc[2]), lng: parseFloat(doc[3])}}
                    >
                        <div style={{maxWidth: 100}}>
                            <p style={{fontSize: 12}}>{doc[0]}</p>
                        </div>
                    </InfoWindow>
                )
            }) : <>Loading</>
        }
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map);