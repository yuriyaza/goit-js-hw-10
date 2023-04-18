function fetchCountries(name) {
  const URL = 'https://restcountries.com/v3.1/name';
  const filter = 'fields=name,capital,population,flags,languages';

  return fetch(`${URL}/${name}?${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export { fetchCountries };
