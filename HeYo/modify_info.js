function setInfo(pain, equi, weight, height, mbti, pre){
  console.log(pain, equi, weight, height, mbti, pre);
  if(pain != undefined){
    for(let i=0;i<pain.length;i++){
      let num=pain[i]+1;
      document.getElementById("q3_"+num).checked = true;
    }   
  }
  if(pre != undefined){
    for(let i=0;i<pre.length;i++){
      let num=pre[i]+1;
      document.getElementById("q4_"+num).checked = true;
    }  
  }
  if(equi != undefined){
    for(let i=0;i<equi.length;i++){
      let num=equi[i]+1;
      //console.log('안돼?', equi.length, equi);
      document.getElementById("q5_"+num).checked = true;
    }    
  } 
  if(!isNaN(weight)) document.getElementById("weight").value=weight;
  if(!isNaN(height)) document.getElementById("height").value=height;

  var Smbti = document.getElementById("mbti");
  for(let i=0;i<Smbti.length;i++){
    if(Smbti[i].value==mbti){
      Smbti[i].selected=true;
    }
  }
}

let keys = ["pain", "equi", "weight", "height", "mbti", "pre", "user_name"]
chrome.storage.sync.get(keys, function(result) {
    let value1 = result.pain;
    let value2 = result.equi;
    let value3 = result.weight;
    let value4 = result.height;
    let value5 = result.mbti;
    let value6 = result.pre;
    let value7 = result.user_name;
    console.log('Value currently is ',value1,value2,value3,value4,value5,value6,value7);
    setInfo(value1,value2,value3,value4,value5,value6);
  });

  
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(){
  let pain=[];
  let pre=[];
  let equi=[];
  let weight, height, mbti = null;
  for(let i=0;i<4;i++){
    let num=i+1;
    console.log(document.getElementById("q3_"+num).checked);
    if(document.getElementById("q3_"+num).checked == true) 
      pain.push(i);
  }
  for(let i=0;i<4;i++){
    let num=i+1;
    if(document.getElementById("q4_"+num).checked == true) 
      pre.push(i);
  }
  for(let i=0;i<4;i++){
    let num=i+1;
    if(document.getElementById("q5_"+num).checked == true) 
      equi.push(i);
  }
  weight=document.getElementById("weight").value;
  height=document.getElementById("height").value;
  mbti=document.getElementById("mbti").value;

  console.log('출력하기',pain, pre, equi, weight, height, 'mbti=', mbti);

  //유효한지 확인//
  if(pain.length==0 || pre.length==0 || equi.length==0 || weight.length==0 || height.length==0 || mbti==0){ //유효하지 않음
    alert('빈칸을 모두 채워주세요.');
    console.log('없음!');
  }
  else{ //유효함
    if(checkInfo(weight, height)==false) {console.log('weight, height 오류');}
    else{
      chrome.storage.sync.set({pain:pain, equi:equi, weight:weight, height:height, mbti:mbti, pre:pre}, function() {
        console.log('Value is set to ', pain, equi, weight, height, mbti, pre);
        console.log("저장되었습니다~!");
        window.alert("저장되었습니다.");
      });
    
      localStorage.setItem('height', height);
      localStorage.setItem('weight', weight);
      localStorage.setItem('mbti', mbti);
      localStorage.setItem('pre', pre);
      localStorage.setItem('equi', equi);
      localStorage.setItem('pain', pain);
  
      location.replace('/modify_exList.html');  
    }
  }


 // var cast = { "height" : height, "weight" : weight, "mbti" : mbti, "pre" : pre, "equi" : equi, "pain" : pain };
 // localStorage.setItem("cast", JSON.stringify(cast));

  //location.replace('/modify_exList.html');

});

function checkInfo(weight, height){
  //세상에서 가장 큰 사람 기준으로 (기네스북) : 272cm니까 280cm까지로 하자.
  //세상에서 가장 작은 사람 기준으로 (기네스북) : 60cm니까 60cm로 하자.
  var isChecked = true;

  if(isNaN(weight)||isNaN(height)) {
    console.log(isNaN(weight));
    alert("숫자 형태로 입력해주세요.")
    return false;
  }

  height=Number(height);
  weight=Number(weight);

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


document.getElementById('home').addEventListener("click", function(){
  console.log("home");
  location.replace('/options.html');
});

// 없음 버튼 누르면 다른 버튼은 안눌리게
document.getElementById('q3_4').addEventListener('click', function(){checkNon("q3[]");});
document.getElementById('q4_4').addEventListener('click', function(){checkNon("q4[]");});
document.getElementById('q5_4').addEventListener('click', function(){checkNon("q5[]");});

document.getElementById("q3_1").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q3[]");
  if(tmpEle[3].checked==true){checkNon("q3[]");}}, false);
document.getElementById("q3_2").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q3[]");
  if(tmpEle[3].checked==true){checkNon("q3[]");}}, false);
document.getElementById("q3_3").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q3[]");
  if(tmpEle[3].checked==true){checkNon("q3[]");}}, false);

document.getElementById("q4_1").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q4[]");
  if(tmpEle[3].checked==true){checkNon("q4[]");}}, false);
document.getElementById("q4_2").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q4[]");
  if(tmpEle[3].checked==true){checkNon("q4[]");}}, false);
document.getElementById("q4_3").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q4[]");
  if(tmpEle[3].checked==true){checkNon("q4[]");}}, false);

document.getElementById("q5_1").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q5[]");
  if(tmpEle[3].checked==true){checkNon("q5[]");}}, false);
document.getElementById("q5_2").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q5[]");
  if(tmpEle[3].checked==true){checkNon("q5[]");}}, false);
document.getElementById("q5_3").addEventListener('click',function(){
  var tmpEle = document.getElementsByName("q5[]");
  if(tmpEle[3].checked==true){checkNon("q5[]");}}, false);

function checkNon(qNum){
  let tmpEle = document.getElementsByName(qNum) // name 이 Job 인 객체만 추출
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

/*
  "type": "object",
  "properties": {
      "user_name":{"type":"string"},
      "pain":{"type":"array"},
      "pre":{"type":"array"},
      "equi":{"type":"array"},
      "mbti":{"type":"string"},
      "height":{"type":"number"},
      "weight":{"type":"number"},
      "fairy_name":{"type":"string"},
      "fairy_bmi":{"type":"number"},
      "fairy_current_clothes":{"type":"number"},
      "fairy_closet":{"type":"object"}
  }*/