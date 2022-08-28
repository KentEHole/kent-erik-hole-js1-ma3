

// Question 1 
/*
Convert the function below to an arrow function:
    function getRemainder(a,b) {
    return a % b;
}

*/
const getRemainder = (a ,b) => a % b; 

console.log(12, 2);

// Question 2

// how to call API need variable to store URL link to the api

const url = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=";
const secretKey = "d2ebab0975804f40b8511a02daea9829";
const Container =  document.querySelector(".content");
const ulContent =  document.querySelector(".list");
let errormessage = "unknown Error";
let errorNumber = 0; 
let maxContent = 8;
let timeOUT =  2000;
let statusAPI = 0;
let attempt = 0;
let intervalTimes = 3000;


function createHTML(facts) {
        const data =  facts;
        // maxContent is global value so i edit later in the code if want.
        // this now set to 8 as default. 
        maxContent;
        
        /*
        So many way solving this problem but if and i want max more dynamic way.
         if want make later edit how many for api not only 8
        */
    try{
        for(let i = 0; i < maxContent; i ++) {
            // data check
            // console.log(data[i].name);
                
            ulContent.innerHTML += `
                <il>Name: ${data[i].name} </il>
                <li>Rating: ${data[i].rating}</li>
                <li>How many tags:  ${data[i].tags.length}
                
            `;   
        }
    }
    catch(error) {
        statusAPI = 0
        waiting(error);

    }

};

const checkError = function() {
    if(!secretKey) {
        errormessage =  "API key is missing";
        errorNumber = 01;
        return errormessage;
    }

    if(!url){
        errormessage = "API url is missing";
        errorNumber = 02;
        return errormessage;
    }
}

const resettInt = function(){
    statusAPI = 0;
    attempt = 0;
    errorNumber = 0;

}

const waiting = function(message) {

    if (statusAPI == 1) {
        setTimeout(() => {
            facts = message;
            Container.classList.toggle("apiLoading");
            createHTML(facts);
        }, timeOUT);
    } if (statusAPI ==  0) {
        setTimeout(() => {
            Container.classList.toggle("apiLoading");
            Container.classList.toggle("error"); 
            attempt
        }, timeOUT);
      const attemptAPI = setInterval(() => {
            attempt ++
            Container.innerHTML = ``;
            Container.innerHTML += `Error loading API attempt ${attempt} ${message} ${errormessage} Please send developer the errorcode: ${errorNumber}`;
            if(attempt == 3) {
                clearInterval(attemptAPI)
                
              }
        }, intervalTimes);
        
    }

}

async function getRawg() {
    Container.classList.toggle("apiLoading");

    try{
        
        const response = await fetch(`${url}${secretKey}`);
        const data = await response.json();
        
        const facts = data.results;
        
        statusAPI = 1;
        waiting(facts);

    } catch (error) {
        statusAPI = 0;
        checkError();
        waiting(error);
    }
}

getRawg();