
const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById("temp_real_val");
const tempStatus = document.getElementById("temp_status");

const data_hide = document.querySelector(".middle_layer");
// const appId = process.env.weatherAppId;

const getInfo = async(event) => {

    // alert("get Info");
    event.preventDefault();
    let cityVal = cityName?.value;
    if(cityVal === ""){
        city_name.innerText = "Please write something inside textbox before search!"
        data_hide?.classList?.add("data_hide")
    }
    else{
        try{
            if(cityVal){
                let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${process.env.weatherAppId}`;
                const response  = await fetch(url)
                let data = await response?.json();
                const arrData = [data];
                console.log("getInfo_weather", data, response, arrData[0].name )
                city_name.innerText = `${arrData[0]?.name} , ${arrData[0]?.sys?.country}`;
                temp_real_val.innerText = arrData[0].main.temp;
                tempStatus.innerText = arrData[0].weather[0]?.main;

                const tempMood = arrData[0].weather[0].main;

                if(tempMood === "Clear"){
                    tempStatus.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
                }
                else if(tempMood === "Clouds"){
                    tempStatus.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6'></i>"
                }
                else if(tempMood === "Clouds"){
                    tempStatus.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>"
                }
                else {
                    tempStatus.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
                }
            }
            else{
                console.log("getInfo_else", cityName, city_name?.value)
            }
            data_hide.classList.remove("data_hide")

        }
        catch(error){
            console.log("catch_error", error);
            city_name.innerText = "Please enter city name correctly !!";
            data_hide.classList.add("data_hide")

        }
    }

};

submitBtn.addEventListener("click" , getInfo );