class CountriesAPI {
	searchCountry(name) {
		const options = {
		  
	  }

    fetch('https://restcountries.com/v3.1/name')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);

        if (err.message === '404') {
          alert('За вашим запитом нічого не знайдено');
        }
      });
  }
}
