import { fetchCountries } from './fetchCountries';
import { createMarkup } from './createMarkup';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input#search-box');
const output = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
Notify.init({ position: 'center-top', showOnlyTheLastOne: true });

function onInput() {
  const searchString = searchBox.value.trim();
  if (searchString.length === 0) {
    clearCountryList();
    return;
  }
  fetchCountries(searchString)
    .then(searchResult => {
      if (searchResult.length > 10) {
        errorTooManyMatches();
      } else if (searchResult.length >= 2) {
        displayCountryList(searchResult);
      } else {
        displayOneCountry(searchResult);
      }
    })
    .catch(error => errorMatchesNotFound(error));
}

function displayCountryList(searchResult) {
  output.innerHTML = createMarkup.countryList(searchResult);
}

function displayOneCountry(searchResult) {
  output.innerHTML = createMarkup.oneCountry(searchResult);
}

function clearCountryList() {
  output.innerHTML = '';
}

function errorTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
  clearCountryList();
}

function errorMatchesNotFound() {
  Notify.failure('Oops, there is no country with that name');
  clearCountryList();
}
