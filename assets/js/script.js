"use strict";

document.addEventListener("DOMContentLoaded", init);
const URL = "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&idRange=0-150";

async function init(){
	document.addEventListener("click", displayJoke);

	injectCurrencyStart(); //shows "From" and "To" options
	document.addEventListener("click", displayCurrencyConverter);
}

