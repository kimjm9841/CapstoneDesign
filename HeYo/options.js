// 설정창에서 할 기능 구현
// 밑에 내용 다 지워도 되는 건데 혹시 참고가 될까봐 일단 냅뒀어요

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

window.onload=function(){
  //실행할 내용
  //::비만도:: 0~25 - 1단계, 26~50 - 2단계, 51~75 - 3단계, 76~100 - 4단계
  var body_value=26;
  var body_level=0;
  var fairyname="포크";
  var fairyclothes=[1,2,3];
  var currentclothes=2;
  //여기까지 변수들이 전달받은 데이터 임시저장하는 변수 ~> data.js에서 받고 그걸 전달받아서 변수에 저장하도록?
  //여기도 data.js에서 import 받아서 리스트를 변수에 저장하면 될듯

  if(body_value>=0&&body_value<=25) body_level=1;
  else if(body_value>=26&&body_value<=50) {body_level=2;}
  else if(body_value>=51&&body_value<=75) {body_level=3;}
  else if(body_value>=76&&body_value<=100) {body_level=4;}
  else {
    alert("요정 비만도 로드에 오류가 발생했습니다.");
    return -1;
  }
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
  for(var i=0;i<fairyclothes.length;i++){
    var selecttag1=document.createElement("input");
    selecttag1.setAttribute("type", "radio");
    selecttag1.setAttribute("name", "fairyclothes");
    selecttag1.setAttribute("value", fairyclothes[i]);
    selecttag1.setAttribute("id",i);
    if(fairyclothes[i]==currentclothes) selecttag1.setAttribute("checked", ""); //현재 입힌 옷에 체크해두기
    
    var lbl1 = document.createElement("label");
    lbl1.setAttribute("for", i);
    lbl1.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<img src='+'"/images/fairy_'+fairyclothes[i]+'.png"'+'width="200"> &nbsp;&nbsp;&nbsp;'; 
                      //'"/images/fairy_basic.png"' <= 이 부분 /images/fairy_(숫자).png 이런식으로 바꾸면 동적으로 바뀔듯

    fairycloset.appendChild(selecttag1);
    fairycloset.appendChild(lbl1);
  }
  console.log(fairycloset);
}
//제출 눌렀을 때 데이터 저장(요정이름, 요정 옷 번호)+전송되도록

//constructOptions(presetButtonColors);