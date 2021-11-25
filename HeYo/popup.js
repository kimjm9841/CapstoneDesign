// popup.html에서 작동할 기능 작성 (요정 온오프, 요정 이미지 변화, 요정 애칭 가져오기 등)
import {fairyList} from './js/getData.js';

window.onload=function(){
    let keys=["fairy_name", "fairy_bmi", "fairy_current_clothes", "fairy_closet"]
    var fairyname, body_value, currentclothes, fairyclothes;
    chrome.storage.sync.get(keys, function(result) {
        let fairyname = result.fairy_name;
        document.getElementById('fairyname').value=result.fairy_name;
        let body_value = result.fairy_bmi;
        let currentclothes = result.fairy_current_clothes;
        //let fairyclothes = result.fairy_closet;
        if(result.fairy_name==null){setDefault();}
        else{setInfo(fairyname, body_value, currentclothes);}
      });
      
    /*var fairyname=fairyList[0];//"포크";

    var fairyLevel=0;
    if(fairyList[1]>=0&&fairyList[1]<=25) fairyLevel=1;
    else if(fairyList[1]>=26&&fairyList[1]<=50) {fairyLevel=2;}
    else if(fairyList[1]>=51&&fairyList[1]<=75) {fairyLevel=3;}
    else if(fairyList[1]>=76&&fairyList[1]<=100) {fairyLevel=4;}

    var fairyclothes=fairyList[2];
    //여기까지가 받아야 하는 데이터 -> 성공!
    //요정 비만도 + 의상으로 사진 이름 바꿔서 적용하기


    var src;
    if(fairyLevel==1){src="/images/fairy_basic.png";}
    else{src="/images/fairy_lv"+fairyLevel+".png";}

    document.getElementById('fairyname').value=fairyname;
    var ImgArea = document.getElementById('fairy');
    var img = document.createElement('img');

    img.setAttribute("src", src);
    img.setAttribute("width", "150");
    img.setAttribute("alt", "설정");

    ImgArea.appendChild(img);*/
}

function setInfo(fairy_name, body_value, fairy_current_clothes){
  var fairyLevel=0;
  if(fairyList[1]>=0&&fairyList[1]<=25) fairyLevel=1;
  else if(fairyList[1]>=26&&fairyList[1]<=50) {fairyLevel=2;}
  else if(fairyList[1]>=51&&fairyList[1]<=75) {fairyLevel=3;}
  else if(fairyList[1]>=76&&fairyList[1]<=100) {fairyLevel=4;}

  let body_level=0;
  if(body_value>=0&&body_value<=25) body_level=1;
  else if(body_value>=26&&body_value<=50) {body_level=2;}
  else if(body_value>=51&&body_value<=75) {body_level=3;}
  else if(body_value>=76&&body_value<=100) {body_level=4;}
  else {
    alert("요정 비만도 로드에 오류가 발생했습니다.");
    return -1;
  }

  var src=null;
  if(fairy_current_clothes==null){src="/images/fairy_lv"+body_level+".png";}
  else{src="/images/fairy_lv"+body_level+"_"+fairy_current_clothes+".png";}
  //if(fairyLevel==1){src="/images/fairy_lv"+body_level+"_"+fairy_current_clothes+".png";}
  //else{src="/images/fairy_lv"+fairyLevel+".png";}

  document.getElementById('fairyname').value=fairy_name;
  var ImgArea = document.getElementById('fairy');
  var img = document.createElement('img');

  img.setAttribute("src", src);
  img.setAttribute("width", "150");
  img.setAttribute("alt", "설정");

  ImgArea.appendChild(img);
}

function setDefault(){
  //document.getElementById('fairyname').value=fairy_name;
  var ImgArea = document.getElementById('fairy');
  var img = document.createElement('img');

  let src="/images/fairy_basic.png";
  img.setAttribute("src", src);
  img.setAttribute("width", "150");
  img.setAttribute("alt", "설정");

  ImgArea.appendChild(img);
}