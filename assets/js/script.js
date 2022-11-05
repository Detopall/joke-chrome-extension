"use strict";

document.addEventListener("DOMContentLoaded", init);
const JOKE_URL = "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&idRange=0-150";

async function init(){
	document.addEventListener("click", displayJoke);

	await displayCurrencyConverter(); //shows "From" and "To" options
	document.addEventListener("click", displayConversion);

	document.addEventListener("click", changeApp);
}

function changeApp(e){
	if (e.target.closest("#blacklistFlags")){
		console.log("checked");
		document.querySelector("#blacklistFlags").checked = true;
		console.log("checked");
	}
	if (!e.target.closest("button")) return;
	if (!e.target.getAttribute("data-target")) return;

	if (e.target.getAttribute("data-target") === "joke"){
		document.querySelector(".currency-converter-ext").classList.add("hidden");
		document.querySelector(".joke-api-ext").classList.remove("hidden");
	} else {
		document.querySelector(".joke-api-ext").classList.add("hidden");
		document.querySelector(".currency-converter-ext").classList.remove("hidden");
	}
}

