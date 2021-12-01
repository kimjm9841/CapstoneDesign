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
    //history.back();
    location.replace('/options.html');
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
    //console.log('길이', exList_t.length);
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

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
      if(key=='exList'){
          console.log('change recived! exList!!');
          location.reload();
      }
    }
  });

function createAlarm(name, addTime, url){
    console.log(name+' 알람이 생성됩니다');
    chrome.alarms.create(name, {when: Date.now()+addTime,   periodInMinutes: 10080}); //1주일마다 10080
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

            },  function(id) {
              chrome.storage.sync.get("planned_num", function(result) {
                var planned_num = 0;
                if (!isNaN(result.planned_num)) {
                  planned_num = result.planned_num;
                }
                planned_num += 1;
                chrome.storage.sync.set({planned_num:planned_num}, function() {});
              });
            });

            // Respond to the user's clicking one of the buttons
            chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) { //notifId
            if (notifId === myNotificationID) {
                if (btnIdx === 0) {
                  window.open(url); //exercise 눌렀을 때 페이지 이동
                  insertStats(url);
                  chrome.storage.sync.get("fairy_bmi", function(result) { //운동하면 비만도 -2
                    var fairy_bmi = 0;
                    if (!isNaN(result.fairy_bmi)) {
                        fairy_bmi = result.fairy_bmi;
                    }
                    fairy_bmi -= 2;
                    if(fairy_bmi<0) fairy_bmi=0;
                    chrome.storage.sync.set({fairy_bmi:fairy_bmi}, function() {});
                  });
                } else if (btnIdx === 1) {
                    cancle(); //cancle 눌렀을 때 기능 구현
                    chrome.storage.sync.get("fairy_bmi", function(result) { //운동 취소하면 비만도 +3
                        var fairy_bmi = 0;
                        if (!isNaN(result.fairy_bmi)) {
                            fairy_bmi = result.fairy_bmi;
                        }
                        fairy_bmi += 3;
                        chrome.storage.sync.set({fairy_bmi:fairy_bmi}, function() {});
                      });
                }
            }
            });

            // Add this to also handle the user's clicking
            // the small 'x' on the top right corner
            chrome.notifications.onClosed.addListener(function() {
                //saySorry(); //여기에 무시했을 때 계산 함수 넣으면 될 거 같아요(요정 비만도 증가)
            });

            function insertStats(url) {
                var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                var len_video = 0;
  
                $.ajax({
                  url: "http://34.127.80.4/getTime.php",
                  type: "POST",
                  data: {
                    video_id: videoid[1]
                  }
                }).done(function(data) {
                  len_video = data;
                  console.log("영상 길이", len_video);
                });
              // 동영상 길이 파악

              var user_id = 0;
              var planned_num = 0;
              var practiced_num = 0;
              var exercise_time = 0;

              chrome.storage.sync.get(["id", "planned_num", "practiced_num", "exercise_time"], function(result) {
                user_id = result.id;
                planned_num = result.planned_num;

                if (result.practiced_num) {
                  practiced_num = result.practiced_num;
                }
                practiced_num += 1;

                if (result.exercise_time) {
                  exercise_time = result.exercise_time;
                }
                exercise_time += len_video;

                $.ajax({
                  url: "http://34.127.80.4/insertStats.php",
                  type: "POST",
                  data: {
                    user_id: user_id
                    , planned_num: planned_num
                    , practiced_num: practiced_num
                    , exercise_time: exercise_time
                  }
                }).done(function(data) {
                  console.log(data);
                  if (data == 1) {
                    console.log("디비 저장 완료");
                    chrome.storage.sync.set({planned_num:0, practiced_num:0, exercise_time:0}, function() {});
                  }
                  else if (data == 0) {
                    console.log("아직 일주일 안 지남");
                    chrome.storage.sync.set({practiced_num:practiced_num, exercise_time:exercise_time}, function() {});
                  }
                });
              });
            }

            // Handle the user's rejection
            // (simple ignore if you just want to hide the notification)
            function cancle() {
                alert("Please exercise together next time!");
                //요정 비만도 변경
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
