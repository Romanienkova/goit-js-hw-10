import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput(e) {
  e.preventDefault();
  const countryName = e.target.value.trim();

  if (countryName === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }

  fetchCountries(countryName)
    .then(data => {
      renderCountryList(data);
    })
    .catch(err => {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryList(countries) {
  if (countries.length > 10) {
   countryInfo.innerHTML = '';
   countryList.innerHTML = '';

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1 && countries.length <= 10) {
    createCountriesList(countries);
  } else {
    createCountryInfo(countries);
  }
}

function createCountriesList(countries) {
  console.log(countries);
  const markup = countries
    .map(
      ({ flags: { svg }, name: { official } }) =>
        `
       <li class='item'>
         <img class='img'
            src='${svg}'
            alt='country flag'
            width=60
            height=30
         />
         <p class='text'>${official}</p>
      </li>
		`
    )
    .join('');
  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

function createCountryInfo(countries) {
  const markup = countries
    .map(
      ({
        name: { official },
        capital,
        population,
        languages,
        flags: { svg },
      }) =>
        `
				<img
					src='${svg}'
					alt='country flag'
					width=150
				/>
				<h1>${official}</h1>
				<p>Capital: <span class='span'>${capital}</span></p>
				<p>Population: <span class='span'>${population}</span></p>
				<p>Languages: <span class='span'>
					${Object.values(languages)}</span>
				</p>
			`
    )
    .join('');
  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
}
