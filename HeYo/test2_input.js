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
document.getElementById("ok_btnR").addEventListener('click', function(){});

document.getElementById("q3_1").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[5].checked==true){No_chk("q3[]");}}, false);
document.getElementById("q3_2").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[5].checked==true){No_chk("q3[]");}}, false);
document.getElementById("q3_3").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[5].checked==true){No_chk("q3[]");}}, false);
document.getElementById("q3_4").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[5].checked==true){No_chk("q3[]");}}, false);    
document.getElementById("q3_5").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q3[]");
    if(tmpEle[5].checked==true){No_chk("q3[]");}}, false);

document.getElementById("q4_1").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[5].checked==true){No_chk("q4[]");}}, false);
document.getElementById("q4_2").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[5].checked==true){No_chk("q4[]");}}, false);
document.getElementById("q4_3").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[5].checked==true){No_chk("q4[]");}}, false);
document.getElementById("q4_4").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[5].checked==true){No_chk("q4[]");}}, false);    
document.getElementById("q4_5").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q4[]");
    if(tmpEle[5].checked==true){No_chk("q4[]");}}, false);

document.getElementById("q5_1").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q5[]");
    if(tmpEle[5].checked==true){No_chk("q5[]");}}, false);
document.getElementById("q5_2").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q5[]");
    if(tmpEle[5].checked==true){No_chk("q5[]");}}, false);
document.getElementById("q5_3").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q5[]");
    if(tmpEle[5].checked==true){No_chk("q5[]");}}, false);
document.getElementById("q5_4").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q5[]");
    if(tmpEle[5].checked==true){No_chk("q5[]");}}, false);    
document.getElementById("q5_5").addEventListener('click',function(){ 
    var tmpEle = document.getElementsByName("q5[]");
    if(tmpEle[5].checked==true){No_chk("q5[]");}}, false);

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
    if (tmpEle[5].checked == true) { //'없어'가 체크가 되면
        for (var i = 0; i < tmpEle.length; i++) { //선택한 등급을 제외한 수만큼 for 수행. i는 등급 위치
            if(i != 5)
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

function goResult(){
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

    console.log(select1);
    console.log(select2);
    console.log(select3);
    console.log(select4);
    console.log(select5);
    console.log(select6);
}

function goNext(qIdx){
    if(qIdx+1 === endPoint){
        goResult();
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