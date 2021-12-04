//SELECT ALL THE ELEMENTS
const country_name_element=document.querySelector('.country .name');
const total_cases_element=document.querySelector(".total-cases .value");
const recovered_element= document.querySelector(".recovered .value");
const deaths_element=document.querySelector(".deaths .value");
const ctx=document.getElementById("axes_line_chart").getContext("2d");

//APP VARIABLES
let app_data=[],cases_list=[],recovered_list=[],deaths_list=[],dates=[],formatedDates=[];
let total_cases=0,total_recovered=0,total_deaths=0;
//GET USERS COUNTRY CODE
let country_code=geoplugin_countryCode();
let user_country;
country_list.forEach(country=>{
	if(country_code==country.code)
	{
		user_country=country.name;
	}

})
/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */
function fetchData(country){
    user_country=country;
	country_name_element.innerHTML = "Loading...";
	(cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);
	async function getapi() {
    const response1=await fetch("https://api.covid19api.com/total/country/" + user_country + "/status/confirmed");
    var data = await response1.json();
	data.forEach((entry) => {
          formatedDates.push(formatDate(entry.Date));
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
          //total_cases=total_cases+entry.Cases;
        });
    const response2=await fetch("https://api.covid19api.com/total/country/" + user_country + "/status/recovered");
    var data = await response2.json();
	data.forEach((entry) => {
		  recovered_list.push(entry.Cases);
          //total_recovered=total_recovered+entry.Cases;
        });
    const response3=await fetch("https://api.covid19api.com/total/country/" + user_country + "/status/deaths");
    var data = await response3.json();
	data.forEach((entry) => {
		  deaths_list.push(entry.Cases);
          //total_deaths=total_deaths+entry.Cases;
        });
		updateUI();

	};
    getapi();
}
fetchData(user_country);

//UPDATE UI FUNCTION
function updateUI(){
	updateStats();
	axesLinearChart();
}
function updateStats(){
    country_name_element.innerHTML = user_country;
    total_cases_element.innerHTML = cases_list[cases_list.length-1];
    recovered_element.innerHTML = recovered_list[recovered_list.length-120];
    deaths_element.innerHTML = deaths_list[deaths_list.length-1];
}

//UPDATE CHART
let my_chart="";
function axesLinearChart(){
    if(my_chart)
    {
        my_chart.destroy();
    }
	my_chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Cases',
            data: cases_list,
            fill:false,
            borderColor:'#fff',
            backgroundColor:'#fff',
            borderWidth:1
        },
        {
            label: 'Recovered',
            data: recovered_list,
            fill:false,
            borderColor:'#009688',
            backgroundColor:'#009688',
            borderWidth:1
        },
        {
            label: 'Deaths',
            data: deaths_list,
            fill:false,
            borderColor:'#f44336',
            backgroundColor:'#f44336',
            borderWidth:1
        }
    ],
        labels: formatedDates
    },
    options: {
        responsive:true,
        maintainAspectRation:false,
    }
});
}

//FORMAT DATES
const monthsNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function formatDate(dateString){
    let date=new Date(dateString);
    return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}