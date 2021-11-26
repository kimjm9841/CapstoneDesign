//import {algo} from './test2_back.js'; //import하고 아래에서 사용하면 됩니다!
//혹시 test2_back.js가 아니고 다른 파일에서 구현중이었으면 여기에 './(이 부분 수정).js'하시고
//test2_input.html에서 <script src="./test2_back.js" type="module"></script> 여기서 "./(이 부분 수정).js"하시면 될 것 같습니다!

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
    if (tmpEle[1].checked == true) { //'없어'가 체크가 되면
        for (var i = 0; i < tmpEle.length; i++) { //선택한 등급을 제외한 수만큼 for 수행. i는 등급 위치
            if(i != 1)
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
    goResult(true);
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
    USERINFO[2] = select3[0];
    USERINFO[3] = select4[0];
    USERINFO[4] = select5[0];
    USERINFO[5] = select6[0];
    console.log(select1);
    console.log(select2);
    console.log(select3);
    console.log(select4);
    console.log(select5);
    console.log(select6);

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



document.getElementById("ok_btnR").addEventListener('click', compare);

//select1 = ["ID"]
//select2 = [1] //auto XX
//select3 = [5] //hurt
//select4 = [5] //exercise
//select5 = [5] //tool
//select6 = ['INFJ',1] //mbti / bmi


var exercise = [{"id":1, "link":"https://www.youtube.com/watch?v=IS5OA7GeBJc&list=PLPPetu1spkealPT-BShcUFyWM0it3n2ql&index=4", "hurt":5, "exercise":0, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":1},
 {"id":2, "link":"https://www.youtube.com/watch?v=87uwSVdvPY8&t=909s", "hurt":5, "exercise":0, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":1},
 {"id":3, "link":"https://www.youtube.com/watch?v=WKtEJon-85s", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"fp", "BMI":1},
 {"id":4, "link":"https://www.youtube.com/watch?v=QA5jS0dPa6w", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":5, "link":"https://www.youtube.com/watch?v=x26mdeGnxyo", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":1},
 {"id":6, "link":"https://www.youtube.com/watch?v=wCOgq8U2IOk", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":7, "link":"https://www.youtube.com/watch?v=NDsjmxTROEo", "hurt":5, "exercise":2, "tool":1, "MBTI":"fp","MBTI2":"", "BMI":1},
 {"id":8, "link":"https://www.youtube.com/watch?v=Bt1wr94FmGQ", "hurt":5, "exercise":2, "tool":1, "MBTI":"tp","MBTI2":"tj", "BMI":1},
 {"id":9, "link":"https://www.youtube.com/watch?v=8lvmFgsQt8U", "hurt":5, "exercise":1, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":1},
 {"id":10, "link":"https://www.youtube.com/watch?v=hJuO1AUqLUc", "hurt":5, "exercise":1, "tool":1, "MBTI":"tp","MBTI2":"tj", "BMI":1},
 {"id":11, "link":"https://www.youtube.com/watch?v=DoQGWdX9l1Y", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":12, "link":"https://www.youtube.com/watch?v=W1ZUyg8Ju8w", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":1},
 {"id":13, "link":"https://www.youtube.com/watch?v=6pr9nYOJW3o", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":14, "link":"https://www.youtube.com/watch?v=b0bz8En15YU", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"fp", "BMI":1},
 {"id":15, "link":"https://www.youtube.com/watch?v=gMaB-fG4u4g", "hurt":5, "exercise":3, "tool":1, "MBTI":"fp","MBTI2":"", "BMI":1},
 {"id":16, "link":"https://www.youtube.com/watch?v=Wcdz6n18lR4&list=RDCMUCpg89Ys3E4BaLGgEEWVmI9g&start_radio=1&rv=Wcdz6n18lR4&t=12", "hurt":5, "exercise":3, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":1},
 {"id":17, "link":"https://www.youtube.com/watch?v=54tTYO-vU2E", "hurt":5, "exercise":0, "tool":1, "MBTI":"fp","MBTI2":"", "BMI":0},
 {"id":18, "link":"https://www.youtube.com/watch?v=2swcod5RYvU", "hurt":5, "exercise":0, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":0},
 {"id":19, "link":"https://www.youtube.com/watch?v=xoWKLNwNva0", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":0},
 {"id":20, "link":"https://www.youtube.com/watch?v=hgqSlNH_NYo", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":21, "link":"https://www.youtube.com/watch?v=4qqBQ0Xs4nc", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"fp", "BMI":0},
 {"id":22, "link":"https://www.youtube.com/watch?v=g5RfB0D61m8", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":23, "link":"https://www.youtube.com/watch?v=ieGVQp_eRFs", "hurt":5, "exercise":2, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":0},
 {"id":24, "link":"https://www.youtube.com/watch?v=DWYDL-WxF1U", "hurt":5, "exercise":2, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":0},
 {"id":25, "link":"https://www.youtube.com/watch?v=kETh8T3it4k", "hurt":5, "exercise":1, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":0},
 {"id":26, "link":"https://www.youtube.com/watch?v=7TLk7pscICk", "hurt":5, "exercise":1, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":0},
 {"id":27, "link":"https://www.youtube.com/watch?v=DoQGWdX9l1Y&t=10s", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":28, "link":"https://www.youtube.com/watch?v=W1ZUyg8Ju8w&t=339s", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":0},
 {"id":29, "link":"https://www.youtube.com/watch?v=hJ4_prZ9kB4&t=515s", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":0},
 {"id":30, "link":"https://www.youtube.com/watch?v=lkSweEq292o", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":31, "link":"https://www.youtube.com/watch?v=zSJYAyoojdw", "hurt":5, "exercise":3, "tool":1, "MBTI":"tp","MBTI2":"tj", "BMI":0},
 {"id":32, "link":"https://www.youtube.com/watch?v=s14NQ6Cz4QE", "hurt":5, "exercise":3, "tool":1, "MBTI":"","MBTI2":"fp", "BMI":0}
]



var exerciseArea = document.querySelector('.exerciseList'); 

function autoservice(){
    alert(select2[0]);
}



function compare(){

    var point_list = [];

    if(USERINFO[2] == 1){
        autoservice();
    }
    for(var i = 0 ; i < 32 ;i++){ //추후 32 >> exercise 길이만큼 받자
        var point = 10;
    
        //아픈부위 (상체/코어/하체) >> 이외는 모두 제거
        if(USERINFO[2] == 3){
            point+=10
        }//아픈부위가 없다면 전 영상
        else if(USERINFO[2] != exercise[i]['hurt']){
            point+=7
        }//아픈부위관련없는 운동이면 (하체가 아픔 >> 상체운동)
        else{
            point+=0
        }//관련 운동이면
            
        
        //운동부위 (상체/코어/하체) >> 이외는 모두 제거 
        if(USERINFO[3] == 3){        
            point+=10
        }//선호하는 운동부위가 없다면 전 영상
        else if(exercise[i]['exercise'] == 3){
            point+=7
        }//선호하는 부위가 있을 때 전신운동
        else if(USERINFO[3] == exercise[i]['exercise']){
            point+=10
        }//해당 부위관련 운동
        else{
            point+=5
        }//다른 부위관련운동
        

        //운동기구 (덤벨) >> 이외는 모두 제거
        if(USERINFO[4] == 1){
            if(exercise[i]['tool'] == 5){
                point+=10
            }
        }//덤벨 없다면 기구없이 하는 영상 
        else if(USERINFO[4] == exercise[i]['tool']){
            point+=10
        }//덤벨이 있을 때 기구사용 운동
        else{
            point+=7
        }//기구 미사용 운동
    

        //MBTI
        if(USERINFO[5][2] == exercise[i]['MBTI'][0] && USERINFO[5][3] == exercise[i]['MBTI'][1]){
            point*=1.5
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else if(USERINFO[5][2] == exercise[i]['MBTI2'][0] && USERINFO[5][3] == exercise[i]['MBTI2'][1]){
            point*=1.5
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else{
            point*=0.6
        }

        //BMI
        if(USERINFO[6] == 0){
            if(exercise[i]['BMI'] == 1){
                point*=0.8
            }
        }//유저가 비만이 아닐 때 전 운동
        else if(USERINFO[6] == exercise[i]['BMI']){
            point*=1.2
        }//비만일 때 다이어트 관련 운동
        else{
            point*=0.6
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
    for(var i = 0; i < exercise.length ; i++){
        img_list[i] = exercise[i]['link'].substring(32);
    }

    console.log(img_list);


    var exerciseArea = document.querySelector('.exerciseList');
    var elem = ""
    console.log("Recommend for "+ USERINFO[0] + " is")
    for(var i = 0; i<exercise.length ; i++){
        console.log(exercise[i]['link']);
        exerciseArea.innerHTML += "<img src='" + img_url1 + img_list[i] + img_url2 +"' width='200'>";
        exerciseArea.innerHTML += "<a href=" + exercise[i]['link'] + " target='_blank'>" 
        + exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc
        + "</a> <br>";
        
        if(exercise[i]['point'] != exercise[i+1]['point']){
            break;
        }      
    }


}
