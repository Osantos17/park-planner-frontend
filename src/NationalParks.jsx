import { useState, useEffect } from 'react';
import './NationalParks.css';
import axios from 'axios';

export function NationalParks() {
  const [campings, setCampings] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [totalCampsitesFilter, setTotalCampsitesFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [parks, setParks] = useState([]);

  const getParkData = () => {
    axios
      .get('/parks.json')
      .then((response) => {
        console.log(response.data); 
        setCampings(response.data); 
      })
  };

  useEffect(getParkData, []);

  const handleCreatePark = (id) => {
    if (id !== 0) {
      axios.post(`/parks_lists/${id}.json`).then(response => {
        console.log(response.data);
        setParks([...parks, response.data]);
      });
    }
  };

  return (
    <div className="parksindex-page">
      <div className="parksindex">
        <h1 className="nationalp">NATIONAL PARKS</h1>
        <div className='searchbars'>
          <div className="container text-center">
            <div className="row justify-content-evenly">
              <span className="col-4">
                <input className="searchfield" type="text" value={searchFilter} placeholder="Search by Name.." onChange={event => setSearchFilter(event.target.value)} />
              </span>
              <br />
              <span className="col-4">
                <input className="searchfield" type="text" placeholder="Search by City.." value={cityFilter} onChange={event => setCityFilter(event.target.value)} />
              </span>
              <br />
              <span className="col-4">
                <input className="searchfield" type="number" placeholder="Search by Campsites Provided.." value={totalCampsitesFilter} onChange={event => setTotalCampsitesFilter(event.target.value)} />
              </span>
            </div>
          </div> 
        </div>   
        <div className="summary">
          {campings
            .filter(park => (
              park.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
              (cityFilter === "" || (park && park.city && park.city.toLowerCase().includes(cityFilter.toLowerCase()))) &&
              park.totalsites >= totalCampsitesFilter
            ))
            .map((park) => (
              <div className="parksummary" key={park.id}>
                <div>
                  <span>
                    <h2 className="park-name">{park.name.toUpperCase()}</h2>
                    {park.city && park.city.length > 1 && (
                      <h2 className="city-name">{park.city.toUpperCase()}</h2>
                    )}
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
                          {park.fees && park.fees.length > 0 && (
                            <div>
                              <p>Entry Fee - {park.fees[0].cost}</p>
                            </div>
                          )}
                          <p>Showers - {park.showers}</p>
                          <p>Toilets - {park.toilets}</p>
                          <p>Phone Reception - {park.cellPhoneReception}</p>
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
                <button className="button2" type="button" onClick={() => handleCreatePark(park.id)}>Add to my List</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}


