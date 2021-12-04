let state_list=[
    {id: 'IN-AN', name: 'Andaman and Nicobar Islands'},
    {id: 'IN-AP', name: 'Andhra Pradesh'},
    {id: 'IN-AR', name: 'Arunachal Pradesh'},
    {id: 'IN-AS', name: 'Assam'},
    {id: 'IN-BR', name: 'Bihar'},
    {id: 'IN-CH', name: 'Chandigarh'},
    {id: 'IN-CT', name: 'Chhattisgarh'},
    {id: 'IN-DD', name: 'Daman and Diu'},
    {id: 'IN-DL', name: 'Delhi'},
    {id: 'IN-DN', name: 'Dadra and Nagar Haveli'},
    {id: 'IN-GA', name: 'Goa'},
    {id: 'IN-GJ', name: 'Gujarat'},
    {id: 'IN-HP', name: 'Himachal Pradesh'},
    {id: 'IN-HR', name: 'Haryana'},
    {id: 'IN-JH', name: 'Jharkhand'},
    {id: 'IN-LK', name: 'Ladakh'},
    {id: 'IN-KA', name: 'Karnataka'},
    {id: 'IN-KL', name: 'Kerala'},
    {id: 'IN-LD', name: 'Lakshadweep'},
    {id: 'IN-MH', name: 'Maharashtra'},
    {id: 'IN-ML', name: 'Meghalaya'},
    {id: 'IN-MN', name: 'Manipur'},
    {id: 'IN-MP', name: 'Madhya Pradesh'},
    {id: 'IN-MZ', name: 'Mizoram'},
    {id: 'IN-NL', name: 'Nagaland'},
    {id: 'IN-OR', name: 'Odisha'},
    {id: 'IN-PB', name: 'Punjab'},
    {id: 'IN-PY', name: 'Puducherry'},
    {id: 'IN-RJ', name: 'Rajasthan'},
    {id: 'IN-SK', name: 'Sikkim'},
    {id: 'IN-TG', name: 'Telangana'},
    {id: 'IN-TN', name: 'Tamil Nadu'},
    {id: 'IN-TR', name: 'Tripura'},
    {id: 'IN-UP', name: 'Uttar Pradesh'},
    {id: 'IN-UT', name: 'Uttarakhand'},
    {id: 'IN-WB', name: 'West Bengal'},
    {id: 'IN-JK', name: 'Jammu and Kashmir'}
]
//SELECT SEARCH STATE ELEMENTS   
const search_state_element=document.querySelector(".search-state");
const state_list_element=document.querySelector(".state-list");
const change_state_btn=document.querySelector(".change-state");
const close_list_btn=document.querySelector(".close");
const input=document.getElementById("search-input");

//CREATE TE STATE LIST
function createStateList(){
    const num_state=state_list.length;
    let i=0,ul_list_id;
    state_list.forEach((state,index)=>{
        if(index% Math.ceil(num_state/num_of_ul_lists)==0){
            ul_list_id=`list-${i}`;
            state_list_element.innerHTML +=`<ul id='${ul_list_id}'></ul>`;
            i++;
        }
        document.getElementById(`${ul_list_id}`).innerHTML += `
            <li id="${state.name}">
            ${state.name}
            </li>
        `;
    })
}
let num_of_ul_lists=3;
createStateList();

//SHOW/HIDE STATE LIST ON CLICK
change_state_btn.addEventListener("click",function(){
    input.value="";
    resetStateList();
    search_state_element.classList.toggle("hide");
    search_state_element.classList.add("fadeIn");
})
close_list_btn.addEventListener("click",function(){
    search_state_element.classList.toggle("hide");
})
state_list_element.addEventListener("click",function(){
    search_state_element.classList.toggle("hide");
})
state_list.forEach((state)=>{
    document.getElementById(state.name).addEventListener("click",function(){
        show(state.name);
    })
});

//STATE FILTER
input.addEventListener("input",function(){
    let value=input.value.toUpperCase();
    state_list.forEach(state=>{
        if(state.name.toUpperCase().startsWith(value)){
            document.getElementById(state.name).classList.remove("hide");
            show(value);
        }
        else
        {
            document.getElementById(state.name).classList.add("hide");
        }
    })
})

//RESET STATE LIST
function resetStateList(){
    state_list.forEach(state => {
        document.getElementById(state.name).classList.remove("hide");
    })
}

//FETCHING DATA FROM API
const state_name_element=document.querySelector('.state .name');
let user_state;
let dataset1;
fetch("https://api.rootnet.in/covid19-in/stats/latest")
.then(response => response.json()) 
.then(data => {
  dataset1=data["data"];
});
let dataset2;
fetch("https://api.rootnet.in/covid19-in/contacts")
.then(response => response.json()) 
.then(data => {
  dataset2=data["data"];
});
let dataset3;
fetch("https://api.rootnet.in/covid19-in/hospitals/beds")
.then(response => response.json()) 
.then(data => {
  dataset3=data["data"];
});
function show(state) {
    let div;
    for (let r of dataset1.regional) {
        if((r.loc==state)||(r.loc.toUpperCase().startsWith(state))){
            console.log(state);
            state_name_element.innerHTML = r.loc;
            div = `<div class=${r.loc}> 
            <h3>NAME : ${r.loc} </h3>
            <h3>TOTAL CASES : ${r.totalConfirmed}</h3>
            <h3>RECOVERED : ${r.discharged}</h3> 
            <h3>DEATHS : ${r.deaths}</h3>          
            </div>
            <br>`;
        }
    }
    console.log(dataset3);
    for (let r of dataset3.regional) {
        if((r.state==state)||(r.state.toUpperCase().startsWith(state))){
            console.log(state);
            state_name_element.innerHTML = r.loc;
            div += `<div class=${r.state}> 
            <h3>Rural Hospitals: ${r.ruralHospitals}</h3>
            <h3>Rural Beds: ${r.ruralBeds}</h3>
            <h3>Urban Hospitals: ${r.urbanHospitals}</h3>
            <h3>Urban Beds: ${r.urbanBeds}</h3>
            <h3>Total Hospitals: ${r.totalHospitals} </h3>    
            <h3>Total Beds: ${r.totalBeds}</h3>     
            </div>
            <br>`;
        }
    }
    console.log(dataset2);
    for (let r of dataset2.contacts.regional) {
        if((r.loc==state)||(r.loc.toUpperCase().startsWith(state))){
            console.log(state);
            state_name_element.innerHTML = r.loc;
            div += `<div class=${r.loc}> 
            <h3>CONTACT : ${r.number} </h3>         
            </div>
            <br>`;
        }
    }
    document.getElementById("reports").innerHTML = div;
}