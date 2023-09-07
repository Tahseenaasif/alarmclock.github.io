//the the dom element target veriables's
let time = document.getElementById("time");
let alarmcont = document.getElementById("alarmscont"); 
let input = document.getElementsByClassName("input")[0]; 
let alarmdiv= document.getElementsByClassName("alarm-div");
let alarmlist=document.getElementById("alarm-list");
let hours=document.getElementById("hours");
let minutes=document.getElementById("minutes");
let ampm=document.getElementById("ampm");
let notification=document.getElementById("notification");
let day=document.getElementById("day");

//audio class object to play alarm audio when needed
let ringtone = new Audio("melody_alarm_clock.mp3");

//vriable to maintain the play/pause of the song and viviblity of the div
let isplay=false;
let isvisible=false;

//alarms array to store the alarms
 let alarms=[];
//intervat to show the time on the screeen
setInterval(() => {
  let currentDate = new Date();
  let am_pm = currentDate.toLocaleTimeString();
  time.innerHTML = am_pm;
}, 1000);

//month arrays to show the month on th escreen
let arr=["January","February","March","April","May","June","July","August","September","Octuber","November","December"];

//function to show the date ,day and time on the screen
setInterval(() => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dd= date.getDate();
  console.log(dd+" "+month+" "+year);
  day.innerHTML = dd+" "+arr[month-1]+" "+year;
}, 1000);

//this is upper level function which will take the input form the dom and invoke the functions that will add alrams to arrays and alarms list
function add() {
  console.log("btn-clicked");
  
       const hour=hours.value;
       const minute=minutes.value;
       const am_pm=ampm.value;
     
      console.log("hours",hour);
      console.log("minutes",minute);
      console.log("ampm",am_pm);

     const time={
      hour:hour,
      minute:minute,
      am_pm:ampm.value,
      id:Date.now()
   }
   addTime(time);
}

//functiom which will add or the alarms to the alarms arrays  and render it to the alarms list

function  addTime(time) {

  if(alarms){
     alarms.push(time);
      renderList();
      showNotification("alarm added sucessfully");
      return;
   }
   showNotification("alarm can not be added");
}

function addTakstodom(time){
     
  var li=document.createElement('li');
  li.innerHTML=
  `
  <div class="d-flex justify-content-around align-items-center p-2 alarm-div shadow  m-2">
  <div ><p class="fw-bolder fs-4 pt-2 ">${time.hour}:${time.minute} &nbsp ${time.am_pm}<p></div>
  <div><button class="delete" id="${time.id}">Delete</button></div>
</div>

`;
alarmlist.append(li);
};

//funcion to render the alarm from the alarms  array to alarms list 

function renderList () {
  alarmlist.innerHTML='';

 for(let i=0;i<alarms.length;i++){
   addTakstodom(alarms[i]);
 }


}
//function to show notifiation of delete or add alarm
function showNotification(text) {
    alert(text);
}

//this function is ushed to delete the alrem form the alarm list

function deleteAlarm (alarmid) {
  console.log("alarmid "+alarmid);
  let newalarm=alarms.filter((alarm) =>{
      console.log(alarm.id)
      return alarm.id != alarmid;
  })
  alarms=newalarm;
  renderList();
  showNotification("Alarm has been deleted");
}

var x = document.getElementById("myAudio");

//this function will involed in every instant of time to check weather the time of alarm is happen of not

function  checkalarm(){
  const d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let ampm='AM'
  if(h>12){
    h=h-12;
    ampm='PM';
  }
  if(h==0){
    h=12;
  }
  console.log(ampm+" "+ h)
  for(let i=0;i<alarms.length;i++){
    
     if(parseInt(alarms[i].hour)==h && parseInt(alarms[i].minute)==m && alarms[i].am_pm == ampm && s==1 && isplay==false ){
           console.log("alarm has been started" +s);
            playpause();
           notification.style.visibility = "visible"; 
           isvisible=true;
          
     }
      
  }
   requestAnimationFrame(checkalarm);
} 


checkalarm();



//this is the eventdelegation class to capture the event on the screen which is click

  function handleInputClick(e){
    const target=e.target;
    // console.log(target.Id);
    if(target.className== "delete"){
            
              const alarmid=target.id;
              deleteAlarm(alarmid);
              return;
    }
   

    if(target.id=="btn"){
      add()
    }

    if(target.id =="stopbtn"){
      console.log("sto-btn has been clicked");
      if(isplay==true &&isvisible==true){
        playpause();
        notification.style.visibility = "hidden"; 
        isvisible=false;
      }
     
    }
 }

//event delegation class is invoked

 document.addEventListener('click',handleInputClick);

//  fucntion to play pause the song when alarm time is completed
 function playpause(){
  if(isplay==false){
    ringtone.play();
    ringtone.loop = true;
    isplay=true;
  }else{
        ringtone.loop = false;
         ringtone.pause();
         isplay=false;
  }
 
 }

