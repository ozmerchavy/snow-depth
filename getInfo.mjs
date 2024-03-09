import Papa from 'papaparse';
import fs from 'fs';

///////// CONSTANTS  /////////

const say = console.log;
const CSVSTATIONSLOCAL = 'stations.csv';
const CSVONLINEPATH = "https://api.weather.gc.ca/collections/climate-stations/items?f=csv"

async function getStations() {
  if (fs.existsSync(CSVSTATIONSLOCAL)) {
    const csvContent = fs.readFileSync(CSVSTATIONSLOCAL, 'utf8');
    return new Promise((resolve) => {
      Papa.parse(csvContent, {
        header: true,
        complete: (results) => resolve(results.data),
      });
    });
  } else {
    const response = await fetch(CSVONLINEPATH);
    const csvContent = await response.text();
    fs.writeFileSync(CSVSTATIONSLOCAL, csvContent);
    return new Promise((resolve) => {
      Papa.parse(csvContent, {
        header: true,
        complete: (results) => resolve(results.data),
      });
    });
  }
}

const weatherStations = await getStations();
//////////////////////////////



export function getAllProvinces() {
  const provincesSet = new Set(weatherStations.map(station => station['PROV_STATE_TERR_CODE']));
  return Array.from(provincesSet);
};

function getAllCities() {
  const citiesSet = new Set(weatherStations.map(station => station['STATION_NAME']));
  return Array.from(citiesSet);
};

export function getAllCitiesInProvince (province)  {
  const normalizedProvince = province.toLowerCase().replace(/\s|_/g, '');
  const citiesSet = new Set(weatherStations.filter(station => {
    const normalizedStationProvince = station['PROV_STATE_TERR_CODE']?.toLowerCase().replace(/\s|_/g, '');
    return normalizedStationProvince === normalizedProvince;
  }).map(station => station['STATION_NAME']));

  return Array.from(citiesSet);
};


function activeStations () {
  const currentYear = new Date().getFullYear().toString();
  return weatherStations.filter(station => station['LAST_DATE']?.startsWith(currentYear));
};

function filterByProvince (province) {
  const normalizedProvince = province.toLowerCase().replace(/\s|_/g, '');
  return weatherStations.filter(station => {
    const normalizedStationProvince = station['PROV_STATE_TERR_CODE']?.toLowerCase().replace(/\s|_/g, '');
    return normalizedStationProvince === normalizedProvince;
  });
};

function searchByName(name) {
  const normalizedQuery = name.toLowerCase().replace(/\s|_/g, '');
  return weatherStations.filter(station => {
    const normalizedStationName = station['STATION_NAME']?.toLowerCase().replace(/\s|_/g, '');
    return normalizedStationName?.includes(normalizedQuery);
  });
};

export function filterActiveStationsByNameAndProvince (name, province) {
  const currentYear = new Date().getFullYear().toString();
  const normalizedProvince = province.toLowerCase().replace(/\s|_/g, '');
  const normalizedQuery = name.toLowerCase().replace(/\s|_/g, '');

  return weatherStations.filter(station => {
    const normalizedStationProvince = station['PROV_STATE_TERR_CODE']?.toLowerCase().replace(/\s|_/g, '');
    const normalizedStationName = station['STATION_NAME']?.toLowerCase().replace(/\s|_/g, '');
    return station['LAST_DATE']?.startsWith(currentYear) &&
           normalizedStationProvince === normalizedProvince &&
           normalizedStationName?.includes(normalizedQuery);
  });
};







