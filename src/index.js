import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

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
  const searchQuery = e.target.value.trim();

  if (searchQuery) {
    fetchCountries(searchQuery)
      .then(data => {
        if (data.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          return renderCountryList(data);
        } else if (data.length === 1) {
          return renderCountryCard(data);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      });
  } else {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }
}

function renderCountryList(countries) {
  const markup = countries
	  .map(({ name, flags }) => 
	 	`
       <li class='item'>
         <img class='img'
            src='${flags.svg}'
            alt='country flag'
            width=60
            height=30
         />
         <p class='text'>${name}</p>
      </li>
		`
    )
    .join('');
  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

function renderCountryCard(countries) {
  const markup = countries
    .map(
      ({ name, capital, population, languages, flags }) =>
        `<div class='card'>
				<img
					src='${flags.svg}'
					alt='country flag'
					width=150
				/>
				<h1>${name}</h1>
				<p>Capital: <span class='span'>${capital}</span></p>
				<p>Population: <span class='span'>${population}</span></p>
				<p>Languages: <span class='span'>
					${Object.values(countries[0].languages)
				.map(elem => elem.name)
				.join(',')}
					</span>
				</p>
			</div>
      	`
    )
    .join('');

  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
}
