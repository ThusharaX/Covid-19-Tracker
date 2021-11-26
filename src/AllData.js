import React, { useState, useEffect } from 'react';

function AllData() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('https://disease.sh/v3/covid-19/countries');
    const [ct, setCountry] = useState('Sri Lanka');

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [url]);

    const handleChange = (event) => {
        setCountry(event.target.value);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card mt-5 mb-5'>
                            <div className='card-header'>
                                <img src='./logo192.png' alt='logo' style={{ width: '50px', height: '50px' }} />
                                <h3>Covid-19 Tracker</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='form-group'>
                                            <label>Select Country</label>
                                            <select className='form-control' onChange={handleChange}>
                                                <option value='Sri Lanka'>Sri Lanka</option>
                                                {data.map(country => {
                                                    return (
                                                        <option key={country.country} value={country.country}>{country.country}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        {/* Refresh Data */}
                                        <button className='btn btn-primary' onClick={() => setUrl('https://disease.sh/v3/covid-19/countries')}>Refresh Data</button>

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        {data.filter(country => country.country.toLowerCase() === ct.toLowerCase()).map(country => (

                                            // Card align center
                                            <div key={country.countryInfo.iso2} className="card mb-3 ml-auto mr-auto w-100">
                                                {country.countryInfo && country.countryInfo.flag &&
                                                    <img className="card-img-top" src={country.countryInfo.flag} alt={country.country} />
                                                }
                                                <div className="card-body">
                                                    <h5 className="card-title">{country.country}</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Cases: {country.cases}</li>
                                                    <li className="list-group-item">Today Cases: {country.todayCases}</li>
                                                    <li className="list-group-item">Deaths: {country.deaths}</li>
                                                    <li className="list-group-item">Today Deaths: {country.todayDeaths}</li>
                                                    <li className="list-group-item">Recovered: {country.recovered}</li>
                                                    <li className="list-group-item">Active: {country.active}</li>
                                                    <li className="list-group-item">Critical: {country.critical}</li>
                                                    <li className="list-group-item">Cases Per One Million: {country.casesPerOneMillion}</li>
                                                    <li className="list-group-item">Deaths Per One Million: {country.deathsPerOneMillion}</li>
                                                    <li className="list-group-item">Tests: {country.tests}</li>
                                                    <li className="list-group-item">Tests Per One Million: {country.testsPerOneMillion}</li>
                                                    <li className="list-group-item">Active Per One Million: {country.activePerOneMillion}</li>
                                                    <li className="list-group-item">Recovered Per One Million: {country.recoveredPerOneMillion}</li>
                                                    <li className="list-group-item">Critical Per One Million: {country.criticalPerOneMillion}</li>
                                                    <li className="list-group-item">Last Update: {new Date(country.updated).toLocaleString()}</li>
                                                </ul>
                                                <div className="card-body">
                                                    <a href="https://disease.sh/" className="card-link">Data from https://disease.sh/</a>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllData
