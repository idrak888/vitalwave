import Head from 'next/head'
import Map from '../../components/Map'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

export default function Results() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("results"))
    console.log(data);
    setResults(data);
  }, []);
  return (
    <>
      <Head>
        <title>Results | VitalWave</title>
      </Head>
      <div className="Results">
          <nav class="navbar navbar-light bg-light">
              <div style={{width: 800, margin: "auto", display: "block"}}>
                  <a class="navbar-brand" href="/">
                  <img src="/logo.png" width="28" class="d-inline-block align-top" alt=""/>
                  <strong style={{marginLeft: 5}}>VitalWave</strong>
                  </a>
              </div>
          </nav>
          <div className='container'>
              <h1>Results</h1>
              <div style={{display: "flex", flexDirection: "row", flex: 1}}>
                  <div className='col' style={{flex: 2, padding: 20}}>
                      {
                        results ? results.map(doc => {
                          return (
                            <div className='rank-item'>
                              <p>{doc[0]}</p>
                            </div>
                          )
                        }) : "Loading"
                      }
                  </div>
                  <div className='col' style={{flex: 5}}>
                      {results ? <Map results={results}/> : "Loading"}
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}