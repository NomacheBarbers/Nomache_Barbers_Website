

const numDays = (y, m) => new Date(y, m, 0).getDate();
var selection_date = '';
var month = 0;
var month_name = 'August';
var month_selected = 'August';

var year = new Date().getFullYear();
var year_selected = year;

var day = new Date().getDate();
var day_selected = 1;

var amount_of_days = 30;
var final_date;

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var month_index = 0;

//console.log(numDays(2020, 2));

function make_days(){
    var days_string = '';
    var style = ''

    var amount_of_days = numDays(year_selected, month_index + 1);

    for(var b = 1; b < amount_of_days + 1; b++){
        //console.log('day ' + day);
        //console.log(month_index + '   ' + new Date().getMonth());
        if(b < day && month_index == new Date().getMonth() && year == new Date().getFullYear()){
            //pointer-events: none;
            style = 'non_day_button';
        }else{style = 'day_button';}

        days_string += '<button class = ' + '"' + style + '"' + `onclick = "select_day(${b})" id = "daybutton${b}">` + b.toString() + '</button>';
    }
    //console.log(days_string);

    for(var d = 0; d < 35 - amount_of_days; d++){
        days_string += "<button class = 'empty_button'>0</button>";
    }

    document.getElementById('day').innerHTML = days_string;

}

function change_month(int){
    if(year <= new Date().getFullYear() && int < 0 && month_index == 0){
        return;
    }

    month_index += int;


    if(month_index < 0){
        month_index = 11;
        if(year - 1 >= new Date().getFullYear()){
            year -= 1;
        }
        else{
            return;
        }
    }

    if(month_index > 11){
        if(year >= new Date().getFullYear() + 1){
            month_index = 11;
        }else{month_index = 0;}
        
        if(year + 1 <= new Date().getFullYear() + 1){
            year += 1;
        }
        else{
            return;
        }
        
    }

    if(month_index < new Date().getMonth() && year == new Date().getFullYear()){
        month_index = new Date().getMonth();
    }

    month_name = months[month_index];

    var month_element = document.getElementById('month_name');
    month_element.innerText = month_name + ' ' + year.toString();

    make_days();
    //console.log(month_name);

}

function calculate_minutes(int){
    var min = 0;

    min = int % 60;

    //console.log(min % 60);

    return min;
}

function calculate_hour(hour, int){
    var hour = hour;

    hour += parseInt(int / 60);

    //console.log(hour);

    return hour;
}

function make_times(){
    var zero = '';

    var morning_string = '';
    var morning_element = document.getElementById('morning');


    for(var i = 0; i < 12; i++){

        if(calculate_minutes(15 * i) == 0){zero = '0';}
        else{zero = '';}
        morning_string += '<button class = "times_button">' + (calculate_hour(9, 15 * i)).toString() + " : " +  (calculate_minutes(15 * i)).toString() + zero + "</button>";
    }

    morning_element.innerHTML = morning_string;



    var afternoon_string = '';
    var afternoon_element = document.getElementById('afternoon');

    for(var i = 0; i < 9 * 4; i++){
        if(calculate_minutes(15 * i) == 0){zero = '0';}
        else{zero = '';}

        afternoon_string += '<button class = "times_button">' + (calculate_hour(12, 15 * i)).toString() + " : " +  (calculate_minutes(15 * i)).toString() + zero + "</button>";
    }

    afternoon_element.innerHTML = afternoon_string;
}


function set_date(){
    var date = new Date(year, month, day);

    //day  = document.getElementById("day").value;
    //year = document.getElementById("year").value;

    var final_string = date.toLocaleDateString('en', { weekday: 'long' }); 

    //console.log(final_string);

    var total = document.getElementById('total_string');

    //total.innerText = final_string + ', ' + day.toString() + ', ' + month_name + ', ' + year.toString();
}


function wrap_up_times(){
    var el = document.getElementById('total_string');
    var text = "";

    text =  `Date: ${day_selected}, ${months[month_index]}, ${year_selected}`

    el.innerText = text;
}

function select_day(day = 1){
    day_selected = day;
    wrap_up_times();

}


setTimeout(
    () => {
        var date = new Date();
        make_days();
        make_times();
        //document.getElementById('year').innerHTML = '<option>' + date.getFullYear().toString() + '</option>' + "<option>" + (date.getFullYear() + 1).toString() + "</option>";
        change_month(0);
        set_date();
    }, 100 );

const message = 'testing';
var content = 'BEANS!!!!!!';
const owner = 'NomacheBarbers';
const repo = 'BarberShopData';
const path = 'data.json';
const auth = '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';
var booking_data = {'Person1' : {'time' : '12.30', 'length' : 60, "cut" : "Boys cut - 20min", 'price' : 20}};

async function upload_booking_data() {
    console.log('GETTING DATA...');
    const existingFile = await (await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${auth}`
          }
        }
      )).json();
      
    console.log('GOT DATA');
    console.log('UPLOADING NEW DATA...');

    await (await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${auth}`
            },
            body: JSON.stringify({
              message: message,
              content: btoa(JSON.stringify(booking_data)),
              sha: existingFile.sha,
            }),
          }
        )).json();
        //booking_data.toString()

        console.log('DONE UPLOADING');
}

async function get_booking_data(){
    console.log('GETTING DATA...');
    const existingFile = await (await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${auth}`
          }
        }
      )).json();
      console.log('GOT DATA');
      console.log(`DATA: ${atob(existingFile['content'])}`);
      booking_data = JSON.parse(atob(existingFile['content']));
      console.log(`BOOKING JSON DATA: ${booking_data}`);
}



