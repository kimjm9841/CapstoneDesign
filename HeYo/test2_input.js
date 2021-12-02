//import {algo} from './test2_back.js'; //import하고 아래에서 사용하면 됩니다!
//혹시 test2_back.js가 아니고 다른 파일에서 구현중이었으면 여기에 './(이 부분 수정).js'하시고
//test2_input.html에서 <script src="./test2_back.js" type="module"></script> 여기서 "./(이 부분 수정).js"하시면 될 것 같습니다!


function getID() {
  $.ajax({
    url: "http://34.127.80.4/getID.php",
    type: "POST",
    data: {}
  }).done(function(data) {
    console.log("User ID is ", data);
    chrome.storage.sync.set({id:data}, function() {});
  });
}

chrome.storage.sync.get("id", function(result) {
  if (!result.id) {
    console.log('Value currently is ');
    getID();
  }
  else {
    console.log("User ID is ", result.id);
  }
});
// 사용자 고유 아이디 부여


document.getElementById("startButton").addEventListener("click", begin);

const main=document.querySelector("#main");
const qna=document.querySelector("#qna");
const result=document.querySelector("#result");



const endPoint=7;
const question = new Array("q1", "q2", "q3", "q4", "q5", "q6");

const select1 = [];
const select2 = [];
const select3 = [];
const select4 = [];
const select5 = [];
const select6 = [];

const USERINFO = [];

let qIdx = 0;

document.getElementById("ok_btn1").addEventListener('click', clicked);
document.getElementById("q2_1").addEventListener('click', q2_1_click);
document.getElementById("q2_2").addEventListener('click', q2_2_click);
document.getElementById("ok_btn3").addEventListener('click', clicked);
document.getElementById("ok_btn4").addEventListener('click', clicked);
document.getElementById("ok_btn5").addEventListener('click', clicked);
document.getElementById("ok_btn6").addEventListener('click', clicked);
document.getElementById("q3_6").addEventListener('click', function(){No_chk("q3[]");});
document.getElementById("q4_6").addEventListener('click', function(){No_chk("q4[]");});
document.getElementById("q5_6").addEventListener('click', function(){No_chk("q5[]");});

document.getElementById("q3_1").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[3].checked==true){No_chk("q3[]");}}, false);
document.getElementById("q3_2").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[3].checked==true){No_chk("q3[]");}}, false);
document.getElementById("q3_3").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[3].checked==true){No_chk("q3[]");}}, false);

document.getElementById("q4_1").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[3].checked==true){No_chk("q4[]");}}, false);
document.getElementById("q4_2").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[3].checked==true){No_chk("q4[]");}}, false);
document.getElementById("q4_3").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[3].checked==true){No_chk("q4[]");}}, false);

document.getElementById("q5_1").addEventListener('click',function(){
    var tmpEle = document.getElementsByName("q5[]");
    if(tmpEle[1].checked==true){No_chk2("q5[]");}}, false);
document.getElementById("q5_2").addEventListener('click',function(){
        var tmpEle = document.getElementsByName("q5[]");
        if(tmpEle[3].checked==true){No_chk("q5[]");}}, false);
document.getElementById("q5_3").addEventListener('click',function(){
        var tmpEle = document.getElementsByName("q5[]");
        if(tmpEle[3].checked==true){No_chk("q5[]");}}, false);

function clicked(){
    var children;
    switch(qIdx){
        case 0:
            /*children=document.querySelectorAll('#q1');*/
            var tf = isValid_T("q1[]");
            if(tf==true){
                select1[0] = document.getElementById("name").value;
                disappear("#q1");
            }
            break;

        case 2:
            /*isValid();*/
            var tf = isValid("q3[]");
            if(tf==true){
                var arr = document.getElementsByName("q3[]");
                var count=0;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].checked == true) {
                        select3[count++]=i;
                    }
                }
                disappear("#q3");
            }
            break;

        case 3:
            var tf = isValid("q4[]");
            if(tf==true){
                var arr = document.getElementsByName("q4[]");
                var count=0;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].checked == true) {
                        select4[count++]=i;
                    }
                }
                disappear("#q4");
            }
            break;

        case 4:
            var tf = isValid("q5[]");
            if(tf==true){
                var arr = document.getElementsByName("q5[]");
                var count=0;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].checked == true) {
                        select5[count++]=i;
                    }
                }
                disappear("#q5");
            }
            break;

        case 5:
            var tf = isValid_T("q6[]");
            var tf_info = checkInfo("q6[]");
            if(tf==true && tf_info){
                var arr = document.getElementsByName("q6[]");
                for(var i=0;i<arr.length;i++){
                    select6[i]=arr[i].value;
                }
                disappear("#q6");
            }
            break;
    }
}
function No_chk(qNum) {
    var tmpEle = document.getElementsByName(qNum) // name 이 Job 인 객체만 추출
    console.log("뭐지", tmpEle);
    if (tmpEle[3].checked == true) { //'없어'가 체크가 되면
        for (var i = 0; i < tmpEle.length; i++) { //선택한 등급을 제외한 수만큼 for 수행. i는 등급 위치
            if(i != 3)
            {
                if (tmpEle[i].checked == true) {
                    tmpEle[i].checked = false;
                }
            }
        }
    }
}
function No_chk2(qNum) {
    var tmpEle = document.getElementsByName(qNum) // name 이 Job 인 객체만 추출
    if (tmpEle[3].checked == true) { //'없어'가 체크가 되면
        for (var i = 0; i < tmpEle.length; i++) { //선택한 등급을 제외한 수만큼 for 수행. i는 등급 위치
            if(i != 3)
            {
                if (tmpEle[i].checked == true) {
                    tmpEle[i].checked = false;
                }
            }
        }
    }
}
function q2_1_click(){
    select2[0]=0;
    disappear("#q2");
    location.replace("/list.html");
    //goResult(true);
}

function q2_2_click(){
    select2[0]=1;
    disappear("#q2");
}

function checkInfo(qNum){
    //세상에서 가장 큰 사람 기준으로 (기네스북) : 272cm니까 280cm까지로 하자.
    //세상에서 가장 작은 사람 기준으로 (기네스북) : 60cm니까 60cm로 하자.
    var arr = document.getElementsByName(qNum);
    var isChecked = true;

    for(var i=1;i<arr.length;i++){
        if(isNaN(arr[i].value)) {
            console.log(i);
            console.log(isNaN(arr[i]));
            alert("숫자 형태로 입력해주세요.")
            return false;
        }
    }
    /*for(var i=0;i<arr.length;i++)
        console.log(arr[i].value);*/

    var height=Number(arr[1].value);
    var weight=Number(arr[2].value);

    if(height>=60 && height<=280) isChecked=true;
    else {
        alert("알맞은 키를 입력해주세요(60~280cm)");
        return false;
    }

    if(weight>0 && weight<=600) isChecked=true;
    else {
        alert("알맞은 몸무게를 입력해주세요(0~600kg)");
        return false;
    }

    return true;
}
function isValid(qNum){
    var isChecked = false;
    var arr = document.getElementsByName(qNum);
    for(var i=0;i<arr.length;i++){
        if(arr[i].checked == true) {
            isChecked = true;
            break;
        }
    }
    if(!isChecked){
        alert("한 개 이상 선택해주세요.");
        return false;
    }
    return true;
}
function isValid_T(qNum){
    var isChecked = true;
    var arr = document.getElementsByName(qNum);
    for(var i=0;i<arr.length;i++){
        if(arr[i].value == "") {
            console.log("textarea 비어있음");
            isChecked = false;
            break;
        }
    }
    if(!isChecked){
        alert("빈칸을 모두 채워주세요.");
        return false;
    }
    return true;
}
function disappear(qName){
    var children=document.querySelectorAll(qName);
    for(let i=0; i<children.length; i++){
        children[i].disabled=true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
    }
    setTimeout(()=>{
        for(let i=0; i<children.length; i++){
            children[i].style.display='none';
        }
        goNext(++qIdx);
    }, 450)
}

function goResult(isq2){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.WebkitAnimation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.WebkitAnimation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    }, 450)
    USERINFO[0] = select1[0];
    USERINFO[1] = select2[0];
    USERINFO[2] = select3;
    USERINFO[3] = select4;
    USERINFO[4] = select5;
    USERINFO[5] = select6[0];
    console.log(select1); //이름
    console.log(select2); //운동계획 선호
    console.log(select3); //아픈부위
    console.log(select4); //선호부위
    console.log(select5); //운동기구
    console.log(select6); //mbti, 키, 몸무게

    var resultArea = document.querySelector('.resultDesc');
    var result_title;
    var result_desc = document.createElement("p");
    var mbti_id=0;
    var bmi_id=0;
    if(select6[0]=='isfp' || select6[0]=='infp' || select6[0]=='esfp' || select6[0]=='enfp') mbti_id=0;
    else if(select6[0]=='isfj' || select6[0]=='infj' || select6[0]=='esfj' || select6[0]=='enfj') mbti_id=1;
    else if(select6[0]=='istp' || select6[0]=='intp' || select6[0]=='estp' || select6[0]=='entp') mbti_id=2;
    else if(select6[0]=='istj' || select6[0]=='intj' || select6[0]=='estj' || select6[0]=='entj') mbti_id=3;
    console.log(mbti_result[mbti_id]);

    //result_desc.setAttribute("style", "text-align:center");
    //result_desc.innerHTML = select1+mbti_result[mbti_id].desc;
    resultArea.innerHTML= select1+mbti_result[mbti_id].desc+'&nbsp;';
    //resultArea.appendChild(result_desc);

    var height=select6[1]*0.01;
    var height_2=height*height;
    var bmi=select6[2]/height_2;
    console.log(bmi);
    if(bmi>=30){
        //var result_bmi = document.createElement("p");
        //result_bmi.setAttribute("style", "text-align:center");
        //result_bmi.innerHTML = bmi_result[0].desc;
        //resultArea.appendChild(result_bmi);
        resultArea.innerHTML= select1+mbti_result[mbti_id].desc+'&nbsp;'+bmi_result[0].desc;
        USERINFO[6] = 1;
    }
    else{
        USERINFO[6] = 0;
    }
    console.log(USERINFO[6]);
    chrome.storage.sync.set({user_name:select1, pain:select3, pre:select4, equi:select5, mbti:select6[0], height:select6[1], weight:select6[2]}, function() {
        /*console.log('Value is set to ' + user_name);
        console.log(pain);
        console.log(pre);
        console.log(equi);
        console.log(mbti);
        console.log(height);
        console.log(weight);*/
        console.log("저장되었습니다~");
    });

    //테스트
    compare();

}

function goNext(qIdx){
    if(qIdx+1 === endPoint){
        goResult(false);
        return;
    }
    var q=document.querySelector('.qBox');
    if(qIdx==5){q.innerHTML='Q6.'+select1[0]+'님'+qnaList[qIdx].q;}
    else{q.innerHTML=qnaList[qIdx].q;}
    var a=document.getElementById(question[qIdx])
    a.style.display="";

    console.log(qIdx);

    var status = document.querySelector('.statusBar')
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin(){ //시작하기 버튼
    //algo("시작"); //이렇게 호출하면 test2_back.js에서 함수 가져올 수 있어요!
    var fairycloset=[0,1,2,3];
    chrome.storage.sync.set({fairy_bmi:1, fairy_name:"요정", fairy_closet:fairycloset}, function() {
        console.log("요정정보 초기화");
      });

    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.WebkitAnimation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.WebkitAnimation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        goNext(qIdx);
    }, 450);

}



//document.getElementById("ok_btnR").addEventListener('click', compare);
document.getElementById("ok_btnR").addEventListener('click', function(){
    let isChecked = false;
    let checkArr = document.getElementsByName("rec[]");
    let exList = new Array();
    let ex_id = new Array();
    for(var i=0;i<checkArr.length;i++){
        if(checkArr[i].checked == true) {
            ex_id.push(checkArr[i].id);
            //let textArr = document.getElementById(ex_id);
        //console.log(ex_id, exer_where[exercise[ex_id]['exercise']].desc+exer_tool[exercise[ex_id]['tool']].desc+exer_fat[exercise[ex_id]['BMI']].desc, exercise[ex_id]['link']);
            //exList.push({"id":i, "name":textArr.name, "date":[true, false, true, false, true, false, false], "link":exercise[ex_id].link});
            //select3[count++]=i;
        }
    }
    console.log('선택된 id', ex_id);
    let count=0;
    for(let j=0; j<ex_id.length; j++){
        for(let i=0; i<exercise.length; i++){
            if(exercise[i]['id']==ex_id[j]) exList.push({"name":exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc, "link":exercise[i]['link']});
        }
    }
    console.log("!확인!");
    console.log(exList);

    if (confirm("추천 운동을 등록하시겠습니까?") == true){    //확인
        chrome.storage.sync.set({exList}, function() {
            console.log('Value is set to ', exList);
            console.log("저장되었습니다~");
        });
        location.replace("/list.html"); //운동목록 페이지로 이동
    }else{   //취소
        console.log("등록 안함.");
    }

    /* confirm 저거 안되면 다시 살릴용도..
        chrome.storage.sync.set({exList}, function() {
        console.log('Value is set to ', exList);
        console.log("저장되었습니다~");
    });
    */
});
/*
                "name": {"type": "string"},
                "time": {"type": "string"},
                "date": {"type": "array"},
                "link": {"type": "string"}
*/
//select1 = ["ID"]
//select2 = [1] //auto XX
//select3 = [5] //hurt
//select4 = [5] //exercise
//select5 = [5] //tool
//select6 = ['INFJ',1] //mbti / bmi

//데이터셋 수정이 필요
//이 후 추가할 수도 있으니
//없으면 0으로 해야할듯
let exercise = [];

function getData() {
  $.ajax({
    url: "http://34.127.80.4/getVideo.php",
    type: "POST",
    data: {}
  }).done(function(data) {
    exercise = JSON.parse(data);
    console.log(exercise);
  });
};

getData();



var exerciseArea = document.querySelector('.exerciseList');


function compare(){
    console.log("===================")
    console.log(USERINFO[2][0], USERINFO[2][1], USERINFO[2][3]);

    var point_list = [];
    for(var i = 0 ; i < exercise.length ;i++){ //추후 32 >> exercise 길이만큼 받자
        var point = 50;
        
        var temppoint = false;
        console.log(i)

        for(var j = 0 ; j < USERINFO[2].length ; j++){
            if(USERINFO[2][j] == 3){
                point+=10;
                console.log("아픔X 전부위")
                break;
            }//아픈부위가 없다면 전 영상 추천
            else if(USERINFO[2][j] == exercise[i]['hurt']){
                point-=20;
                temppoint = false;
                console.log("아픔 아픔")
                break;
            }//아픈부위관련 운동이면
            else{
                temppoint = true;
                console.log("아픔 다른아픔")
            }//아픈부위관련 없는 운동이면
        } 
        if(temppoint = true){
            point += 5;
        }//반복문을 돌리기 때문에 점수가 중첩될수 있다. 
         //user = {0,1} exercise = {1}이라면 처음루틴에서 else문을 한번 더 들어가기 때문
        temppoint = false;

        for(var j = 0 ; j < USERINFO[3].length ; j++){
            if(USERINFO[3][j] == 3){   
                point += 10;     
                console.log("운동부위X 전영상")
                break;
            }//선호하는 운동부위가 없다면 전 영상 추천
            else if(exercise[i]['exercise'] == 3){
                point += 5;
                console.log("운동부위 전신")
                break;
            }//선호하는 부위가 있을 때 전신운동 추천
             //전신운동에는 선호하는 부위도 작용이 되기 때문
            else if(USERINFO[3][j] == exercise[i]['exercise']){
                point+=20
                temppoint = false;
                console.log("운동부위 운동부위")
                break;
            }//선호하는부위관련 운동
            else{
              temppoint = true;
              console.log("운동부위 운동부위X")
            }//선호하는부위관련 없는운동
        }
        if(temppoint = true){
            point -= 10;
        }
        temppoint = false;


        for(var j = 0 ; j < USERINFO[4].length ; j++){
            // 1이 기구가 없을 때다
            if(USERINFO[4][j] == 3){
                if(exercise[i]['tool'] == 3){
                    console.log("기구X 맨몸")
                    break;
                }//유저가 기구가 없을때 맨몸운동 추천
                else{
                    point-=20
                    console.log("기구X 기구")
                    break;
                }//유저가 기구가 없을때 기구운동 비추천
            }    
            else if(exercise[i]['tool'] == 3){
                temppoint = false;
                console.log("기구 맨몸")
                break;
            }//유저가 기구가 있지만 맨몸운동
            else if(USERINFO[4][j] == exercise[i]['tool']){
                point+=20;
                temppoint = false;
                console.log("기구 기구")
                break;
            }//유저가 기구가 있고   관련 기구 운동
            
            else{
                temppoint = true;
                console.log("기구 다른기구")
            }//유저가 기구가 있지만 다른 기구 운동
        }
        if(temppoint = true){
            point -= 20;
        }


        //MBTI
        if(USERINFO[5][2] == exercise[i]['MBTI'][0] && USERINFO[5][3] == exercise[i]['MBTI'][1]){
            point*=1.1            
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else if(USERINFO[5][2] == exercise[i]['MBTI2'][0] && USERINFO[5][3] == exercise[i]['MBTI2'][1]){
            point*=1.1
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else{
            point*=0.9
        }

        //BMI
        if(USERINFO[6] == 0){
            if(exercise[i]['BMI'] == 1){
                point*=0.9
            }
        }//유저가 비만이 아닐 때 전 운동
        else if(USERINFO[6] == exercise[i]['BMI']){
            point*=1.1
        }//비만일 때 다이어트 관련 운동
        else{
            point*=0.9
        }//다이어트 관련없는 운동

        point_list.push(point);
        exercise[i]['point'] = point;
    }

    console.log(point_list)

    exercise.sort(function(a,b){
        return b.point - a.point;
    });
    console.log(exercise)


    var img_url1 = 'https://img.youtube.com/vi/';
    var img_url2 = '/2.jpg';

    var img_list = [];
    var vidurl;
    var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    for(var i = 0; i < exercise.length ; i++){
        vidurl = exercise[i]['link'];
        r = vidurl.match(rx);
        img_list[i] = r[1];
    }

    var exerciseArea = document.querySelector('.exerciseList');
    var elem = ""
    var count = 0;
    console.log("Recommend for "+ USERINFO[0] + " is")
    for(var i = 0; i<exercise.length ; i++){
        console.log(i, exercise[i]['id'], exercise[i]['link'], exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc);
        setRecList(i+1, exercise[i]['id'], exercise[i]['link'], img_list[i],
         exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc);

         //exerciseArea.innerHTML += "<img src='" + img_url1 + img_list[i] + img_url2 +"' width='200'>";
        //exerciseArea.innerHTML += "<a href=" + exercise[i]['link'] + " target='_blank'>"
        //+ exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc
        //+ "</a> <br>";
        if(exercise[i]['point'] != exercise[i+1]['point']){
            
            if(count > 5){
                break;
            }
            count += (exercise[i]['point'] - exercise[i+1]['point'])
        }
    }
}

function setRecList(idx ,id, link, imgId, ex_title){
    console.log("link의 id", id);
    var recArea = document.querySelector('.resultRec');
    var recEntry = document.createElement("input");
    recEntry.setAttribute('type', 'checkbox');
    recEntry.setAttribute('id', id);
    recEntry.setAttribute('name', "rec[]");
    //recEntry.setAttribute('class', 'btn-check');
    recEntry.classList.add('btn-check');
    recEntry.setAttribute('autocomplete', 'off');

    var recLabel = document.createElement("label");
    recLabel.setAttribute('class', 'btn btn-outline-primary');
    recLabel.setAttribute('for', id);
    recLabel.innerHTML = "추천"+idx;

    var buf = document.createElement("label");
    buf.innerHTML='&nbsp;&nbsp;';
    var buf1 = document.createElement("label");
    buf1.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;';
    var buf2 = document.createElement("p");
    buf2.innerHTML='<br>';
    var buf3 = document.createElement("label");
    buf3.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;';

    var recImg = document.createElement("img");
    recImg.setAttribute('src', 'https://img.youtube.com/vi/'+imgId+'/2.jpg');//'/mqdefault.jpg');
    recImg.setAttribute('alt', '썸네일');
    recImg.setAttribute('width', '180');
    recImg.setAttribute('style', 'vertical-align:top;');

    var recTitle = document.createElement("textarea");
    //recTitle.setAttribute('class', 'mx-auto my-auto');
    //recTitle.setAttribute('cols', '135');
    recTitle.setAttribute('style', 'width: 60%; height: 78px; border: 0px; resize: none;')
    recTitle.setAttribute('disabled', '');
    recTitle.setAttribute('id', id);
    recTitle.setAttribute('name', ex_title);
    fetch(`https://noembed.com/embed?dataType=json&url=${link}`)
    .then(res => res.json())
    .then(data => recTitle.innerHTML='['+ex_title+']\n'+data.title)

    var recPlay = document.createElement("a");
    recPlay.setAttribute('href', link);
    recPlay.setAttribute('target', '_blank');
    recPlay.innerHTML = '<img src="/images/next.png" width="16" alt="링크연결">';

    var buf_hr = document.createElement("hr");
    recArea.appendChild(buf2);
    recArea.appendChild(recEntry);
    recArea.appendChild(recLabel);
    recArea.appendChild(buf);
    recArea.appendChild(recImg);
    recArea.appendChild(buf1);
    recArea.appendChild(recTitle);
    recArea.appendChild(buf3);
    recArea.appendChild(recPlay);
    recArea.appendChild(buf_hr);
}

//      <a href="options.html" target="_blank"><img src="/images/gear-option.png" width="16" alt="설정"></a>
