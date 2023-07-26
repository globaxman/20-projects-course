// @ts-nocheck
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getAnimations('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

// set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate countdown
function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // hide input
    inputContainer.hidden = true;

    // if coundown has ended, show complete
    if(distance < 0){
        completeEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    }else {
        // countdown in progress
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }

    }, 1000)
}

function updateCountdown(e){
    e.preventDefault()
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    // check if valid date
    if(countdownDate){
        // get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }else {
        alert('please submit countdown date');
    }
}

// reset all values
function reset(){
    // hide countdown, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;;
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive)
    // reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')
}

function restorePreviousCountDown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    };
};

// event listener

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load check lockalStorage
restorePreviousCountDown();