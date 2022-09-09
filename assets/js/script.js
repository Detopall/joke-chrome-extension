"use strict";

document.addEventListener("DOMContentLoaded", init);
const URL = "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&idRange=0-150";

async function init(){
	document.addEventListener("click", displayJoke);
}

async function getJokeFromAPI(racism){
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '90afc290a4msh942c639bb0fe563p15afe0jsn7d560927cf10',
			'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
		}
	};
	
	const fetchJoke = await fetch(`${URL}${racism}`, options);
	const res = await fetchJoke.json();
	return res;
}

async function displayJoke(e){
	const racism = checkForNSFW();
	const joke = await getJokeFromAPI(racism);
	if (!e.target.closest("#new")) return;
	const div = document.querySelector("#result");
	div.innerHTML = "";
	div.insertAdjacentHTML("beforeend", jokeFormPerType(joke));
}

function checkForNSFW(){
	const optionChecked = document.querySelector("input#blacklistFlags").checked;
	if (!optionChecked) return "";
	return "&blacklistFlags=nsfw%2Cracist";
}

function jokeFormPerType(joke){
	if (joke.type === "single") {
		return `<p>${joke.joke}</p>`;
	}
	return `
	<p> ${joke.setup} </p>
	<p> ${joke.delivery} </p>`;
}