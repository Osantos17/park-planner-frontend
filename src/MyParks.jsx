import "./MyParks.css"
import { useState, useEffect } from 'react';
import axios from "axios"
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';
import styled from "styled-components";

export function MyParks () {

  const [ myParks, setMyParks] = useState ([]);
  const [ destoryParks, setDestroyParks ] = useState ([]);

  const [ directions ] = useState ({})

  const getMyParks = () => {
    axios.get('https://park-camping-api.onrender.com/parks_lists.json').then((response) => {
      console.log(response.data); 
      setMyParks(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching data from the server:', error);
    });
  };

  const destroyPark = (id) => {
    axios.delete(`https://park-camping-api.onrender.com/parks_lists/${id}.json`).then(response => {
      console.log(response.data);
      setDestroyParks([...destoryParks, response.data])
    })
  }

  useEffect(getMyParks, []);

  const [coordinates, setCoordinates] = useState(null);

  useEffect (() => {
    if (coordinates && myParks.length>0) {
      getDirections();
    }
  }, [coordinates, myParks]); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback);
  }, []);

  const successCallback = (position) => {
    console.log(position);
    setCoordinates(position.coords);
  };


  const getDirections = () => {
    const apiUrl = `https://api.radar.io/v1/route/matrix?origins=40.78382,-73.97536&destinations=40.70390,-73.98690|40.73237,-73.94884&mode=car&units=imperial`;
  
    axios.get(apiUrl, {
      headers: {
        Authorization: `${import.meta.env.VITE_SOME_KEY}`,
      },
    }).then((response) => {
      
     
      console.log(response.data);
    })
  };
  

  useEffect(() => {
    if (coordinates) {
      Radar.initialize(`${import.meta.env.VITE_SOME_KEY}`);

      const map = new Radar.ui.map({
        container: 'map',
        style: 'radar-light-v1',
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 4,
      });

      Radar.ui.marker({ text: "Home" }) 
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(map);

        const markers = [];

      myParks.forEach((park) => {
        markers.push({
          name: (park.name), 
          lngLat: [park.longitude, park.latitude],
        });
      });

      markers.forEach((marker) => {
        Radar.ui.marker({ text: marker.name})
          .setLngLat(marker.lngLat)
          .addTo(map);
      });
    }
  }, [coordinates, myParks]);

  const Content = styled.div`
    height: 74vh;
    width: 100%;
    overflow-y: scroll;
  `;

  return(
    <div className="myparks-page">
      <div className="myparks">
        <h1 className="nationalp">MY NATIONAL PARKS</h1>
        <div className="mapview">
          <div id="map-container" style={{ height: '700px', position: 'absolute', width: '50%' }}>
            <div id="map" style={{ height: '100%', position: 'absolute', width: '100%' }} />
          </div>
        </div>  
        <div className="mymaps">
          <Content>
            <h4 className="mylistname" >MY PARKS</h4>
            {myParks.map((park) => (
            <div key={park.id}>
              <span>
                <div className="list">
                  <img className="image" src="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png" width="30" height="40" />
                  {park.name.toUpperCase()}
                </div>
                <ul className="list-info">
                  <p>Total campsites - {park.totalsites}</p>
                  <p>Entry Fee - {park.fees}</p>
                  {directions[park.id] && (
                      <div>
                        <p>Directions:</p>
                        <ul>
                          {directions[park.id].matrix.map((direction, index) => (
                            <li key={index}>
                              {`Distance: ${direction.distance.text}, Duration: ${direction.duration.text}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  <a href={park.url}>Park Website</a>
                </ul>
                <button className="button3" type="button" onClick={() => destroyPark(park.id)}><div className="remove">REMOVE</div></button>
              </span>  
              <hr />
            </div>  
            ))}
          </Content>  
        </div>  
        <div className="summary">
          {myParks.map((park) => (
          <div className="parksummary" key={park.id}>
            <div>
              <span>
                <h2 className="park-name">{park.name.toUpperCase()}</h2>
                {park.city !== "f" ? (
                  <h2 className="city-name">{park.city.toUpperCase()}</h2>
                  ) :null }
              </span>
              <div className="parkinfo-background">
                <div className="row">
                  <div className="col">
                    <div className='campsites'>
                      <span><h6>Total Campsites</h6>{park.totalsites}</span>
                      <span><h6>First Come First Serve</h6>{park.firstcome}</span>
                      <span><h6>Reservable</h6>{park.reservable}</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="ratinginfo">
                      <h5>Site Info</h5>
                      <div>
                        <p>Entry Fee - {park.fees}</p>
                      </div>
                      <p>Showers - {park.showers}</p>
                      <p>Toilets - {park.toilets}</p>
                      <p>Phone Reception - {park.phone}</p>
                      <a href={park.url}>{park.url}</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="parkinfo">
                      <span><h5>Description</h5>{park.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="button2" type="button" onClick={() => destroyPark(park.id)}>REMOVE</button>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}