"use strict";

const GET_CURRENCY_INFO_URL = 'https://currency-exchange.p.rapidapi.com/listquotes';

const CONVERT_CURRENCY_URL = "https://currency-exchange.p.rapidapi.com/exchange";

async function displayConversion(e){
	e.preventDefault();
	if (!e.target.closest("#make-conversion")) return;
	const conversion = await getExchangeInfo();
	const result = document.querySelector(".result");
	const from = document.querySelector("#from").value;
	const to = document.querySelector("#to").value;
	const amount = document.querySelector("#q").value;
	const exchangeResult = (parseFloat(amount) * parseFloat(conversion)).toFixed(2);

	result.innerHTML = "";
	let html = "";

	if (amount === ""){
		html =
		`<h2> Not Converted:</h2>
		<p> ${from} &#8594; ${to} </p>
		<p> No number given, cannot process. </p>`;
	} else {
		html =
		`<h2> Converted:</h2>
		<p> ${from} &#8594; ${to} </p>
		<p> ${amount} &#8594; ${exchangeResult} </p>`;
	}

	result.classList.remove("hidden");
	result.insertAdjacentHTML("beforeend", html);
}

async function getExchangeInfo(){
	const fetchInfo = await fetch(`${CONVERT_CURRENCY_URL}${objectToQueryParams(getUserInfo())}`, {
	method: 'GET',
	headers: {
    'X-RapidAPI-Key': '90afc290a4msh942c639bb0fe563p15afe0jsn7d560927cf10',
    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'}
	});
	const res = await fetchInfo.json();
	return res;
}

function objectToQueryParams(obj) { //from=USD ...
	const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
	return "?" + params.join("&");
}

function getUserInfo(){
	return {
		"from": document.querySelector("#from").value,
		"to": document.querySelector("#to").value,
		"q": document.querySelector("#q").value
	}
}

async function displayCurrencyConverter(){
	const exchanges = await getCurrencyInfo();
	const selectFrom = document.querySelector("#from");
	const selectTo = document.querySelector("#to");
	let html = "";
	exchanges.forEach(currency => {
		html += `<option value="${currency}">${currency}</option>`;
	});
	selectFrom.insertAdjacentHTML("beforeend", html);
	selectTo.insertAdjacentHTML("beforeend", html);
}

async function getCurrencyInfo(){
	const options = {
		method: 'GET',
		headers: {
		  'X-RapidAPI-Key': '90afc290a4msh942c639bb0fe563p15afe0jsn7d560927cf10',
		  'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
		}
	};

	const fetchCur = await fetch(GET_CURRENCY_INFO_URL, options);
	const res = await fetchCur.json();
	return res;
}