//import {exerciseList} from './js/getData.js';
/* 추가했을 때 바로 페이지 새로고침 */
var exList = [];

document.getElementById("addBtn").addEventListener('click', function(){
    console.log("add");
    localStorage.setItem('btnName', 'add');
    window.open("list_popup.html", "a", "width=600, height=600, left=500, top=300");
});
document.getElementById('home').addEventListener("click", function(){
    console.log("home");
    history.back();
});

window.onload=function(){
    chrome.alarms.clearAll();

    console.log('notification!')
    chrome.notifications.getAll((items) => {
        if ( items ) {
            for (let key in items) {
                console.log(key);
                chrome.notifications.clear(key);
            }
        }
    });

    chrome.storage.sync.get("exList", function(result) {
        //let exList = result.exList
        setInfo(result.exList);
        console.log('Value currently is ', result.exList);
    });

    //getInfo();
    console.log("받은거 확인용"); console.log(exList);

    var length=exList.length;
    console.log("length: ",length);
    //printAlarm();
}

function setInfo(exList_t){
    exList=exList_t;
    console.log('길이', exList_t.length);
    if(exList==null) console.log("없어");
    console.log("1", exList);//, "length= "+exList.length);
    var listArea = document.querySelector('.lists');

    if(exList!=null){
        for(var i=0;i<exList.length;i++)
        {
            var listEntry = document.createElement('button');
            listEntry.classList.add('listEntry');
            listEntry.classList.add('my-3');
            listEntry.classList.add('py-3');
            //listEntry.classList.add('mx-auto');
            listEntry.setAttribute("disabled", "");
            listEntry.setAttribute("style", "text-align: center;")
            listEntry.setAttribute("id", "exList"+i);

            var delete_btn = document.createElement('button');
            var modify_btn = document.createElement('button');
            delete_btn.classList.add('listBtn');
            delete_btn.classList.add('my-3');
            delete_btn.classList.add('py-3');
            //delete_btn.classList.add('mx-auto');
            delete_btn.setAttribute("id", i);
            delete_btn.innerHTML='<img src="/images/trash-can.png" width="40">'
            delete_btn.addEventListener("click", function(){
                //exList.splice(i, 1);
                if (confirm("정말 삭제하시겠습니까??") == true){    //확인
                    delete_entry(this.id);
                    location.reload();                
                }else{   //취소
                    console.log("취소 안함.");
                }
            }); 

            modify_btn.classList.add('listBtn');
            modify_btn.classList.add('my-3');
            modify_btn.classList.add('py-3');
            //modify_btn.classList.add('mx-auto');
            modify_btn.setAttribute("id", "m"+i);
            modify_btn.innerHTML='<img src="/images/edit-button.png" width="40">';
            modify_btn.addEventListener("click", function(){
                window.open("list_popup.html", "a", "width=600, height=600, left=500, top=300");
                localStorage.setItem('btnName', 'modify');
                console.log(this.id);
                localStorage.setItem('exId', this.id);
            });



            listArea.appendChild(listEntry);
            listArea.appendChild(modify_btn);
            listArea.appendChild(delete_btn);
            listEntry.innerHTML=exList[i].name;

            //버튼 리스너 누르면 새로운 팝업 띄우기.
            //팝업 안에서 정보 수정 가능.
            //여기 같은 줄에 수정, 삭제 버튼 만들기.
        }
            //알림 만들기
            for(let i=0;i<exList_t.length;i++){
                console.log('exList_id '+exList_t[i].id, 'exList_date '+exList_t[i].date);
                for(let j=0;j<7;j++){
                    if(exList_t[i].date[j]==true) {
                        console.log(j, exList_t[i].date[j]);

                        console.log('addtime', calculate_scheduleAlarm(j, exList_t[i].time));
                        createAlarm(exList_t[i].id+'_'+j, calculate_scheduleAlarm(j, exList_t[i].time), exList_t[i].link);
                    }
                }
            }
            
    }
    printAlarm();
    console.log('notification?');
    chrome.notifications.getAll((items) => {
        if ( items ) {
            for (let key in items) {
                console.log(key);
            }
        }
      });
}


function delete_entry(id){
    console.log("id", id, exList, typeof(exList), typeof(exList[0]), exList[0]);
    let filtered = exList.filter((element) => element.id != id);
    for(let i=0;i<filtered.length;i++){
        filtered[i].id=i;
    }
    console.log("filtered", filtered);

    exList=filtered;
    console.log(exList);

    chrome.storage.sync.set({exList}, function() {
        console.log('Value is set to ', exList);
        console.log("저장되었습니다~");
    });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("change recived!");
    location.reload();                
});

function createAlarm(name, addTime, url){
    console.log(name+' 알람이 생성됩니다');
    chrome.alarms.create(name, {when: Date.now()+addTime,   periodInMinutes: 10080}); //1주일마다
    var myNotificationID = name;

    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name == name) {
            chrome.notifications.create(name, {
                type: 'basic',
                iconUrl: 'images/fairy_basic.png',
                title: 'Test Message',
                message: '운동할 시간이야!',
                priority: 2,
                requireInteraction: true,
                buttons: [
                  { title: 'Exrcise' },
                  { title: 'Cancle' },
                ]
            
            }
            /*,  function(id) {
                myNotificationID = id;
            }*/);

            // Respond to the user's clicking one of the buttons
            chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) { //notifId
            if (notifId === myNotificationID) {
                if (btnIdx === 0) {
                    window.open(url); //exercise 눌렀을 때 페이지 이동
                } else if (btnIdx === 1) {
                    saySorry(); //cancle 눌렀을 때 기능 구현
                }
            }
            });

            // Add this to also handle the user's clicking 
            // the small 'x' on the top right corner
            chrome.notifications.onClosed.addListener(function() {
                //saySorry(); //여기에 무시했을 때 계산 함수 넣으면 될 거 같아요(요정 비만도 증가)
            });

            // Handle the user's rejection 
            // (simple ignore if you just want to hide the notification)
            function saySorry() {
                alert("Sorry to bother you !");
            }
        }
    });
}
function clearAlarm(name){
    chrome.alarms.clear(name);
    console.log(name+' 알람이 해제됩니다');
}
function printAlarm(){
    console.log(chrome.alarms.getAll());
}

function calculate_scheduleAlarm(input_date, input_time) { //input_hours: 시, input_minutes: 분, input_date: 요일
    let today = new Date();
    console.log('요일',today.getDay());
    let dif = input_date-today.getDay()+1;
    console.log('차이',dif);
    if(dif<0) dif=7-dif;
//86400000ms = 1일

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초
    let milliseconds = today.getMilliseconds(); // 밀리초

    let timeArray = input_time.split(':');
    for(let i=0;i<timeArray.length;i++){
        timeArray[i] = parseInt(timeArray[i]);
    }

    let hourDif = hours-timeArray[0];//timeArray[0]-hours;
    let minutesDif = minutes-timeArray[1]; //timeArray[1]-minutes;

    if(hourDif<0) hourDif=-hourDif;
    if(minutesDif<0) minutesDif=-minutesDif;

    console.log(timeArray, hours, minutes);
    console.log(typeof(timeArray[0]));
    console.log('시간 차이', hourDif, hourDif*3600000);
    console.log('분 차이', minutesDif, minutesDif*60000);

    hourDif=hourDif*3600000;
    minutesDif=minutesDif*60000;

    let addTime = dif*86400000+hourDif+minutesDif;

    return addTime;
}