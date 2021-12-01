// 설정창에서 할 기능 구현
// 밑에 내용 다 지워도 되는 건데 혹시 참고가 될까봐 일단 냅뒀어요

/* 3~4단계에서는 옷장 없애버리게 수정하기.. (옷 관련 번호 무시한 링크 작성) */
let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
/*
// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;

    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …crate a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}
*/
function setInfo(fairyname, body_value, currentclothes, fairyclothes){
  console.log(fairyname, body_value, currentclothes, fairyclothes);

  console.log("요정 비만도", body_value, typeof(body_value));

  if(body_value>=0&&body_value<=25) body_level=1;
  else if(body_value>=26&&body_value<=50) {body_level=2;}
  else if(body_value>=51&&body_value<=75) {body_level=3;}
  else if(body_value>=76&&body_value<=100) {body_level=4;}
  else {
    //alert("요정 비만도 로드에 오류가 발생했습니다.");
    //return -1;
    var fairycloset=[0,1,2,3];
    chrome.storage.sync.set({fairy_bmi:1, fairy_name:"요정", fairy_closet:fairycloset}, function() {
        console.log("요정정보 초기화");
      });
    fairyname="요정";
    body_value=1;
    currentclothes=0;
    fairyclothes=[0,1,2,3];
    body_level=1;
    console.log(fairyname, body_value, currentclothes, fairyclothes);
  }
  console.log(fairyname, body_value, currentclothes, fairyclothes);
  console.log(body_value);
  console.log(body_level);
  document.getElementById('fairyname').value=fairyname;
  document.getElementById('body_level').value=body_level; 
  document.getElementById('body_value').value=body_value+'/100'; 
  var status = document.querySelector('.statusBar');
  var status_width = body_value%25;
  if(body_value==25||body_value==50||body_value==75||body_value==100){status.style.width=100+'%';}
  else{status.style.width = (100/25) * (status_width) + '%';}

  //옷장 구현
  var fairycloset=document.querySelector('.fairyCloset');
  if(body_level>=3){
    var selecttag1=document.createElement("input");
    selecttag1.setAttribute("type", "radio");
    selecttag1.setAttribute("name", "fairyclothes");
    selecttag1.setAttribute("value", 0);
    selecttag1.setAttribute("id",i);
    if(fairyclothes[i]==currentclothes) selecttag1.setAttribute("checked", ""); //현재 입힌 옷에 체크해두기
    
    var lbl1 = document.createElement("label");
    lbl1.setAttribute("for", i);
    lbl1.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<img src='+'"/images/fairy_lv'+body_level+'_0.png"'+'width="200"> &nbsp;&nbsp;&nbsp;'; 
                      //'"/images/fairy_basic.png"' <= 이 부분 /images/fairy_(숫자).png 이런식으로 바꾸면 동적으로 바뀔듯

    fairycloset.appendChild(selecttag1);
    fairycloset.appendChild(lbl1);

  }
  else{
    if(fairyclothes!=null){
      for(var i=0;i<fairyclothes.length;i++){
        var selecttag1=document.createElement("input");
        selecttag1.setAttribute("type", "radio");
        selecttag1.setAttribute("name", "fairyclothes");
        selecttag1.setAttribute("value", fairyclothes[i]);
        selecttag1.setAttribute("id",i);
        //if(fairyclothes[i]==currentclothes) selecttag1.setAttribute("checked", ""); //현재 입힌 옷에 체크해두기
        
        var lbl1 = document.createElement("label");
        lbl1.setAttribute("for", i);
        lbl1.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<img src='+'"/images/fairy_lv'+body_level+'_'+fairyclothes[i]+'.png"'+'width="200"> &nbsp;&nbsp;&nbsp;'; 
                          //'"/images/fairy_basic.png"' <= 이 부분 /images/fairy_(숫자).png 이런식으로 바꾸면 동적으로 바뀔듯
  
        fairycloset.appendChild(selecttag1);
        fairycloset.appendChild(lbl1);
      }
      if(currentclothes==null){
        var check = document.getElementById(0);
        check.setAttribute("checked", "");  
      }
      else{
        var check = document.getElementById(currentclothes);
        check.setAttribute("checked", "");  
      }
    }
    else{
      var selecttag1=document.createElement("input");
      selecttag1.setAttribute("type", "radio");
      selecttag1.setAttribute("name", "fairyclothes");
      selecttag1.setAttribute("value", 0);
      selecttag1.setAttribute("id",i);
      selecttag1.setAttribute("checked", ""); //현재 입힌 옷에 체크해두기
      
      var lbl1 = document.createElement("label");
      lbl1.setAttribute("for", i);
      lbl1.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<img src='+'"/images/fairy_lv'+body_level+'.png"'+'width="200"> &nbsp;&nbsp;&nbsp;'; 
                        //'"/images/fairy_basic.png"' <= 이 부분 /images/fairy_(숫자).png 이런식으로 바꾸면 동적으로 바뀔듯
  
      fairycloset.appendChild(selecttag1);
      fairycloset.appendChild(lbl1);
    }
  
  }
  console.log(fairycloset);
}

window.onload=function(){
  //chrome.storage에서 데이터 받기
  let keys=["fairy_name", "fairy_bmi", "fairy_current_clothes", "fairy_closet"]
  var fairyname, body_value, currentclothes, fairyclothes;
  chrome.storage.sync.get(keys, function(result) {
      let fairyname = result.fairy_name;
      document.getElementById('fairyname').value=result.fairy_name;
      let body_value = result.fairy_bmi;
      let currentclothes = result.fairy_current_clothes;
      let fairyclothes = result.fairy_closet;
      setInfo(fairyname, body_value, currentclothes, fairyclothes);
    });
}

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(){
  var fairyname = document.getElementById('fairyname').value;
  var currentclothes = document.querySelector('input[name="fairyclothes"]:checked').value;

  if(currentclothes==0){
    chrome.storage.sync.set({fairy_name:fairyname}, function() {
      console.log('Value is set to ' + fairyname+" "+currentclothes);
      console.log("저장되었습니다~");
    });  
  }
  else{
    chrome.storage.sync.set({fairy_name:fairyname, fairy_current_clothes:currentclothes}, function() {
      console.log('Value is set to ' + fairyname+" "+currentclothes);
      console.log("저장되었습니다~");
    });
  }
  window.alert("설정이 완료되었습니다.");
  location.reload();                
});
//제출 눌렀을 때 데이터 저장(요정이름, 요정 옷 번호)+전송되도록

//constructOptions(presetButtonColors);