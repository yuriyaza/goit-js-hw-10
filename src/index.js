import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const searchString = searchBox.value.trim();
  if (searchString.length === 0) {
    clearCountryList();
    return;
  }
  fetchCountries(searchString)
    .then(searchResult => {
      switch (true) {
        case searchResult.length > 10:  errorTooManyMatches(); break;
        case searchResult.length >= 2:  displayCountryList(searchResult); break;
        case searchResult.length === 1: displayOneCountry(searchResult); break;
      }
    })
    .catch(error => errorMatchesNotFound(error));
}

function displayCountryList(searchResult) {
  const htmlMarkup = searchResult
    .map(element => {
      return `
        <li class="many-countries">
          <img class="country-flag" src="${element.flags.svg}" alt="${element.name.common} flag"/>
          <p class="country-name">${element.name.official}</p>
       </li>
      `;
    })
    .join('');
  countryList.innerHTML = htmlMarkup;
}

function displayOneCountry(searchResult) {
  const htmlMarkup = searchResult
    .map(element => {
      const capital = element.capital.join(', ');
      const languages = Object.values(element.languages).join(', ');
      return `
        <li class="one-country">
          <div class="country-title">
            <img class="country-flag" src="${element.flags.svg}" alt="${element.name.common} flag"/>
            <p class="country-name">${element.name.official}</p>
          </div>
          <ul class="country-description">
            <li class="country-item"><b>Capital:</b>&nbsp;${capital}</li>
            <li class="country-item"><b>Population:</b>&nbsp;${element.population}</li>
            <li class="country-item"><b>Language:</b>&nbsp;${languages}</li>
          </ul>
        </li>
      `;
    })
    .join('');
  countryList.innerHTML = htmlMarkup;
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function errorTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
  clearCountryList();
}

function errorMatchesNotFound() {
  Notify.failure('Oops, there is no country with that name');
  clearCountryList();
}
