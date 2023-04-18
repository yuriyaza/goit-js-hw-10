function oneCountry(data) {
  const htmlMarkup = data
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
  return htmlMarkup;
}

function countryList(data) {
  const htmlMarkup = data
    .map(element => {
      return `
        <li class="many-countries">
          <img class="country-flag" src="${element.flags.svg}" alt="${element.name.common} flag"/>
          <p class="country-name">${element.name.official}</p>
       </li>
      `;
    })
    .join('');
  return htmlMarkup;
}

export const createMarkup = { oneCountry, countryList };
