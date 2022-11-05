"use strict";

async function getJokeFromAPI(){
	const rapidKeyJoke = document.querySelector("#rapidKeyJoke").value;

	if (rapidKeyJoke === null) return;

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': `${rapidKeyJoke}`,
			'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
		}
	};
	
	const fetchJoke = await fetch(`${JOKE_URL}`, options);
	const res = await fetchJoke.json();
	return res;
}

async function displayJoke(e){
	if (!e.target.closest("#new-joke")) return;
	const joke = await getJokeFromAPI();
	const div = document.querySelector("#result");
	div.innerHTML = "";
	div.insertAdjacentHTML("beforeend", jokeFormPerType(joke));
}

function jokeFormPerType(joke){
	if (joke.type === "single") {
		return `<p>${joke.joke}</p>`;
	}
	return `
	<p> ${joke.setup} </p>
	<p> ${joke.delivery} </p>`;
}