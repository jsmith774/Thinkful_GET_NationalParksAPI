/* eslint-disable no-console */
const API_KEY = 'K1vagaztl8WtGAQ4C3q0FmIWWeee8TZU0dnPOwHM';
const ENDPOINT_BASE_URL = 'https://developer.nps.gov/api/v1';

const API_TARGET = '/parks';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    
    // const options = {
    //   headers: new Headers({
    //     "X-Api-Key": API_KEY},
    //     {"Access-Control-Allow-Origin": "*"},
    //     {"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"},
    //     {"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"}
    //   )};


    let states = $('#states').val();

    let maxItems = $('#maxRetItems').val();

    const fetchURL = `${ENDPOINT_BASE_URL}${API_TARGET}?api_key=${API_KEY}&stateCode=${states}&limit=${maxItems}`;
    //const fetchURL = `${ENDPOINT_BASE_URL}${API_TARGET}?stateCode=${states}&limit=${maxItems}`;

    const resultsDiv = $('#resultsData');
    resultsDiv.html = '';

    const resultsList = $('#resultsList');
    resultsList.empty();

    //fetch(fetchURL, options)
    fetch(fetchURL)
      .then(response => response.json())
      .then(jsonData => 
      {
        jsonData.data.forEach(park => {
          const fullName = park.fullName;
          const desc = park.description;
          const url = park.url;
          const addr = park.addresses[0];
          const addrStr = `${addr.line1}, ${addr.city}, ${addr.stateCode} ${addr.postalCode}`;

          $('#resultsList').append(`<div class='parkEntry'><div><h3>Name:</h3> ${fullName}</div><div><h3>Desc:</h3> ${desc}</div><div><h3>URL:</h3> ${url}</div><div><h3>Address:</h3> ${addrStr}</div></div`);
        });
      })
      .catch(error => {
        console.log(error.message);
        resultsDiv.html = error.message;
      });
  });

}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});